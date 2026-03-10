import StackBubble from './StackBubble';

export default function SingleJob() {
  return (
    <div className="text-gray-500 flex flex-col gap-2 bg-white p-4 rounded-md shadow-md shadow-gray-300">
      <div className="flex flex-row justify-between ">
        <div>
          <h3 className="text-xl text-black">Job title</h3>
          <p className="font-bold text-black">Company name</p>
        </div>
        <button className="flex flex-col text-xl cursor-pointer">⠇</button>
      </div>
      <p>Note</p>
      <div className="flex gap-2 flex-wrap">
        <StackBubble>React</StackBubble>
        <StackBubble>NextJs</StackBubble>
        <StackBubble>SQL</StackBubble>
      </div>
      <div>🔗</div>
    </div>
  );
}
