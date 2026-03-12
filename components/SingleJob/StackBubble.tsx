import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function StackBubble({ children }: Props) {
  return (
    <div className="bg-pink-500 text-white p-1 px-3 text-xs rounded-[10rem]">
      {children}
    </div>
  );
}
