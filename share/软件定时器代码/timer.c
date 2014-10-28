/**
software timer writen by MUWL(ľ������)@2014.9.20
AD:more info www.80eboy.com
license: No limit except keep this note.
*/
#include "timer.h"

static struct timer *pTimer=NULL;

static void addTimer(struct timer *timer)
{
    if(pTimer==NULL)
    {
        pTimer=timer;
        pTimer->pre=timer;
        pTimer->next=timer;
    }
    else
    {
        pTimer->pre->next=timer;
        timer->pre=pTimer->pre;
        timer->next=pTimer;
        pTimer->pre=timer;

    }
}

void startTimer(struct timer *timer)
{
	addTimer(timer);
}

/**
this fun must be called at hardware timer
*/
void timerCountDown(void)
{
    static struct timer *pTempTimer=NULL;

    if (pTimer==NULL) return;

    pTempTimer=pTimer;
    //���н��м�һ����
    do
    {
        pTimer->cnt--;
        pTimer=pTimer->next;

    }while(pTempTimer!=pTimer);

    //�ѵ�0�Ĵ��������Ƴ�
    pTempTimer=pTimer;
    do
    {
        pTimer=pTimer->next;
        if (pTimer->cnt==0)
        {
			pTimer->isTimeOut=TRUE;	//set time out flage
			
            if(pTimer->pre==pTimer->next && pTimer==pTimer->next)
            {
                pTimer=NULL;
                break;
            }
            pTimer->pre->next=pTimer->next;
            pTimer->next->pre=pTimer->pre;
           if(pTempTimer==pTimer)
           {
               pTimer=pTimer->next;
               break;
           }
        }

    }while(pTempTimer!=pTimer);

}













