import { auth } from '@/auth';
import Link from 'next/link';
import ScreenSection from '@/components/homePage/ScreenSection';
import PerksSection from '@/components/homePage/PerksSection';
import Footer from '@/components/Footer';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <section className="text-center grid gap-4 p-4 py-15 md:py-40">
          <h1 className="text-5xl font-bold md:text-6xl">
            A better way to track your{' '}
            <span className="text-pink-500 block">job applications</span>
          </h1>
          <p className="text-gray-500">
            Capture, organize and manage your job search in one place.
          </p>
          <div className="mt-5">
            <Link
              href={session ? '/dashboard' : '/login'}
              className="bg-pink-500 rounded-md p-4 px-10 text-white font-bold cursor-pointer hover:bg-pink-600"
            >
              Start right now!
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Free forever. No credit card required.
          </p>
        </section>
        <div className="border-b-2 border-black/10"></div>
        <ScreenSection />
        <div className="border-b-2 border-black/10"></div>
        <PerksSection />
      </div>
      <Footer />
    </div>
  );
}
