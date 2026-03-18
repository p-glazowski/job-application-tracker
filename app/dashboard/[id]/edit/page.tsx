import Link from 'next/link';
import EditForm from './EditForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) return redirect('/login');

  const { id } = await params;

  return (
    <div className="flex-1">
      <div className="mt-2 pl-10 text-gray-500 underline mb-2 underline-offset-2">
        <Link href={`/dashboard/${id}`} className="">
          ← Go back
        </Link>
      </div>
      <EditForm id={id} />
    </div>
  );
}
