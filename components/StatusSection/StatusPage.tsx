import { ReactNode } from 'react';
import SingleJob from '../SingleJob/SingleJob';

interface Props {
  children: ReactNode;
  color: string;
}

export default function StatusPage({ children, color }: Props) {
  return (
    <section className="border border-gray-400/20 rounded-md overflow-hidden shadow-md shadow-gray-400/40">
      <div className={`p-4 ${color} font-bold text-white`}>
        <h2>{children}</h2>
      </div>
      <div className="p-8 bg-gray-100/50 flex flex-col gap-5">
        <SingleJob />
        <SingleJob />
        <div>
          <button className="border border-gray-400/40 p-2 rounded-md bg-white text-gray-500 font-bold cursor-pointer text-sm">
            + Add Job
          </button>
        </div>
      </div>
    </section>
  );
}
