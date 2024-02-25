import AppImage from "@/components/AppImage";
import Link from "next/link";
import React from "react";
import cathaBot from "@/../public/cathaBotLogo.png";
import notFounds from "@/../public/notFound.svg";
import Image from "next/image";

export default function notFound() {
  return (
    <div className="w-screen h-screen gap-4 flex flex-col justify-center items-center">
      <h1 className="font-black text-xl md:text-5xl">
        Sorry, page not found :(
      </h1>
      <span className="w-3/5 h-1/3 relative">
        <Image src={notFounds} alt="cathabot not found" fill />
      </span>
      <Link
        className="py-1 px-6 bg-[#00E5FF] font-black rounded-full"
        href={"/user"}
      >
        Back
      </Link>
      <span className="font-bold mt-6">
        <Link
          href={"https://cathabot.com/"}
          target="_blank"
          className="flex items-center gap-2 hover:scale-110 hover:rotate-3 duration-500"
        >
          Powered By
          <AppImage className="w-5 h-5" src={cathaBot} alt="cathabot" />
          CathaBot
        </Link>
      </span>
    </div>
  );
}
