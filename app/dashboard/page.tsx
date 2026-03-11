import StatusPage from '@/components/StatusSection/StatusPage';

export default function Home() {
  return (
    <div className="flex-1 grid grid-cols-4 gap-10 p-4  max-w-600 mx-auto w-full">
      <StatusPage color="bg-blue-400">Applied</StatusPage>
      <StatusPage color="bg-purple-400">Interviewing</StatusPage>
      <StatusPage color="bg-green-500">Offer</StatusPage>
      <StatusPage color="bg-red-500">Rejected</StatusPage>
    </div>
  );
}
