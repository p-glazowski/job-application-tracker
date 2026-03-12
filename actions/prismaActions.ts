import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function sendData(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id as string;

  const myData = {
    userId: userId,
    status: 'applied',
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
