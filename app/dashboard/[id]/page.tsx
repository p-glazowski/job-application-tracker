import { auth } from '@/auth';
import StackBubble from '@/components/SingleJob/StackBubble';
import { prisma } from '@/lib/prisma';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) return redirect('/login');

  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });

  const jobTags = job?.tags.split(',');

  function getBgColor() {
    if (job?.status === 'interview') {
      return 'bg-purple-500';
    }

    if (job?.status === 'offer') {
      return 'bg-green-500';
    }

    if (job?.status === 'rejected') {
      return 'bg-red-500';
    }

    return 'bg-blue-500';
  }

  function getBubbleColors() {
    if (job?.status === 'interview') {
      return 'bg-purple-200 text-purple-500';
    }

    if (job?.status === 'offer') {
      return 'bg-green-200 text-green-500';
    }

    if (job?.status === 'rejected') {
      return 'bg-red-200 text-red-500';
    }

    return 'bg-blue-200 text-blue-500';
  }

  if (!job) {
    return (
      <div className="flex-1 bg-gray-200 p-10 grid place-items-center">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold">
            Looks like this job doesn't exist, sorry!
          </h1>
          <Link
            href={'/dashboard'}
            className="bg-pink-500 text-white rounded-md p-2 px-5"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-200 flex flex-col">
      <div className="px-4 py-2 text-gray-500 underline underline-offset-2 max-w-600 w-full mx-auto">
        <Link href={'/dashboard'} className="">
          ← Go back
        </Link>
      </div>
      <div className="p-10 py-5 flex-1 grid">
        <div className="bg-white w-full rounded-md overflow-hidden max-w-300 mx-auto">
          <div className={clsx(`h-4 w-full ${getBgColor()}`)}></div>
          <section className="p-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl text-gray-500">{job.position}</h1>
                <h2 className="text-2xl text-pink-500 font-bold">
                  {job.company}
                </h2>
                <div className="mt-3">
                  <h3 className="bg-gray-200 text-gray-600 p-1 px-4 rounded-[10rem] inline">
                    {job.location}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end justify-between">
                <div className="flex flex-col gap-2 items-end">
                  <div
                    className={clsx(
                      `${getBubbleColors()} rounded-[10rem] p-1 px-4 capitalize`,
                    )}
                  >
                    {job.status}
                  </div>
                  <p className="text-xs text-gray-500">
                    Applied @ {job.appliedAt.toDateString()}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/dashboard/${id}/edit`}
                    className="bg-pink-500 text-white p-1 px-4 rounded-md cursor-pointer hover:bg-white hover:text-pink-500 hover:shadow-[0px_0px_0px_2px] hover:shadow-pink-500"
                  >
                    Edit your application
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-gray-400/30 my-10"></div>
            <div className="flex gap-20 justify-between">
              <div className="flex-1 flex flex-col gap-6">
                {/* SALARY */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-400 text-sm font-bold">Salary</h4>
                  <p className="p-2 px-5 rounded-md text-green-600 bg-green-200 w-fit">
                    {job.salary} / month
                  </p>
                </div>
                {/* TAGS */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-400 text-sm font-bold">Tags</h4>
                  <div className="flex gap-2 flex-wrap">
                    {jobTags?.map((item, i) => (
                      <StackBubble size="sm" key={i}>
                        {item}
                      </StackBubble>
                    ))}
                  </div>
                </div>
                {/* NOTES */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-400 text-sm font-bold">Notes</h4>
                  <p className="bg-gray-200 text-sm p-6 rounded-md">
                    {job.notes}
                  </p>
                </div>
                {/* DESC */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-400 text-sm font-bold">
                    Description
                  </h4>
                  <p className="bg-gray-200 text-sm p-6 rounded-md">
                    {job.description}
                  </p>
                </div>
                {/* WEBSITE */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-400 text-sm font-bold">
                    Application website
                  </h4>
                  <Link
                    target="_blank"
                    href={job.jobUrl}
                    className="text-pink-500 w-fit underline cursor-pointer underline-offset-1"
                  >
                    View listing
                  </Link>
                </div>
              </div>
              {/* RIGHT SIDE */}
              <div className="flex-1 flex flex-col gap-20 justify-between">
                {/* APP TIMELINE SOON FEEATURE */}
                {/*   <div className="flex flex-col gap-2">
                <h4 className="text-gray-400 text-sm font-bold">
                  Application Timeline
                </h4>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-[50%] bg-blue-400"></div>
                    <div className="border border-gray-400/40 flex-1"></div>
                  </div>
                  <div>
                    <p>Applied</p>
                    <div className="text-xs text-gray-400">
                      <p>Mar. 10, 2025</p>
                      <p>Submitted application</p>
                    </div>
                  </div>
                </div>
                </div> */}
                {/* QUICK INFO */}
                <div className="p-4 bg-pink-100 text-pink-500 rounded-md">
                  <h4 className="text-sm font-bold">Quick info</h4>
                  <div className="border border-pink-400/20 my-5"></div>
                  <div className="flex flex-col gap-2 w-[50%]">
                    <div className="text-sm flex justify-between">
                      <p className="text-gray-400">Company</p>
                      <p className="text-pink-500 font-bold w-40">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-sm flex justify-between">
                      <p className="text-gray-400">Position</p>
                      <p className="text-pink-500 font-bold  w-40">
                        {job.position}
                      </p>
                    </div>
                    <div className="text-sm flex justify-between">
                      <p className="text-gray-400">Location</p>
                      <p className="text-pink-500 font-bold  w-40">
                        {job.location}
                      </p>
                    </div>
                    <div className="text-sm flex justify-between">
                      <p className="text-gray-400">Status</p>
                      <p className="text-pink-500 font-bold  w-40 capitalize">
                        {job.status}
                      </p>
                    </div>
                    <div className="text-sm flex justify-between">
                      <p className="text-gray-400">Applied at</p>
                      <p className="text-pink-500 font-bold  w-40">
                        {job.appliedAt.toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
