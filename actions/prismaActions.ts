'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendData(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id as string;

  const myData = {
    userId: userId,
    status: formData.get('status') as string,
    company: formData.get('company') as string,
    position: formData.get('position') as string,
    location: formData.get('location') as string,
    salary: formData.get('salary') as string | null,
    jobUrl: formData.get('jobUrl') as string,
    tags: formData.get('tags') as string,
    description: formData.get('description') as string | null,
    notes: formData.get('notes') as string | null,
  };

  await prisma.job.create({ data: myData });
  redirect('/dashboard');
}

export async function moveJob(
  id: string,
  phase: 'applied' | 'interview' | 'offer' | 'rejected',
) {
  await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      status: phase,
    },
  });

  revalidatePath('/dashbaord');
}

export async function deleteJob(id: string) {
  await prisma.job.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/dashboard');
}

export async function updateJob(id: string, formData: FormData) {
  'use server';
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id as string;

  const myData = {
    userId: userId,
    status: formData.get('status') as string,
    company: formData.get('company') as string,
    position: formData.get('position') as string,
    location: formData.get('location') as string,
    salary: formData.get('salary') as string | null,
    jobUrl: formData.get('jobUrl') as string,
    tags: formData.get('tags') as string,
    description: formData.get('description') as string | null,
    notes: formData.get('notes') as string | null,
  };

  await prisma.job.update({ where: { id: id }, data: myData });
  redirect(`/dashboard/${id}`);
}

export async function updateJobStatus(jobId: string, status: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.job.update({
    where: { id: jobId, userId: session?.user?.id },
    data: { status: status as any },
  });
}
