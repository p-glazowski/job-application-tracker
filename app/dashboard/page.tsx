import { auth } from '@/auth';
import StatusPage from '@/components/StatusSection/StatusPage';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) return redirect('/login');

  return (
    <div className="flex-1 grid grid-cols-4 gap-10 p-4  max-w-600 mx-auto w-full">
      <StatusPage color="bg-blue-500" status="applied">
        Applied
      </StatusPage>
      <StatusPage color="bg-purple-500" status="interview">
        Interviewing
      </StatusPage>
      <StatusPage color="bg-green-500" status="offer">
        Offer
      </StatusPage>
      <StatusPage color="bg-red-500" status="rejected">
        Rejected
      </StatusPage>
    </div>
  );
}
