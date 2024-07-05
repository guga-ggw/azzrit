'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { IoMdPerson } from "react-icons/io";
import { motion } from 'framer-motion';
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { signOutUser } from '@/actions/signOut/signOutUser';
import { IoMdLogIn } from "react-icons/io";
import Link from 'next/link';
import { MdLogin } from "react-icons/md";
import useDevice from '@/hooks/getDeviceHook';
import Image from 'next/image';
import { noUserImage } from '@/app/additional/texts';
import { IUser } from '@/types/types';

const Usernav = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const device = useDevice();

  const handleInteraction = () => {
    setShowModal(!showModal);
  };

  console.log(session?.user.image)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeIn" }} className='absolute top-5 right-8 text-red-600 font-poppins'>
      {typeof session?.user.image == 'string' ? (
          <Image
          src={`${session?.user.image == noUserImage ? noUserImage : session.user.image.includes('http') ? session.user.image : `/uploads/${session.user.image}` }`}
          className='w-12 h-12 rounded-full cursor-pointer'
          onClick={device === 'mobile' ? handleInteraction : undefined}
        onMouseEnter={device !== 'mobile' ? () => setShowModal(true) : undefined}
        onMouseLeave={device !== 'mobile' ? () => setShowModal(false) : undefined}
          alt='pfp'
          width={100}
          height={100}
          />
      ) : (
        <IoMdPerson
        className='text-5xl border-2 border-red-600 hover:bg-white duration-500 ease-in bg-black cursor-pointer rounded-full p-[5px]'
        onClick={device === 'mobile' ? handleInteraction : undefined}
        onMouseEnter={device !== 'mobile' ? () => setShowModal(true) : undefined}
        onMouseLeave={device !== 'mobile' ? () => setShowModal(false) : undefined}
      />
      )}
      
      {showModal && (
        <div
          className='absolute top-10 z-10 w-48 right-1 h-fit p-5'
          onClick={device === 'mobile' ? handleInteraction : undefined}
          onMouseEnter={device !== 'mobile' ? () => setShowModal(true) : undefined}
          onMouseLeave={device !== 'mobile' ? () => setShowModal(false) : undefined}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            className='py-1 gap-2 items-center flex flex-col h-fit rounded-md bg-black border-[1px] px-2 border-red-500 bg-opacity-75 absolute text-white right-2 top-5'
            style={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
          >
            {session ? (
              <div className='w-72'>
                <motion.div className='flex flex-col font-semibold gap-3 p-1 pb-1'>
                  <motion.p>Name: {session?.user.name}</motion.p>
                  <motion.p>Email: {session?.user.email}</motion.p>
                </motion.div>
                <div className='flex w-full text-red-500 border-t-[1px] border-red-500 py-3 gap-3'>
                  <Link href={'/editprofile'} className='flex hover:text-white duration-500 ease-in-out border-[1px] border-red-500 rounded-xl p-[3px] justify-center gap-2 items-center w-1/2'>
                    edit
                    <FaEdit />
                  </Link>
                  <button
                    className='flex hover:text-white duration-500 ease-in-out border-[1px] border-red-500 rounded-xl pl-4 pr-2 justify-center gap-2 items-center w-1/2'
                    onClick={async () => {
                      await signOutUser();
                      window.location.href = window.location.href + '?refresh=' + new Date().getTime();
                    }}
                  >
                    Log Out
                    <FaSignOutAlt />
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col p-3 gap-2'>
                <Link href={'/signIn'} className='w-full hover:text-red-500 duration-500 ease-in-out flex items-center justify-between gap-2'>
                <IoMdLogIn /> Sign In 
                </Link>
                <Link href={'/signUp'} className='w-full hover:text-red-500 duration-500 ease-in-out flex items-center justify-between gap-2'>
                <MdLogin /> Sign Up 
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Usernav;
