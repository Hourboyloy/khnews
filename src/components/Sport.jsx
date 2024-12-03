// components/Sport.js
import React from "react";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import Link from "next/link";
import { truncateText } from "../utils/truncateText";
import { truncateText2 } from "../utils/truncateText2";
import { formatDate } from "../utils/formatDate";

const Sport = async () => {
  const fetchData = await fetch(
    "https://api-school-amber.vercel.app/api/user-get-all"
  );
  const info = await fetchData.json();
  const datas = info.listNews.filter((item) => item.category === "កីឡា");

  return (
    <div className="space-y-3 mt-2">
      <HeaderSection
        title={"កីឡា"}
        textColor={"text-green-600"}
        bgColor={"bg-green-600"}
        label={"/sport"}
      />
      <div className="grid gap-2">
        {/* Big Card */}
        <div className="grid grid-cols-3 gap-2.5 mb-1">
          {datas.map(
            (data, index) =>
              index < 3 && (
                <Link
                  href={`/article/${data._id}`}
                  key={index}
                  className="rounded-md overflow-hidden shadow-lg space-y-2"
                >
                  <Image
                    src={
                      data.photosDescription.length > 0 &&
                      data.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    width={400}
                    height={400}
                    alt="Image"
                    className="h-[120px] md:h-[220px] object-cover object-center"
                  />
                  <div className="flex gap-2">
                    <h2 className="bg-green-600 text-lg text-white py-1 flex justify-center items-center px-8">
                      កីឡា
                    </h2>
                    <div className="text-[14px] flex flex-col justify-center">
                      <p>{formatDate(data.createdAt)}</p>
                      <p>ចំនួនមតិ {data.comments.length}</p>
                    </div>
                  </div>
                  <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                    {truncateText(`${data.title}`)}
                  </h3>
                </Link>
              )
          )}
        </div>
        {/* Small Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {datas.map(
            (data, index) =>
              index >= 3 &&
              index < 11 && (
                <Link
                  href={`/article/${data.id}`}
                  key={index}
                  className="h-[90px] flex mt-1 md:mt-2 items-center rounded-md overflow-hidden shadow-lg"
                >
                  <Image
                    src={
                      data.photosDescription.length > 0 &&
                      data.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    width={200}
                    height={200}
                    alt="Image"
                    className="w-[500px] overflow-hidden h-full object-cover object-center"
                  />
                  <h3 className="py-2 px-2 text-sm">
                    {truncateText2(`${data.title}`)}
                  </h3>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sport;
