import LoginButton from '@/components/Login/LoginButton';

export default function Home() {
  return (
    <div className="flex-1 bg-white grid place-items-center p-5">
      <div className="border border-gray-300/40 rounded-md p-8 bg-white shadow-[0px_0px_10px_0px] shadow-gray-600/20">
        <h1 className="font-bold text-2xl text-center">
          Welcome to <span className="text-pink-600 block">Job Tracker</span>
        </h1>
        <p className="text-gray-500 text-sm text-center">
          Sign in to your account to continue
        </p>
        <div className="flex flex-col gap-5 mt-10">
          <LoginButton image="/google.png" provider="Google" />
          <LoginButton image="/githubb.png" provider="Github" />
        </div>
      </div>
    </div>
  );
}
