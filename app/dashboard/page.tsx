// app/dashboard/page.tsx
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default async function Home() {
  const session = await auth();
  if (!session) return redirect('/login');

  const jobs = await prisma.job.findMany({
    where: { userId: session?.user?.id },
    orderBy: { appliedAt: 'desc' },
  });

  return <KanbanBoard initialJobs={jobs} />;
}
