"use client";
import { CourseList } from "@/app/components/schedule/items/course/list";
import { SessionList } from "@/app/components/schedule/items/session/calendar";
import { SubjectList } from "@/app/components/schedule/items/subject/list";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex xl:flex-row flex-col justify-between w-full divide-x divide-gray-300">
      <div className="w-full xl:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
       <div className="bg-white w-full">
      <div className="sticky top-0 z-10 px-6 bg-white border-b border-gray-300">
        <div className="flex flex-row py-4 space-x-2 align-center items-center">
          <span className="material-symbols-outlined">schedule</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Schedule</h1>
        </div>
      </div>
      <div className="">
        <div className="p-6">
          <SubjectList></SubjectList>
        </div>
        <div className="p-6">
          <CourseList></CourseList>
        </div>
        <div className="p-6">
          <SessionList></SessionList>
        </div>
      </div>
    </div>
      </div>
      <div className="w-full xl:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {children}
      </div>
    </div>
  );
}
