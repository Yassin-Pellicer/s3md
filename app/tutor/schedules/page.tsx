"use client";
import { SubjectList } from "@/app/components/schedule/items/subject/list";

export default function Blog() {
  return (
    <div className="bg-white w-full">
      <div className="sticky top-0 z-10 px-6 bg-white border-b border-gray-300">
        <div className="flex flex-row py-4 space-x-2 align-center items-center">
          <span className="material-symbols-outlined">schedule</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Schedule</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-x gap-4 divide-gray-300">
        <div className="p-6">
          <SubjectList></SubjectList>
        </div>
      </div>
    </div>
  );
}