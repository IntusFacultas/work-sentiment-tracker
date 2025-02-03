import { FunctionComponent } from 'react';
import { Button } from '../../foundation/Button';
import { WorkSentiment } from '@prisma/client';

export const SubmitWorkday: FunctionComponent<{
  submitWorkday: (data: FormData) => Promise<void>;
}> = ({ submitWorkday }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-4 items-center">
        <form action={submitWorkday}>
          <input type="hidden" name="sentiment" value={WorkSentiment.GREEN} />
          <Button variant="happy">Happy</Button>
        </form>
        <form action={submitWorkday}>
          <input type="hidden" name="sentiment" value={WorkSentiment.YELLOW} />
          <Button variant="stressed">Stressed</Button>
        </form>
        <form action={submitWorkday}>
          <input type="hidden" name="sentiment" value={WorkSentiment.RED} />
          <Button variant="unhappy">Unhappy</Button>
        </form>
      </div>
    </div>
  );
};
