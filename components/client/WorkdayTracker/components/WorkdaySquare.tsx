import { WorkdaySentiment, WorkSentiment } from '@prisma/client';
import { FunctionComponent } from 'react';
import { Popover } from 'radix-ui';
import styles from './WorkdaySquare.module.css';
import { Cross2Icon } from '@radix-ui/react-icons';
import { format, isWeekend } from 'date-fns';
import { Button } from '@/components/client/foundation/Button';
import { SubmitWorkday } from './SubmitWorkday';

const SENTIMENT_TO_CLASS: Record<WorkSentiment, string> = {
  [WorkSentiment.GREEN]: styles.Happy,
  [WorkSentiment.YELLOW]: styles.Stressed,
  [WorkSentiment.RED]: styles.Unhappy,
};

const SENTIMENT_TO_TEXT: Record<WorkSentiment, string> = {
  [WorkSentiment.GREEN]: 'Happy',
  [WorkSentiment.YELLOW]: 'Stressed',
  [WorkSentiment.RED]: 'Unhappy',
};
type WorkdaySquareProps = {
  date: Date;
  loggedData: WorkdaySentiment | undefined;
  submitWorkday: (data: FormData, date?: Date) => Promise<void>;
  deleteWorkday: (date: Date) => Promise<void>;
  isReadOnly: boolean;
};

export const WorkdaySquare: FunctionComponent<WorkdaySquareProps> = ({
  date,
  submitWorkday,
  deleteWorkday,
  loggedData,
  isReadOnly,
}) => {
  const sentiment = loggedData?.sentiment;
  const defaultClass = isWeekend(date) ? styles.Weekend : styles.NoData;
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          title={format(date, 'EEEE, MMMM do')}
          aria-label={`Workday sentiment for ${format(date, 'EEEE, MMMM do')}`}
          className={`${styles.WorkdaySquare} ${sentiment ? SENTIMENT_TO_CLASS[sentiment] : defaultClass}`}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div className="flex flex-col gap-4">
            <p className={styles.PopoverTitle} style={{ marginBottom: 10 }}>
              {format(date, 'EEEE, MMMM do')}
            </p>
            {!sentiment && <p>No data</p>}
            {sentiment && (
              <p>
                {isReadOnly ? 'They' : 'You'} felt{' '}
                <span
                  className={`${SENTIMENT_TO_CLASS[sentiment]} ${styles.InlineSentiment}`}
                >
                  {SENTIMENT_TO_TEXT[sentiment]}
                </span>
              </p>
            )}
            {!sentiment && !isReadOnly && (
              <SubmitWorkday
                submitWorkday={data => submitWorkday(data, date)}
              />
            )}
            {sentiment && !isReadOnly && (
              <Button
                size="fluid"
                onClick={() => {
                  void deleteWorkday(date);
                }}
                variant="destructiveOutline"
              >
                Delete Data
              </Button>
            )}
          </div>
          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
