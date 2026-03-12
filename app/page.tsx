export default function Home() {
  return (
    <div className="flex-1">
      <section className="my-20 text-center max-w-200 mx-auto grid gap-4">
        <h1 className="text-6xl font-bold">
          A better way to track your{' '}
          <span className="text-pink-500">job applications</span>
        </h1>
        <p className="text-gray-500">
          Capture, organize and manage your job search in one place.
        </p>
        <div className="mt-5">
          <button className="bg-pink-500 rounded-md p-2 px-6 text-white font-bold cursor-pointer hover:bg-pink-600">
            Start right now!
          </button>
        </div>
        <p className="text-gray-400 text-xs">
          Free forever. No credit card required.
        </p>
      </section>
      <div className="border-b-2 border-black/10"></div>
      <section className="flex flex-col items-center my-20">
        <div className="flex gap-5">
          <button className="bg-gray-400 text-white p-1 px-4 rounded-md bg-pink-500 hover:opacity-80">
            Organize applications
          </button>
          <button className="bg-gray-400 text-white p-1 px-4 rounded-md hover:opacity-80">
            Get hired
          </button>
          <button className="bg-gray-400 text-white p-1 px-4 rounded-md hover:opacity-80">
            Manage boards
          </button>
        </div>
      </section>
      <div className="border-b-2 border-black/10"></div>
    </div>
  );
}
