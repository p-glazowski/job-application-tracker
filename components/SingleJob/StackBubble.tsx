import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function StackBubble({ children }: Props) {
  return (
    <div className="bg-blue-400 text-white p-1 px-3 text-sm rounded-[10rem]">
      {children}
    </div>
  );
}
