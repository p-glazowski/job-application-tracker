import SinglePerk from './SinglePerk';
import orginize from '@/public/orginize.svg';
import time from '@/public/time.svg';
import progress from '@/public/progress.svg';

export default function PerksSection() {
  return (
    <section className="flex flex-col items-center my-20 max-w-250 mx-auto">
      <div className="flex w-full justify-between gap-5 items-center">
        <SinglePerk
          image={orginize}
          title="Stay Orginized"
          info="Keep track of all your job applications in one place"
        />
        <SinglePerk
          image={progress}
          title="Track Prgoress"
          info="Monitor your application status with visual boards"
        />
        <SinglePerk
          image={time}
          title="Save time"
          info="No more digging through emails or spreadsheets"
        />
      </div>
    </section>
  );
}
