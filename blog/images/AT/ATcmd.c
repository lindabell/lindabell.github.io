#include "ATcmd.h"
#include <stdarg.h>
#include "gprs.h"
#include "string.h"
#define RECEIVE_NODE_MAX    6
static struct Node ReceiveNode[RECEIVE_NODE_MAX];
static struct Node *pWriteNode;
static struct Node *pReadNode;

u8 ATevent=NO_EVENT;
u8 TimeOut=0;
#define TIME_START  1
#define TIME_STOP   2
u8 timeState=TIME_STOP;
void IO_write(u8 *pData,u8 len)
{

    //dialog->Serial->write((char *)pData,len);
    gprsSend((char *)pData,len);
    ATDebug("Send:%s",pData);
}

void IO_write_str(u8 *str)
{
    IO_write(str,strlen((char *)str));
}

void time_OneS(void)
{
    //ATDebug("time out\r\n");
    if(timeState==TIME_STOP) return;
    if(TimeOut!=0)TimeOut--;
    else
    {
        ATevent|=EVENT_TIME_OUT;    //time is up set The timeout event
        timeState=TIME_STOP;
        //ATDebug("time up\r\n");
    }
}
void setTimeOut(u8 _s)
{
    ATevent&=~EVENT_TIME_OUT;     //clear time out event
    TimeOut=_s;
    timeState=TIME_START;   //start timer
}

/**
 * @brief IO_read The fuc will use in interrupt
 * @param DATA
 */
void IO_read(u8 DATA)
{
    static u16 cnt=0;

    pWriteNode->buf[cnt++]=DATA;
    ATAssert(cnt<NODE_MAX);
    if(DATA=='\n')  //the end of AT common
    {
        if(cnt<=3)//receive \r\n filter it
        {
            cnt=0;
            //ATDebug("R:\\r\\n\r\n");
            return;
        }

        pWriteNode->buf[cnt++]='\0';
        pWriteNode->size=cnt;
        ATevent|=EVENT_AT_FRAME;
        cnt=0;
        //ATDebug("R:%s",pWriteNode->buf);
        if(pWriteNode->next->size!=0)
        {
            //print warning to user
            ATDebug("no more node\r\n");
        }
        else
        {
            pWriteNode=pWriteNode->next;
        }
    }
}

/**
 * @brief AT_init init AT common
 */
void AT_init(void)
{
    u8 i;
    //init buffer
    //connet buffer node to be link
    for(i=0;i<(RECEIVE_NODE_MAX-1);i++)
    {
        ReceiveNode[i].next=&ReceiveNode[i+1];
        ReceiveNode[i].size=0;
        ReceiveNode[i+1].size=0;
    }
    ReceiveNode[i].next=&ReceiveNode[0];
    ReceiveNode[i].size=0;

    //set head porter
    pWriteNode=pReadNode=&ReceiveNode[0];

    //init hardware
    GPRS_init();
}

/**
 * @brief GetATFrame
 * @return if AT receive buffer not empty will return string pointer or return 0
 */
static u8 tempBuf[NODE_MAX];
u8 *GetATFrame(void)
{
    u16 i;
    if(pReadNode->size)
    {
        for(i=0;i<pReadNode->size;i++)
        {
            tempBuf[i]=pReadNode->buf[i];
        }
        //ATDebug("get:%s\r\n",pReadNode->buf);
        pReadNode->size=0;
        pReadNode=pReadNode->next;

        return tempBuf;
    }
    return 0;
}
s8 ATFrameIsEmpty(void)
{
    if(pReadNode->size==0) return 1;
    else return 0;
}


/**
 * @brief StringCompare 两字符串在'\0'之前相同则认为这两个字符串一样的
 * @param Str1
 * @param Str2
 * @return
 */
s8 StringCompare(u8 *Str1,u8 *Str2)
{
    ATAssert(*Str1!=0);
    ATAssert(*Str2!=0);
    while(1)
    {
        if(*Str1!=*Str2)
        {
            if(*Str1=='\0'||*Str2=='\0') return 1;
            else return 0; //string diffient
        }

        Str1++;
        Str2++;
    }
}

