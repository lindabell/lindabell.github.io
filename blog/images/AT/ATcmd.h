#ifndef ATCMD_H_80eboy
#define ATCMD_H_80eboy

#include "basetype.h"

#ifdef __cplusplus
 extern "C" {
#endif

//辅助调试
#ifdef DEBUG        //@2015.6.18 使用统一的调试宏
#define ATDEBUG_ENABLE    //set enable The debug infomation will be output
#endif

#ifdef ATDEBUG_ENABLE
#define ATDebug(format,...) {printf(format,##__VA_ARGS__);fflush(stdout);}
#define ATAssert(EX)   if (!(EX)) {\
    ATDebug("(%s) assert failed at: %s\t%s:%d \n", \
#EX,__FILE__,__FUNCTION__, __LINE__);while(1);}
#else
#define ATDebug(format,...)
#define ATAssert(EX)
#endif

 /*
typedef unsigned char u8;
typedef          char s8;
typedef unsigned short u16;
typedef          short s16;
typedef unsigned int u32;
typedef          int s32;
*/

#define NO_EVENT (0)
#define EVENT_TIME_OUT (1<<0)
#define EVENT_AT_FRAME (1<<1)
//extern u8 ATevent;

#define NODE_MAX    50  //定义接收到AT指令的总字节数最大值
struct Node
{
    u8 buf[NODE_MAX];
    u8 size;
    struct Node *next;
};

void time_OneS(void);//这个函数应该被循环调用，被调用的周期为1S
void IO_write(u8 *pData, u8 len);
void IO_read(u8 DATA);


s8 ATcmd(u8 *cmd,u8 cmdLen,u8 timeOut_s,u8 *pOut,u8 cmd_num,...);


#ifdef DEBUG
void AT_test(void);
#endif

#ifdef __cplusplus
}
#endif

#endif // ATCMD_H
