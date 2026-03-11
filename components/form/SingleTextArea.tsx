import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
  req: boolean;
  placeholder?: string;
}

export default function SingleTextArea({
  children,
  id,
  req,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-bold text-gray-500">
        {children}
      </label>
      <textarea
        name={id}
        id={id}
        className="border border-gray-400/40 rounded-md p-2 px-3 outline-pink-500"
        placeholder={placeholder ? placeholder : ''}
      ></textarea>
    </div>
  );
}
