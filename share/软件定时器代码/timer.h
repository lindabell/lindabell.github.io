#ifndef _TIMER_H
#define _TIMER_H

#include "baseType.h"
#include "systemTick.h"

struct timer
{
	u8 isTimeOut;
	u16 cnt;
	struct timer *pre;
	struct timer *next;
};

void startTimer(struct timer *timer);
void timerCountDown(void);

#endif