/**
 * @brief extractStr    从字符串中提取特定字符串
 * @param pInStr        输出的字符串
 * @param startMark     开始标志
 * @param startMarkCnt  第几个标志
 * @param endMark       结束标志
 * @param endMarkCnt    第几个标志
 * @param pOutStr       输出字符串(从开始标志的下一个字符开始到结束标志的前一个字符，并在最后加‘\0’)
 * @return
 */
u8 extractStr(u8 *pInStr,u8 startMark,u8 startMarkCnt,u8 endMark,u8 endMarkCnt,u8 *pOutStr)
{
    u8 FindStartMark=false;
    u8 index=0;
    u8 Sindex=0;
    u8 Eindex=0;

    //find string
    while(pInStr[index])
    {
        if((pInStr[index]==startMark)&&(FindStartMark==false))
        {
            Sindex++;   //count
            if(Sindex==startMarkCnt)
             {
                Sindex=index;   //save the start mark index
                FindStartMark=true;
            }
        }

        if(pInStr[index]==endMark)
        {
            Eindex++;   //count
            if(Eindex==endMarkCnt)
             {
                Eindex=index;   //save the end mark index
                break;  //fund string
            }
        }

        index++;
    }

    //copy string
    ATAssert(FindStartMark==true);  //没有符合StartMark的字符或参数StartMark与endmark填写反了
    ATAssert(Sindex<Eindex);    //
    for(Sindex+=1;Sindex<Eindex;Sindex++)
    {
        *pOutStr++=pInStr[Sindex];
    }
    *pOutStr='\0';

    return 1;
}

void StrCopy(u8 *Dst,u8 *Src)
{
    while(*Src)
    {
        *Dst++=*Src++;
    }
    *Dst='\0';
}

#define WAITING_EVENT   (0)
#define TIME_OUT        (-1)
#define EMPTY           (-2)
#define UNEXPECT_CMD    (-3)
#define ERROR           (-4)
/**
 * @brief ATcmd     send AT common 发送AT指令通用函数
 * @param cmd       AT common string or null(send nothing) AT指令(字符串)或空(不发送任何东西)
 * @param timeOut_s   time out  多少秒超时
 * @param cmd_num   The num of cmd which it exp 需要对比的命令(即"..."的参数个数)
 * @return  大于0时，表示收到和列表匹配的字符串
 *cmd   cmdLen
 *0     0       send nothing,wait exp       不发送任何东西，等待收到列表中的字符串
 *!=0   0       send cmd string,wait exp    发送字符串，等待收到列表中的字符串
 *!=0   !=0     send hex data,wait exp      发送十六进制数据，等待收到列表中的字符串
 *0     !=0     send nothing,wait exp       不发送任何东西，等待收到列表中的字符串
 */
s8 ATcmd(u8 *cmd,u8 cmdLen,u8 timeOut_s,u8 *pOut,u8 cmd_num,...)
{
    static u8 sate=0;
    s8 ret=WAITING_EVENT;
    u8 i;
    va_list vap;
    u8 *pStr1;
    u8 *pStr2;
    if(sate!=0) goto wait;

    //send cmd
    if((cmd!=0)&&(cmdLen==0))IO_write_str((u8*)cmd);    //if cmd is string then cmdlen can be set to zro
    else if((cmd!=0)&&(cmdLen!=0))IO_write(cmd,cmdLen); //this is use to send hex data
    //if timeOut_s is zro will return TIME_OUT
    if(timeOut_s==0)
    {
        ret=TIME_OUT;
        return ret;     //@2015.6.18 时间设置为零时应该直接返回
    }
    else    setTimeOut(timeOut_s);
    sate=1;
    //set time out time
    //wait event
wait:
    if((ATevent&EVENT_AT_FRAME)||(ATevent&EVENT_TIME_OUT))
    {
        if(ATevent&EVENT_AT_FRAME)
        {
            ATevent&=~EVENT_AT_FRAME;     //clear pending event
            va_start(vap , cmd_num);     //set the last one parameter
            //get AT common string from buffer
           pStr1=GetATFrame();
           for(i=0;i<cmd_num;i++)
           {
                pStr2=va_arg(vap , u8*);  //get list's pointer
                ATAssert(pStr2!=0);
               if( StringCompare(pStr1,pStr2))
               {
                   if(pOut)StrCopy(pOut,pStr1);//if pOut not zro copy The string out
                   break;  //it is the same of list's string
               }
           }
           va_end(vap);    //set vap to zro
           if(i==cmd_num) ret=UNEXPECT_CMD; //the string is unkown
           else ret=i+1;
        }
        else
        {
            ATevent&=~EVENT_TIME_OUT;     //clear time out event
            ret=TIME_OUT;
        }
        if((ret>0)||(ret==TIME_OUT))sate=0; //rset the sate @2015.6.18增加超时后复位
    }
    if(!ATFrameIsEmpty()) ATevent|=EVENT_AT_FRAME; //if AT cmomon buffer is not empty set the event
    return ret;
}

