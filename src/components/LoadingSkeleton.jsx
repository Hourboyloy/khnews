import React from "react";
import Container from "./Container";

const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse mt-8">
      <Container>
        {/* Slide Skeleton */}
        <div className="h-[280px] md:h-[540px] bg-gray-200 rounded-lg mb-8" />

        {/* Entertainment Section Skeleton */}
        <div className="space-y-3.5 mb-8">
          <div className="flex justify-between items-center">
            <div className="h-12 w-32 bg-gray-200 rounded-md" />
            <div className="h-8 w-24 bg-gray-200 rounded-md" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="rounded-md overflow-hidden shadow-md">
                <div className="h-[140px] md:h-[220px] bg-gray-200" />
                <div className="h-16 bg-gray-100 p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sport Section Skeleton */}
        <div className="space-y-3 mt-2 mb-8">
          <div className="flex justify-between items-center">
            <div className="h-12 w-32 bg-gray-200 rounded-md" />
            <div className="h-8 w-24 bg-gray-200 rounded-md" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-md overflow-hidden shadow-lg">
                <div className="h-[120px] md:h-[220px] bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Banner Skeleton */}
        <div className="bg-gray-200 mt-4 h-14 w-full rounded-md" />

        {/* Religion Section Skeleton */}
        <div className="mb-4 mt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="h-12 w-32 bg-gray-200 rounded-md" />
            <div className="h-8 w-24 bg-gray-200 rounded-md" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="grid grid-cols-3 gap-4 flex-grow">
              <div className="col-span-2">
                <div className="h-[400px] bg-gray-200 rounded-md" />
              </div>
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="h-[190px] bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-64">
              {[1, 2].map((item) => (
                <div key={item} className="h-[200px] bg-gray-200 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoadingSkeleton;
