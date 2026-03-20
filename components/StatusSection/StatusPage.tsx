import { ReactNode } from 'react';
import SingleJob from '../SingleJob/SingleJob';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  color: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  border: string;
}

export default async function StatusPage({
  children,
  color,
  status,
  border,
}: Props) {
  const session = await auth();

  const jobs = await prisma.job.findMany({
    where: {
      userId: session?.user?.id,
      status: status,
    },
  });

  return (
    <section className="lg:shadow-[0px_0px_20px_0px] lg:shadow-gray-400/50 h-fit rounded-md">
      {/* <section className="border-gray-400/20 rounded-b-md bg-gray-100/60 relative pb-10 lg:shadow-[0px_0px_20px_0px] lg:shadow-gray-400/50 border-l-4 border-l-blue-500 rounded-t-md"> */}
      <div
        className={`p-4 ${color} font-bold text-white sticky top-0 left-0 right-0 z-10 lg:rounded-t-md lg:relative`}
      >
        <h2>{children}</h2>
      </div>
      <div
        className={`p-8 grid grid-cols-1 gap-5 rounded-b-md border-l-2 ${border}`}
      >
        {jobs.map((job) => (
          <SingleJob job={job} key={job.id} />
        ))}
        {jobs.length === 0 && (
          <div>
            <Link
              href={'/dashboard/add'}
              className="text-gray-400 p-1 px-3 border-dashed border-gray-400 border rounded-md hover:border-pink-500 hover:text-pink-500 hover:bg-white"
            >
              + Add job
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
