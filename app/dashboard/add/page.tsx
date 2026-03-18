import { sendData } from '@/actions/prismaActions';
import { auth } from '@/auth';
import { SingleInput } from '@/components/form/SingleInput';
import SingleTextArea from '@/components/form/SingleTextArea';
import SubmitButton from '@/components/form/SubmitButton';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  console.log(session);

  if (!session) return redirect('/login');

  return (
    <div className="flex-1 p-10 grid place-items-center">
      <form
        action={sendData}
        className="p-8 rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400/50 flex flex-col gap-8 w-3/4"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-pink-500">
            Add Job Application
          </h1>
          <p className="text-sm text-gray-500">Track a new job application</p>
        </div>
        <div className="flex flex-col gap-5">
          {/* FIRST ROW */}
          <div className="flex gap-5">
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
          <div className="flex gap-5">
            <SingleInput id="location" req={true} placeholder="Warsaw, Poland">
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
          <SingleInput id="tags" req={true} placeholder="React, Tailwind, SQL">
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
  );
}
