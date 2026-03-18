import { auth } from '@/auth';
import Link from 'next/link';
import ScreenSection from '@/components/homePage/ScreenSection';
import PerksSection from '@/components/homePage/PerksSection';
import Footer from '@/components/Footer';

export default async function Home() {
  const session = await auth();

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
          <Link
            href={session ? '/dashboard' : '/login'}
            className="bg-pink-500 rounded-md p-2 px-6 text-white font-bold cursor-pointer hover:bg-pink-600"
          >
            Start right now!
          </Link>
        </div>
        <p className="text-gray-400 text-xs">
          Free forever. No credit card required.
        </p>
      </section>
      <div className="border-b-2 border-black/10"></div>
      <ScreenSection />
      <div className="border-b-2 border-black/10"></div>
      <PerksSection />
      <Footer />
    </div>
  );
}
