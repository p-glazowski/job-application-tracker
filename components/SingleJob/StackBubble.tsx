import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  size?: string;
}

export default function StackBubble({ children, size = 'xs' }: Props) {
  return (
    <div
      className={`bg-pink-500 text-white p-1 px-3 text-${size} rounded-[10rem]`}
    >
      {children}
    </div>
  );
}
