import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
  req: boolean;
  placeholder?: string;
  defaultValue?: string;
}

export function SingleInput({
  children,
  id,
  req,
  placeholder,
  defaultValue,
}: Props) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label htmlFor={id} className="font-bold text-gray-500">
        {children} {req ? <span className="text-pink-500">*</span> : ''}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        required={req}
        className="border border-gray-400/40 rounded-md p-1 px-3 outline-pink-500"
        placeholder={placeholder ? placeholder : ''}
        defaultValue={defaultValue ? defaultValue : ''}
      />
    </div>
  );
}
