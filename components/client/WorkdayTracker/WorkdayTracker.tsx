'use client';
import { getDatesInYear } from '@/lib/getDatesInYear';
import { User, WorkdaySentiment } from '@prisma/client';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SubmitWorkday } from './components/SubmitWorkday';
import { DayChart } from './components/DayChart';
import toastStyles from '../Toast.module.css';
import { Toast } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';

type WorkdayTrackerProps = {
  loadLoggedDates: () => Promise<WorkdaySentiment[]>;
  deleteWorkday: (date: Date) => Promise<boolean>;
  submitWorkday: (data: FormData, date?: Date) => Promise<void>;
  viewingUser?: User;
};

export const WorkdayTracker: FunctionComponent<WorkdayTrackerProps> = ({
  loadLoggedDates,
  deleteWorkday,
  submitWorkday,
  viewingUser,
}) => {
  const [data, setData] = useState<WorkdaySentiment[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dates = useMemo(() => {
    return getDatesInYear(new Date().getFullYear());
  }, []);

  const fetchData = useCallback(async () => {
    setData(await loadLoggedDates());
  }, [loadLoggedDates]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const onSubmitWorkday = useCallback(
    async (data: FormData, date?: Date) => {
      setToastMessage('Submitting workday...');
      await submitWorkday(data, date);
      await fetchData();
    },
    [submitWorkday, fetchData],
  );

  const onWorkdayDelete = useCallback(
    async (date: Date) => {
      const success = await deleteWorkday(date);
      if (success) {
        setToastMessage('Deleted workday sentiment');
      } else {
        setToastMessage('Failed to delete workday sentiment');
      }
      await fetchData();
    },
    [deleteWorkday, fetchData],
  );

  return (
    <Toast.Provider>
      <div className="flex flex-col items-center gap-4">
        {viewingUser ? (
          <h1>Viewing {viewingUser.name}</h1>
        ) : (
          <>
            <h1>Log Today&apos;s Sentiment</h1>
            <SubmitWorkday submitWorkday={onSubmitWorkday} />
          </>
        )}
        <DayChart
          isReadOnly={!!viewingUser}
          deleteWorkday={onWorkdayDelete}
          submitWorkday={onSubmitWorkday}
          dates={dates}
          loggedDates={data}
        />
      </div>
      <Toast.Root
        className={toastStyles.ToastRoot}
        open={!!toastMessage}
        onOpenChange={() => setToastMessage(null)}
      >
        <Toast.Title className={toastStyles.ToastTitle}>
          {toastMessage}
        </Toast.Title>
        <Toast.Close>
          <Cross2Icon />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={toastStyles.ToastViewport} />
    </Toast.Provider>
  );
};
