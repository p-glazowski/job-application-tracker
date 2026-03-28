'use client';

import Image from 'next/image';
import StackBubble from './StackBubble';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import trash from '@/public/trash.svg';
import reject from '@/public/reject.svg';
import move from '@/public/move.svg';
import offer from '@/public/offer.svg';
import interview from '@/public/interview.svg';
import applied from '@/public/applied.svg';
import edit from '@/public/edit.svg';
import { deleteJob, moveJob } from '@/actions/prismaActions';
import { useRouter } from 'next/navigation';
import { Job } from '@/app/generated/prisma/client';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

export interface JobProps {
  company: string;
  position: string;
  location: string;
  salary: string | null;
  jobUrl: string;
  tags: string;
  description: string | null;
  notes: string | null;
  id: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  appliedAt: Date;
  userId: string;
}

interface Props {
  job: Job;
  onMoveJob?: (jobId: string, newStatus: string) => void;
}

export default function SingleJob({ job, onMoveJob }: Props) {
  const stack: string[] = job.tags.split(',');
  const [menu, setMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(false);
        setDeleteMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleMove(
    status: 'applied' | 'interview' | 'offer' | 'rejected',
  ) {
    await moveJob(job.id, status); // update DB
    onMoveJob?.(job.id, status); // update local state instantly
    setMenu(false);
  }

  return (
    <Link
      href={`/dashboard/${job.id}`}
      className="text-gray-500 bg-white p-6 rounded-md shadow-[0px_0px_10px_0px] shadow-gray-300 py-8 relative cursor-pointer hover:shadow-pink-500/30 block"
    >
      <div ref={menuRef} className="flex flex-col gap-3">
        {/* DELETE CONFIRMATION */}
        {deleteMenu && (
          <div
            className="absolute top-0 bottom-0 right-0 left-0 backdrop-blur-[2px] z-30 grid place-items-center p-4 bg-black/70 text-white rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">
                Are you sure you want to delete this job? This action cannot be
                undone.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="bg-red-500 text-white font-bold p-1 px-5 rounded-md cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDeleteMenu(false);
                  }}
                >
                  No
                </button>
                <button
                  className="bg-green-500 text-white font-bold p-1 px-5 rounded-md cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteJob(job.id);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MENU */}
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute top-5 right-15 z-20 bg-white rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400/60"
            >
              <button className="flex gap-3 p-2 px-3 w-full items-center">
                <Image
                  src={move}
                  alt="move to icon"
                  width={16}
                  height={16}
                  loading="eager"
                />
                <p className="text-xs">Move to</p>
              </button>
              {job.status !== 'applied' && (
                <button
                  className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full items-center pl-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleMove('applied');
                  }}
                >
                  <Image
                    src={applied}
                    alt="applied icon"
                    width={16}
                    height={16}
                    loading="eager"
                  />
                  <p className="text-xs">Applied</p>
                </button>
              )}
              {job.status !== 'interview' && (
                <button
                  className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full items-center pl-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleMove('interview');
                  }}
                >
                  <Image
                    src={interview}
                    alt="interview icon"
                    width={16}
                    height={16}
                    loading="eager"
                  />
                  <p className="text-xs">Interview</p>
                </button>
              )}
              {job.status !== 'offer' && (
                <button
                  className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full items-center pl-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleMove('offer');
                  }}
                >
                  <Image
                    src={offer}
                    alt="offer icon"
                    width={16}
                    height={16}
                    loading="eager"
                  />
                  <p className="text-xs">Offer</p>
                </button>
              )}
              {job.status !== 'rejected' && (
                <button
                  className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full items-center pl-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleMove('rejected');
                  }}
                >
                  <Image
                    src={reject}
                    alt="reject icon"
                    width={16}
                    height={16}
                    loading="eager"
                  />
                  <p className="text-xs">Rejected</p>
                </button>
              )}
              <button
                className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  router.push(`/dashboard/${job.id}/edit`);
                }}
              >
                <Image
                  src={edit}
                  alt="edit icon"
                  width={16}
                  height={16}
                  loading="eager"
                />
                <p className="text-xs">Edit Job</p>
              </button>
              <button
                className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setMenu(false);
                  setDeleteMenu(true);
                }}
              >
                <Image
                  src={trash}
                  alt="trash icon"
                  width={16}
                  height={16}
                  loading="eager"
                />
                <p className="text-xs">Delete Job</p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-black text-sm">{job.position}</h3>
            <p className="font-bold text-pink-500 text-2xl">{job.company}</p>
          </div>
          <button
            className="flex flex-col text-xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMenu((pS) => !pS);
            }}
          >
            ⠇
          </button>
        </div>
        <p className="text-sm">{job.notes}</p>
        <div className="flex gap-2 flex-wrap">
          {stack.map((item, i) => (
            <StackBubble key={i}>{item}</StackBubble>
          ))}
        </div>
      </div>
    </Link>
  );
}
