import { WorkdaySentiment } from '@prisma/client';
import { FunctionComponent } from 'react';
import { WorkdaySquare } from './WorkdaySquare';
import { isSameDay } from 'date-fns';

export const DayChart: FunctionComponent<{
  dates: Date[][];
  loggedDates: WorkdaySentiment[];
  deleteWorkday: (date: Date) => Promise<void>;
  submitWorkday: (data: FormData) => Promise<void>;
  isReadOnly: boolean;
}> = ({ dates, loggedDates, deleteWorkday, submitWorkday, isReadOnly }) => {
  return (
    <div className="flex gap-[2px]">
      {dates.map((datesInWeek, index) => (
        <div className="flex flex-col gap-[2px] flex-col" key={index}>
          {datesInWeek.map(date => (
            <WorkdaySquare
              isReadOnly={isReadOnly}
              key={date.toISOString()}
              date={date}
              deleteWorkday={deleteWorkday}
              submitWorkday={submitWorkday}
              loggedData={loggedDates.find(loggedData =>
                isSameDay(loggedData.date, date),
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
