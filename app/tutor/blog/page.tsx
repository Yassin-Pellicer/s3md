"use client";
import Blog from "@/app/components/blog";

export default function Home() {
  return (
    <div className="flex px-6 mt-4 xl:flex-row flex-col justify-between w-full divide-x divide-gray-300 gap-2">
    <Blog/>
    </div>
  );
}
