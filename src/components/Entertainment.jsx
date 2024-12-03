import React from "react";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import Link from "next/link";
import { truncateText5 } from "../utils/truncateText5";

const Entertainment = async () => {
  const fetchData = await fetch(
    "https://api-school-amber.vercel.app/api/user-get-all"
  );
  const info = await fetchData.json();
  const datas = info.listNews.filter((item) => item.category === "កម្សាន្ត");
  // const datas = info.listNews;
  // console.log(datas[0].photosDescription[0].photo);

  return (
    <div className="space-y-3.5">
      <HeaderSection
        title={"កម្សាន្ត"}
        textColor={"text-red-600"}
        bgColor={"bg-red-600"}
        label={"/entertainment"}
      />

      <div className="overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {datas.map(
          (data, index) =>
            index < 6 && (
              <Link
                href={`/article/${data._id}`}
                key={index}
                className="relative rounded-md overflow-hidden shadow-md"
              >
                <Image
                  key={index}
                  width={400}
                  height={400}
                  alt="Image"
                  className="h-[140px] md:h-[220px] w-full object-cover object-center"
                  src={
                    data.photosDescription.length > 0 &&
                    data.photosDescription.find(
                      (photoObj) => photoObj.photo && photoObj.photo !== ""
                    )?.photo
                  }
                />

                <div className="absolute bottom-0 w-full bg-black bg-opacity-45">
                  <h3 className="px-4 py-2 text-white text-[16px]">
                    {truncateText5(`${data.title}`)}
                  </h3>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Entertainment;
