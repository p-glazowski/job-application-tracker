import { sendData } from '@/actions/prismaActions';
import { auth } from '@/auth';
import { SingleInput } from '@/components/form/SingleInput';
import SingleTextArea from '@/components/form/SingleTextArea';
import SubmitButton from '@/components/form/SubmitButton';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  console.log(session);

  if (!session) return redirect('/login');

  return (
    <div className="flex-1">
      <div className="px-4 py-2 text-gray-500 underline underline-offset-2 max-w-600 w-full mx-auto">
        <Link href={'/dashboard'} className="">
          ← Dashboard
        </Link>
      </div>
      <div className="p-4 pb-20">
        <form
          action={sendData}
          className="p-4 rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400/50 flex flex-col gap-8 max-w-400 mx-auto"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-pink-500">
              Add Job Application
            </h1>
            <p className="text-sm text-gray-500">Track a new job application</p>
          </div>
          <div className="flex flex-col gap-5">
            {/* STATUS */}
            <div className="flex flex-col gap-1 w-fit">
              <label
                htmlFor="status"
                className="text-sm font-bold text-gray-500"
              >
                Status <span className="text-pink-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                defaultValue="applied"
                className="border border-gray-300 rounded-md p-1 px-3 text-black outline-none focus:border-pink-400 w-full"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {/* FIRST ROW */}
            <div className="flex gap-5 flex-col md:flex-row">
              <SingleInput id="company" req={true} placeholder="Google">
                Company
              </SingleInput>
              <SingleInput
                id="position"
                req={true}
                placeholder="Senior Software Developer"
              >
                Position
              </SingleInput>
            </div>
            {/* SECOND ROW */}
            <div className="flex gap-5 flex-col md:flex-row">
              <SingleInput
                id="location"
                req={true}
                placeholder="Warsaw, Poland"
              >
                Location
              </SingleInput>
              <SingleInput id="salary" req={false} placeholder="$100k - $200k">
                Salary
              </SingleInput>
            </div>
            {/* THIRD ROW */}
            <SingleInput id="jobUrl" req={true} placeholder="https://...">
              Job URL
            </SingleInput>
            {/* FOURTH ROW */}
            <SingleInput
              id="tags"
              req={true}
              placeholder="React, Tailwind, SQL"
            >
              Tags (comma-separated)
            </SingleInput>
            {/* FIFTH ROW */}
            <SingleTextArea
              id="description"
              req={false}
              placeholder="Brief description of the role..."
            >
              Description
            </SingleTextArea>
            {/* SIXTH ROW */}
            <SingleTextArea
              id="notes"
              req={false}
              placeholder="Your own thoughts..."
            >
              Notes
            </SingleTextArea>
          </div>
          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <div>
              <SubmitButton>Add Application</SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
