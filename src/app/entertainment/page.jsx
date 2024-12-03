import Container from "../../components/Container";
import { truncateText2 } from "../../utils/truncateText2";
import { truncateText4 } from "../../utils/truncateText4";
import { truncateText5 } from "../../utils/truncateText5";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EntertainmentPage = async () => {
  const fetchData = await fetch(
    "https://api-school-amber.vercel.app/api/user-get-all"
  );
  const info = await fetchData.json();
  const datas = info.listNews.filter((item) => item.category === "កម្សាន្ត");

  return (
    <div className="w-full">
      <Container>
        {/* Header section */}
        <div className="text-white mt-4 mb-2">
          <div className="my-1 flex justify-between items-center">
            {/* Left */}
            <div className="bg-red-600 pl-4 pr-14 py-[0.50rem] relative overflow-hidden flex items-center">
              <h2 className="text-2xl">កម្សាន្ត</h2>
              <div
                className="absolute h-full right-0 border-t-[48px] border-l-[45px] border-t-white border-l-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="bg-red-600 h-2 w-full"></div>
        </div>

        {/* Big Section */}
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Grid Card */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {/* Small Card */}
            <div className="grid row-span-2 col-span-1 gap-2">
              {datas.map(
                (data, index) =>
                  index < 2 && (
                    <Link
                      href={`/article/${data._id}`}
                      key={index}
                      className="rounded-lg overflow-hidden shadow-lg"
                    >
                      <Image
                        src={
                          data.photosDescription.length > 0 &&
                          data.photosDescription.find(
                            (photoObj) =>
                              photoObj.photo && photoObj.photo !== ""
                          )?.photo
                        }
                        width={1000}
                        height={1000}
                        alt="Image"
                        className="w-full h-[100px] md:h-[140px] object-cover object-center"
                      />
                      <h3 className="text-[16px] py-2 px-2">
                        {truncateText2(`${data.title}`)}
                      </h3>
                    </Link>
                  )
              )}
            </div>
            {/* Big Card */}
            <div className="grid col-span-2 row-span-2 gap-2">
              {datas.map(
                (data, index) =>
                  index === 2 && (
                    <Link
                      href={`/article/${data._id}`}
                      key={index}
                      className="relative rounded-lg overflow-hidden shadow-lg"
                    >
                      <Image
                        src={
                          data.photosDescription.length > 0 &&
                          data.photosDescription.find(
                            (photoObj) =>
                              photoObj.photo && photoObj.photo !== ""
                          )?.photo
                        }
                        width={1000}
                        height={1000}
                        alt="Image"
                        className="w-full h-[325px] md:h-[405px] object-cover object-center"
                      />
                      <div className="bg-black text-white absolute bottom-0 w-full bg-opacity-45">
                        <div className="py-2 px-2 space-y-2">
                          <h2 className="text-xl text-center">
                            {truncateText2(`${data.title}`)}
                          </h2>
                          <p className="text-sm">
                            {truncateText4(`${data.title}`)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>

          {/* Flex Card */}
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-4 gap-2 w-full lg:w-[260px]">
              {datas.map(
                (data, index) =>
                  index > 2 &&
                  index < 7 && (
                    <Link
                      href={`/article/${data._id}`}
                      key={index}
                      className="flex gap-1 rounded-lg shadow-lg overflow-hidden"
                    >
                      <Image
                        src={
                          data.photosDescription.length > 0 &&
                          data.photosDescription.find(
                            (photoObj) =>
                              photoObj.photo && photoObj.photo !== ""
                          )?.photo
                        }
                        width={1000}
                        height={1000}
                        alt="Image"
                        className="w-[680px] lg:w-[320px] h-[100px] sm:h-[140px] lg:h-[95px] object-cover object-center"
                      />
                      <h3 className="text-[15px] py-2 px-2 flex items-center">
                        {truncateText5(`${data.title}`)}
                      </h3>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Small Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-4 gap-2 my-2">
          {datas.map(
            (data, index) =>
              index >= 7 &&
              index < 23 && (
                <Link
                  href={`/article/${data._id}`}
                  key={index}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src={
                      data.photosDescription.length > 0 &&
                      data.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    width={1000}
                    height={1000}
                    alt="Image"
                    className="w-full h-[140px] object-cover object-center"
                  />
                  <h3 className="text-[16px] py-2 px-2">
                    {truncateText4(`${data.title}`)}
                  </h3>
                </Link>
              )
          )}
        </div>
      </Container>
    </div>
  );
};

export default EntertainmentPage;
