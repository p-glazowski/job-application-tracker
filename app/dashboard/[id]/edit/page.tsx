import Link from 'next/link';
import EditForm from './EditForm';

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