#ifdef DEBUG
u8 HEAD[]="AABB";
u8 buf[50];
void AT_test(void)
{
    //int len;
    u8 state=0xFF;
    s8 ret;

    ATDebug("\r\nGPRS Starting\r\n");
    AT_init();

    while(1)
    {
        switch(state)
        {
        case 0xFF:
            GPRS_RESET_PIN_LOW; //拉低GPRS复位引脚
            state=0;
            break;
        case 0://wait AT ready
            ret=ATcmd(0,0,1,0,1,"^AT: ready\r");

            if(ret==1)
            {
                GPRS_RESET_PIN_HIGH;//GPRS复位引脚拉高复位结束
                state=1;
                ATDebug("AT ready\r\n");
                //延时1s
            }
            else if(ret==TIME_OUT) ATDebug("time out");
            break;
        case 1://延时2s
            ret=ATcmd(0,0,2,0,1,"delay2s\r");
            if(ret==TIME_OUT)
            {
                state=2;
                ATDebug("delay finish\r\n");

            }
            break;
        case 2://check SIM
            ret=ATcmd((u8*)"AT+ESIMS?\r\n",0,1,0,2,"+ESIMS: 1\r","+ESIMS: 0\r");
            if(ret==1)
            {
                ATDebug("SIM ready\r\n");
                state=3;
            }
            else if(ret==2)
            {
                ATDebug("SIM Not ready\r\n");
            }

            break;
         case 3://check network
            ret=ATcmd((u8*)"AT+CREG?\r\n",0,1,0,5,"+CREG: 0, 0\r","+CREG: 0, 1\r","+CREG: 0, 2\r","+CREG: 0, 3\r","+CREG: 0, 4\r");
            if(ret==2)
            {
                ATDebug("Net registed\r\n");
                state=4;
            }
            else if(ret==TIME_OUT) ATDebug("time out");
            break;
        case 4://connet to server
            ret=ATcmd((u8*)"AT+CIPSTART=\"TCP\",\"80eboy.vicp.cc\",37379\r\n",0,10,0,3,"+CIPSTART: CONNECTED\r","^CIPCLOSE: connect timeout.","+CIPSTART: FAILED");
           if(ret==1)
           {
               ATDebug("connect 80ebo.com\r\n");
               state=5;
           }
           else if((ret==2)||(ret==3))
           {
               ATDebug("connet fail\r\n");
           }
           else if(ret==TIME_OUT) ATDebug("time out");
           break;
        case 5://不断地检查网络是否断开
            ret=ATcmd(0,0,1,buf,3,"^CIPCLOSE: DISCONNECTED\r","^CIPRECV:",HEAD);
            if(ret==1)
            {
                state=4;
                ATDebug("disconnect\r\nreconnect...\r\n");
            }
            else if(ret==2)
            {
                ATDebug("rev data\r\n");
            }
            else if(ret==3)
            {
                ATDebug("KOoooooooo\r\n");
                ATDebug(buf);
                state=6;
            }
            else if(ret==TIME_OUT) ATDebug("time out");
           break;
        case 6://send
            ret=ATcmd("AT+CIPSEND=12,hello server\r\n",0,5,0,2,"OK\r","ERROR");
            if(ret==1)
            {
               ATDebug("send success\r\n");
               state=5;
            }
            else if(ret==2)
            {
              ATDebug("send fail\r\n");
              state=5;
            }
            else if(ret==TIME_OUT)
            {
                ATDebug("send time out\r\n");
                state=5;
            }
            break;
        }
    }
}

#endif




