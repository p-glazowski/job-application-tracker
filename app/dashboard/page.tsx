import { auth } from '@/auth';
import StatusPage from '@/components/StatusSection/StatusPage';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) return redirect('/login');

  return (
    <div className="flex-1 grid grid-cols-1 max-w-600 mx-auto w-full lg:grid-cols-4 lg:p-8 lg:gap-10">
      <StatusPage
        color="bg-blue-500"
        status="applied"
        border="border-l-blue-500"
      >
        Applied
      </StatusPage>
      <StatusPage
        color="bg-purple-500"
        status="interview"
        border="border-l-purple-500"
      >
        Interviewing
      </StatusPage>
      <StatusPage
        color="bg-green-500"
        status="offer"
        border="border-l-green-500"
      >
        Offer
      </StatusPage>
      <StatusPage
        color="bg-red-500"
        status="rejected"
        border="border-l-red-500"
      >
        Rejected
      </StatusPage>
    </div>
  );
}
