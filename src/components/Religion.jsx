import { datas } from "../utils/datas";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import { truncateText3 } from "../utils/truncateText3";
import { truncateText2 } from "../utils/truncateText2";
import { truncateText } from "../utils/truncateText";
import Link from "next/link";

const Religion = () => {

  return (
    <div className="mb-4">
      <HeaderSection
        title={"ជំនឿសាសនា"}
        textColor={"text-yellow-500"}
        bgColor={"bg-yellow-500"}
        label={"/religion"}
      />
      <div className="flex flex-col md:flex-row space-x-2.5 space-y-4">
        {/* 2 Cols Grid big one */}
        <div className="grid grid-rows-1 grid-cols-3 md:grid-cols-3 space-x-2.5 mt-4">
          {/* Big Card */}
          {datas.map(
            (data, index) =>
              index === 0 && (
                <Link
                  href={`/article/${data.id}`}
                  key={index}
                  className="grid col-span-2 rounded-md text-white shadow-lg relative"
                >
                  <Image
                    width={400}
                    height={400}
                    alt="Image"
                    className="w-full h-full object-cover object-center"
                    src={data.imageUrl}
                  />
                  <h2 className="left-8 absolute top-[-0.6rem] bg-yellow-500 py-2 px-6">
                    ជំនឿសាសនា
                  </h2>
                  <div className="absolute bottom-0 bg-black bg-opacity-45">
                    <div className="flex flex-col gap-2 px-4 py-4">
                      <h3 className="text-sm md:text-lg">
                        {truncateText2(`${data.title}`)}
                      </h3>
                      <h3 className="text-xs md:text-sm">
                        {truncateText3(`${data.description}`)}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
          )}
          {/* Small Card */}
          <div className="grid grid-rows-2 gap-3">
            {datas.map(
              (data, index) =>
                index > 0 &&
                index < 3 && (
                  <Link
                    href={`/article/${data.id}`}
                    key={index}
                    className="space-y-2 shadow-lg rounded-md overflow-hidden"
                  >
                    <Image
                      width={400}
                      height={400}
                      alt="Image"
                      className="w-full h-[80px] md:h-[200px] object-cover object-center"
                      src={data.imageUrl}
                    />
                    <div className="flex gap-1 md:gap-2">
                      <h2 className="bg-yellow-500 text-[14px] md:text-[15px] text-white px-4 pt-2">
                        ជំនឿសាសនា
                      </h2>
                      <div className="text-[12px] flex flex-col justify-center">
                        <p>ថ្ងៃនេះ ម៉ោង 14:02</p>
                        <p>ចំនួនមតិ 0</p>
                      </div>
                    </div>
                    <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                      {truncateText(`${data.title}`)}
                    </h3>
                  </Link>
                )
            )}
          </div>
        </div>
        {/* Small Card flex */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          {datas.map(
            (data, index) =>
              index >= 3 &&
              index < 5 && (
                <Link
                  href={`/article/${data.id}`}
                  key={index}
                  className="space-y-2 shadow-lg rounded-md overflow-hidden"
                >
                  <Image
                    width={400}
                    height={400}
                    alt="Image"
                    className="w-full h-[120px] md:h-[200px] object-cover object-center"
                    src={data.imageUrl}
                  />
                  <div className="flex gap-1 md:gap-2">
                    <h2 className="bg-yellow-500 text-[14px] md:text-[15px] text-white px-4 pt-2">
                      ជំនឿសាសនា
                    </h2>
                    <div className="text-[12px] flex flex-col justify-center">
                      <p>ថ្ងៃនេះ ម៉ោង 14:02</p>
                      <p>ចំនួនមតិ 0</p>
                    </div>
                  </div>
                  <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                    {truncateText(`${data.title}`)}
                  </h3>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Religion;
