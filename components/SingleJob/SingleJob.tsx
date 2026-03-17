'use client';

import Image from 'next/image';
import StackBubble from './StackBubble';
import link from '@/public/link.svg';
import Link from 'next/link';
import { useState } from 'react';
import trash from '@/public/trash.svg';
import reject from '@/public/reject.svg';
import move from '@/public/move.svg';
import offer from '@/public/offer.svg';
import interview from '@/public/interview.svg';
import applied from '@/public/applied.svg';
import { deleteJob, moveJob } from '@/actions/prismaActions';
import { redirect } from 'next/navigation';

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
  status: string;
  appliedAt: Date;
  userId: string;
}

export default function SingleJob({ job }: { job: JobProps }) {
  const stack: string[] = job.tags.split(',');
  const [menu, setMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);

  return (
    <Link
      href={`/dashboard/${job.id}`}
      className="text-gray-500 flex flex-col gap-3 bg-white p-6 rounded-md shadow-md shadow-gray-300 py-8 relative overflow-hidden cursor-pointer"
    >
      {/* DELETE CONF */}
      {deleteMenu && (
        <div className="absolute top-0 bottom-0 right-0 left-0 backdrop-blur-[2px] z-30 grid place-items-center">
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
      {menu && (
        <div className="absolute top-5 right-15 z-20 bg-white rounded-md shadow-[0px_0px_10px_0px] shadow-gray-400/60 ">
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
                moveJob(job.id, 'applied');
              }}
            >
              <Image
                src={applied}
                alt="interview icon"
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
                moveJob(job.id, 'interview');
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
                moveJob(job.id, 'offer');
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
          {job.status !== 'reject' && (
            <button
              className="flex gap-3 cursor-pointer p-2 px-3 hover:bg-pink-300/10 w-full items-center pl-6"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                moveJob(job.id, 'rejected');
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
        </div>
      )}
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
      {/*       <div className="w-fit">
        <Link href={job.jobUrl} target="_blank">
          <Image
            src={link}
            alt="link icon"
            width={16}
            height={16}
            className="opacity-60"
          />
        </Link>
      </div> */}
    </Link>
  );
}
