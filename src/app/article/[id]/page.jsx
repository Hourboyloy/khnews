"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Container from "../../../components/Container";
import CommentSection from "../../../components/CommentSection";
import { truncateText5 } from "../../../utils/truncateText5";
import {
  getArticleById,
  getAllArticles,
  getPopularArticles,
  getNewestArticles,
  getArticlesByCategory,
} from "../../../utils/db";

const Id = () => {
  const [data, setData] = useState([]);
  const [dataByView, setDataByView] = useState([]);
  const [newestArticles, setNewestArticles] = useState([]);
  const [dataByCategory, setDataByCategory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticleById(id);
      if (article) {
        setData(article);
      }
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchAllData = async () => {
      const articles = await getAllArticles();
      if (articles.length > 0) {
        setDataByView(getPopularArticles(articles));
        setNewestArticles(getNewestArticles(articles));
        setDataByCategory(getArticlesByCategory(articles, data.category));
      }
    };
    fetchAllData();
  }, [data]);

  if(data.length===0){
    return
  }

  return (
    <div className="my-4 w-full">
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {/* Left */}
          <div className="col-span-2">
            <div className="mb-3">
              <h2 className="text-base sm:text-xl md:text-2xl text-red-700 pb-2">
                {data.title}
              </h2>
              <p className="text-[14px] text-nowrap px-4 pt-1 w-[230px] select-none bg-red-600 text-white">
                {dayjs(data.createdAt).format("DD MMMM YYYY | ម៉ោង HH:mm")}
              </p>
              <div className="bg-red-600 w-full h-1"></div>
            </div>

            <ul>
              {data?.photosDescription?.length > 0 &&
                data?.photosDescription?.map((e, index) => (
                  <li key={e + index}>
                    <div className="text-xs md:text-base space-y-2">
                      {e.description !== "" && (
                        <p className="my-4">{e.description}</p>
                      )}
                      <div>
                        {e.photo !== "" && (
                          <Image
                            src={e.photo}
                            width={500}
                            height={400}
                            alt={data.title}
                            className="w-full"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <CommentSection newsId={id} ListComments={data.comments} />
          </div>
          {/* Right */}
          <div className="col-span-1 space-y-4">
            <div className="space-y-3 md:space-y-2">
              <h2 className="text-red-600 text-2xl">អត្ថបទពេញនិយម</h2>
              {dataByView.map(
                (data, index) =>
                  index < 10 && (
                    <div key={index}>
                      <Link
                        href={`/article/${data._id}`}
                        key={index}
                        className="h-[60px] md:h-[90px] flex items-center rounded-md border border-gray-200 shadow overflow-hidden"
                      >
                        <Image
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={200}
                          height={200}
                          alt="Image"
                          className="w-[40%] h-full object-cover object-center"
                        />

                        <h3 className="py-2 w-[60%] px-2 text-[14px]">
                          {truncateText5(`${data.title}`)}
                        </h3>
                      </Link>
                    </div>
                  )
              )}
            </div>

            {/* newest */}
            <div className="space-y-3 md:space-y-2">
              <h2 className="text-red-600 text-2xl">អត្ថបទថ្មីៗ</h2>
              {newestArticles.map(
                (data, index) =>
                  index < 10 && (
                    <div key={index}>
                      <Link
                        href={`/article/${data._id}`}
                        className="h-[60px] md:h-[90px] flex items-center rounded-md border border-gray-200 shadow overflow-hidden"
                      >
                        <Image
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={200}
                          height={200}
                          alt="Image"
                          className="w-[40%] h-full object-cover object-center"
                        />
                        <h3 className="py-2 w-[60%] px-2 text-[14px]">
                          {truncateText5(`${data.title}`)}
                        </h3>
                      </Link>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="mt-8">
          {/* Header section */}
          <div className="text-white mt-4 mb-2.5">
            <div className="my-1 flex justify-between items-center">
              {/* Left */}
              <div className="bg-red-600 pl-4 pr-14 py-[0.50rem] relative overflow-hidden flex items-center">
                <h2 className="text-2xl">{data.category}</h2>
                <div
                  className="absolute h-full right-0 border-t-[48px] border-l-[45px] border-t-white border-l-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="bg-red-600 h-2 w-full"></div>
          </div>
          <div className="overflow-hidden grid grid-cols-2 md:grid-cols-4 gap-2.5  mb-4">
            {dataByCategory.map(
              (data, index) =>
                index < 8 && (
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
                      className="h-[200px] w-full object-cover object-center"
                      src={
                        data.photosDescription.length > 0 &&
                        data.photosDescription.find(
                          (photoObj) => photoObj.photo && photoObj.photo !== ""
                        )?.photo
                      }
                    />

                    <div className="absolute bottom-0 w-full bg-black bg-opacity-45 max-h-[28%]">
                      <h3 className="px-4 py-2 text-white text-[15px]">
                        {truncateText5(`${data.title}`)}
                      </h3>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Id;
