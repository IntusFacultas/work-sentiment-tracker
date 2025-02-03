import { FunctionComponent } from 'react';

export const Footer: FunctionComponent = () => {
  return (
    <footer className="mx-0 my-4 flex w-full flex-col gap-4 px-4 text-sm sm:mx-auto sm:my-12 sm:h-5 sm:max-w-3xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex item-center justify-start gap-1">
        <a target="_blank" href="https://icons8.com/icon/h9mBzekKvWas/clock">
          Clock{' '}
        </a>
        <span>icon by </span>
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </footer>
  );
};
