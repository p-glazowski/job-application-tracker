import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AvatarLetter({ children }: Props) {
  const firstLetter = children?.toString().split('').slice(0, 1);
  return (
    <div className="w-8 h-8 rounded-[50%] bg-orange-400 grid place-items-center text-white">
      {firstLetter}
    </div>
  );
}
