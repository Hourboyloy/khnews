import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderSection = ({ title, bgColor, textColor, label }) => {
  return (
    <div className="text-white mt-4 mb-2">
      <div className="my-1 flex justify-between items-center">
        {/* Left */}
        <Link
          href={`${label}`}
          className={`${bgColor} pl-4 pr-14 py-[0.50rem] relative overflow-hidden flex items-center`}
        >
          <h2 className="text-2xl">{title}</h2>
          <div
            className="absolute h-full right-0 border-t-[45px] border-l-[45px] border-t-white border-l-transparent"
            aria-hidden="true"
          />
        </Link>
        {/* Right */}
        <Link
          href={`${label}`}
          className={`${textColor} flex items-end gap-4 px-6`}
        >
          <h2 className="cursor-pointer text-lg font-semibold SFPro">
            View All
          </h2>
          <ArrowRight className="cursor-pointer mb-1" />
        </Link>
      </div>
      <div className={`${bgColor} h-2 w-full`}></div>
    </div>
  );
};

export default HeaderSection;
