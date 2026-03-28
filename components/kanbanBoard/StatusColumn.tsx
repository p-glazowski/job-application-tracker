'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Job } from '@/app/generated/prisma/client';
import SortableJobCard from './SortableJob';
import Link from 'next/link';

interface Props {
  id: string;
  label: string;
  color: string;
  border: string;
  jobs: Job[];
  onMoveJob: (jobId: string, newStatus: string) => void;
}

export default function StatusColumn({
  id,
  label,
  color,
  border,
  jobs,
  onMoveJob,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    /*   <section
      className={`lg:shadow-[0px_0px_20px_0px] lg:shadow-gray-400/50 h-fit rounded-md transition-colors ${isOver ? 'bg-gray-100' : ''} border-l-2 ${border} h-full`}
    > */
    <section
      className={`shadow-[0px_0px_20px_0px] shadow-gray-400/50 rounded-md transition-colors ${isOver ? 'bg-gray-100' : ''}
  border-l-2 ${border} min-w-80  snap-center shrink-0 `}
    >
      <div className={`p-4 ${color} font-bold text-white rounded-t-md`}>
        <h2>{label}</h2>
      </div>
      <div
        ref={setNodeRef}
        className={`p-8 grid grid-cols-1 gap-5 rounded-b-md`}
      >
        <SortableContext
          items={jobs.map((j) => j.id)}
          strategy={verticalListSortingStrategy}
        >
          {jobs.map((job) => (
            <SortableJobCard key={job.id} job={job} onMoveJob={onMoveJob} />
          ))}
        </SortableContext>

        <Link
          href="/dashboard/add"
          className="text-gray-400 p-1 px-3 border-dashed border-gray-400 border rounded-md hover:border-pink-500 hover:text-pink-500 hover:bg-white w-fit"
        >
          + Add job
        </Link>
      </div>
    </section>
  );
}
