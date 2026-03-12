import { sendData } from '@/actions/prismaActions';
import { SingleInput } from '@/components/form/SingleInput';
import SingleTextArea from '@/components/form/SingleTextArea';

export default async function Home() {
  return (
    <div className="flex-1 p-4 grid place-items-center">
      <form
        action={sendData}
        className="p-8 rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400/50 flex flex-col gap-8 w-3/4"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Add Job Application</h1>
          <p className="text-sm text-gray-500">Track a new job application</p>
        </div>
        <div className="flex flex-col gap-5">
          {/* FIRST ROW */}
          <div className="flex gap-5">
            <SingleInput id="company" req={true}>
              Company
            </SingleInput>
            <SingleInput id="position" req={true}>
              Position
            </SingleInput>
          </div>
          {/* SECOND ROW */}
          <div className="flex gap-5">
            <SingleInput id="location" req={true}>
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
          <SingleTextArea id="notes" req={false}>
            Notes
          </SingleTextArea>
        </div>
        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <div>
            <button className="p-2 px-3 rounded-md bg-pink-500 text-white font-bold">
              Add Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
