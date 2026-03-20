import Image from 'next/image';

interface Props {
  image: string;
  title: string;
  info: string;
}

export default function SinglePerk({ image, title, info }: Props) {
  return (
    <div className="flex flex-col gap-2 max-w-60 items-center">
      <div className="w-fit p-2 bg-pink-500/10 rounded-[50%] mb-2">
        <Image src={image} alt={`${image} logo`} width={32} height={32} />
      </div>
      <h2 className="text-xl font-bold text-black">{title}</h2>
      <p className="text-gray-500 text-center">{info}</p>
    </div>
  );
}
