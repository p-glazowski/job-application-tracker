import { updateJob } from '@/actions/prismaActions';
import { SingleInput } from '@/components/form/SingleInput';
import SingleTextArea from '@/components/form/SingleTextArea';
import SubmitButton from '@/components/form/SubmitButton';
import { prisma } from '@/lib/prisma';

interface Props {
  id: string;
}

export default async function EditForm({ id }: Props) {
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });

  const updateJobWithId = updateJob.bind(null, id);

  return (
    <div className="p-4 md:grid md:place-items-center">
      <form
        action={updateJobWithId}
        className="p-8 rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400/50 flex flex-col gap-8 md:w-3/4"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-pink-500">
            Edit Job Application
          </h1>
          <p className="text-sm text-gray-500">
            Edit your current job application
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {/* STATUS */}
          <div className="flex flex-col gap-1 w-fit">
            <label htmlFor="status" className="text-sm font-bold text-gray-500">
              Status <span className="text-pink-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              defaultValue={job?.status}
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
            <SingleInput
              id="company"
              req={true}
              placeholder="Google"
              defaultValue={job?.company}
            >
              Company
            </SingleInput>
            <SingleInput
              id="position"
              req={true}
              placeholder="Senior Software Developer"
              defaultValue={job?.position}
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
              defaultValue={job?.location}
            >
              Location
            </SingleInput>
            <SingleInput
              id="salary"
              req={false}
              placeholder="$100k - $200k"
              defaultValue={job?.salary ? job.salary : ''}
            >
              Salary
            </SingleInput>
          </div>
          {/* THIRD ROW */}
          <SingleInput
            id="jobUrl"
            req={true}
            placeholder="https://..."
            defaultValue={job?.jobUrl}
          >
            Job URL
          </SingleInput>
          {/* FOURTH ROW */}
          <SingleInput
            id="tags"
            req={true}
            placeholder="React, Tailwind, SQL"
            defaultValue={job?.tags}
          >
            Tags (comma-separated)
          </SingleInput>
          {/* FIFTH ROW */}
          <SingleTextArea
            id="description"
            req={false}
            placeholder="Brief description of the role..."
            defaultValue={job?.description ? job.description : ''}
          >
            Description
          </SingleTextArea>
          {/* SIXTH ROW */}
          <SingleTextArea
            id="notes"
            req={false}
            placeholder="Your own thoughts..."
            defaultValue={job?.notes ? job.notes : ''}
          >
            Notes
          </SingleTextArea>
        </div>
        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <div>
            <SubmitButton loading="Editing...">Save Application</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
