'use client';

import { useRef, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  AutoScrollActivator,
} from '@dnd-kit/core';
import { Job } from '@/app/generated/prisma/client';
import StatusColumn from './StatusColumn';
import SingleJob from '../SingleJob/SingleJob';
import { updateJobStatus } from '@/actions/prismaActions';

const COLUMNS = [
  {
    id: 'applied',
    label: 'Applied',
    color: 'bg-blue-500',
    border: 'border-l-blue-500',
  },
  {
    id: 'interview',
    label: 'Interviewing',
    color: 'bg-purple-500',
    border: 'border-l-purple-500',
  },
  {
    id: 'offer',
    label: 'Offer',
    color: 'bg-green-500',
    border: 'border-l-green-500',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    color: 'bg-red-500',
    border: 'border-l-red-500',
  },
];

const VALID_STATUSES = ['applied', 'interview', 'offer', 'rejected'];

export default function KanbanBoard({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  function handleMoveJob(jobId: string, newStatus: string) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)),
    );
  }

  function handleDragStart(event: DragStartEvent) {
    const job = jobs.find((j) => j.id === event.active.id);
    setActiveJob(job ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const overId = over.id as string;

    // If dropped directly on a column, use it.
    // If dropped on a card, find which column that card belongs to.
    const newStatus = VALID_STATUSES.includes(overId)
      ? overId
      : jobs.find((j) => j.id === overId)?.status;

    if (!newStatus) return;

    const job = jobs.find((j) => j.id === active.id);
    if (!job || job.status === newStatus) return;

    // Optimistic update
    setJobs((prev) =>
      prev.map((j) => (j.id === active.id ? { ...j, status: newStatus } : j)),
    );

    try {
      await updateJobStatus(active.id as string, newStatus);
    } catch {
      // Roll back
      setJobs((prev) =>
        prev.map((j) =>
          j.id === active.id ? { ...j, status: job.status } : j,
        ),
      );
    }
  }

  return (
    <DndContext
      id="kanban-board"
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={{
        activator: AutoScrollActivator.Pointer, // scroll when pointer is near edge
        threshold: { x: 0.15, y: 0.15 }, // trigger within 15% of the edge
        acceleration: 10, // scroll speed
        interval: 5, // ms between scroll steps
      }}
    >
      {/*      <div className="flex-1 grid grid-cols-1 max-w-600 mx-auto w-full lg:grid-cols-4 lg:p-8 lg:gap-10"> */}
      <div
        ref={boardRef}
        className="w-full h-[calc(100dvh-64px)] lg:p-8 flex flex-row overflow-x-auto gap-10 p-4 scroll-smooth pb-6 items-stretch max-w-625 mx-auto xl:grid xl:grid-cols-4"
      >
        {COLUMNS.map((col) => (
          <StatusColumn
            key={col.id}
            id={col.id}
            label={col.label}
            color={col.color}
            border={col.border}
            jobs={jobs.filter((j) => j.status === col.id)}
            onMoveJob={handleMoveJob}
          />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? (
          <SingleJob job={activeJob} onMoveJob={handleMoveJob} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
