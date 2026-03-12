import { ReactNode } from 'react';
import SingleJob from '../SingleJob/SingleJob';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

interface Props {
  children: ReactNode;
  color: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
}

export default async function StatusPage({ children, color, status }: Props) {
  const session = await auth();

  const jobs = await prisma.job.findMany({
    where: {
      userId: session?.user?.id,
      status: status,
    },
  });

  return (
    <section className="border border-gray-400/20 rounded-md overflow-hidden shadow-md shadow-gray-400/40 bg-gray-100/50">
      <div className={`p-4 ${color} font-bold text-white`}>
        <h2>{children}</h2>
      </div>
      <div className="p-8 flex flex-col gap-5">
        {jobs.map((job) => (
          <SingleJob job={job} key={job.id} />
        ))}

        {/*      <div>
          <button className="border border-gray-400/40 p-2 rounded-md bg-white text-gray-500 font-bold cursor-pointer text-sm">
            + Add Job
          </button>
        </div> */}
      </div>
    </section>
  );
}
