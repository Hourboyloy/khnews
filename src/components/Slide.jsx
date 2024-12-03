"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { truncateText4 } from "../utils/truncateText4";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { truncateText } from "../utils/truncateText";
import { getAllArticles, getNewestArticles } from "../utils/db";

export default function Slide() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllArticlesData = async () => {
      try {
        const articles = await getAllArticles();
        if (Array.isArray(articles)) {
          const newestArticles = getNewestArticles(articles);
          setData(newestArticles);
        } else {
          console.error("getAllArticles did not return an array:", articles);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setData([]);
      }
    };
    getAllArticlesData();
  }, []);

  return (
    <div className="h-[280px] md:h-[540px] ">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".custom-prev-btn",
          nextEl: ".custom-next-btn",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative"
      >
        {/* Custom Navigation Buttons */}
        <button
          className="custom-prev-btn absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white p-2 transition-transform hover:scale-110 hover:translate-x-[-0.25rem]"
          aria-label="Previous Slide"
        >
          <FaArrowLeft size={24} />
        </button>
        <button
          className="custom-next-btn absolute top-1/2 right-4 z-10 -translate-y-1/2 text-white p-2 transition-transform hover:scale-110 hover:translate-x-1"
          aria-label="Next Slide"
        >
          <FaArrowRight size={24} />
        </button>
        {data.map(
          (d, index) =>
            index < 8 && (
              <SwiperSlide key={index} className="relative">
                <Link href={`/article/${d._id}`}>
                  <Image
                    src={
                      d.photosDescription.length > 0 &&
                      d.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    width={1000}
                    height={1000}
                    alt="Slide"
                    className="w-full object-center object-cover"
                  />
                  <div className="bg-black absolute bottom-0 bg-opacity-30 w-full text-white">
                    <div className="px-4 mb-4 py-4 space-y-2">
                      <h2 className="text-2xl">{truncateText(`${d.title}`)}</h2>
                      <h4 className="text-base">
                        {truncateText4(
                          d.photosDescription.length > 0
                            ? d.photosDescription[0].description
                            : ""
                        )}
                      </h4>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
}
