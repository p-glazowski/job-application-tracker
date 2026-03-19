'use client';

import boardSS from '@/public/heroScreen.jpg';
import singleJobSS from '@/public/singleApp.jpg';
import addJobSS from '@/public/addJobSS.jpg';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

export default function ScreenSection() {
  const [image, setImage] = useState(1);

  function changeImage(id: number) {
    setImage(id);
  }

  function showImage() {
    if (image === 2) {
      return singleJobSS;
    }

    if (image === 3) {
      return addJobSS;
    }

    return boardSS;
  }

  return (
    <section className="flex flex-col items-center my-20 max-w-200 mx-auto">
      <div className="flex gap-5">
        <button
          className={`text-white p-1 px-4 rounded-md ${image === 1 ? 'bg-pink-500' : 'bg-gray-400'} hover:opacity-80 cursor-pointer`}
          onClick={() => {
            changeImage(1);
          }}
        >
          Organize applications
        </button>
        <button
          className={`text-white p-1 px-4 rounded-md ${image === 2 ? 'bg-pink-500' : 'bg-gray-400'} hover:opacity-80 cursor-pointer`}
          onClick={() => {
            changeImage(2);
          }}
        >
          Get hired
        </button>
        <button
          className={`text-white p-1 px-4 rounded-md ${image === 3 ? 'bg-pink-500' : 'bg-gray-400'} hover:opacity-80 cursor-pointer`}
          onClick={() => {
            changeImage(3);
          }}
        >
          Manage boards
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={image}
          className="mt-10 shadow-[0px_0px_10px_0px] shadow-gray-500/50 rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className="h-100">
            <Image
              src={showImage()}
              alt="Main ss"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
