'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SingleJob from '../SingleJob/SingleJob';
import { Job } from '@/app/generated/prisma/client';

interface Props {
  job: Job;
  onMoveJob: (jobId: string, newStatus: string) => void;
}

export default function SortableJobCard({ job, onMoveJob }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group touch-action-none"
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <SingleJob job={job} onMoveJob={onMoveJob} />
    </div>
  );
}
