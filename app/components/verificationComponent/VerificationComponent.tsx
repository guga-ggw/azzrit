"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import ButtonInputElement from "@/app/elements/button/buttonInput.Element";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/verify-email/verifyEmail";
import { BeatLoader } from "react-spinners";

const VerificationComponent = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const token = searchParams.get("token");
  const navigate = useRouter();
  const [message, setMessage] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("missing token");
      return;
    }
    newVerification(token)
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  useEffect(() => {
    if (message === "email verified") {
      navigate.push("/signIn");
    }
  }, [message, navigate]);

  return (
    <div className="w-96 h-52 bg-white gap-2 px-10 rounded-lg flex items-center justify-center flex-col">
      <motion.h1>Confirming your verification</motion.h1>
      {message ? (
        <>{message}</>
      ) : error ? (
        <motion.div className="w-full h-12 rounded-lg px-2 flex items-center justify-around bg-opacity-80 mt-5 bg-red-200">
          <motion.h2 className="font-kanit text-red-500 font-semibold">
            Something went wrong
          </motion.h2>
        </motion.div>
      ) : (
        <BeatLoader />
      )}
      <Link href={"/signIn"}>
        <ButtonInputElement text="back to Login" />
      </Link>
    </div>
  );
};

export default VerificationComponent;
