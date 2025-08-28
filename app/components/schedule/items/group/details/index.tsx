import React from "react";
import { hooks } from "./hook";
import CreateSessionModal from "../modal/create";
import { Group } from "@/app/types/Group";
import { SessionList } from "../../session/calendar";

export function GroupDetails({ group }: { group?: Group | null }) {
  const sessionHooks = hooks();
  return (
    <div className="">
      {group && <div className="relative border-gray-200 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {group?.title}
              </h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 align-center text-center bg-white/60 rounded-xl items-center">
            <div className="flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">
                groups
              </span>
              <span className="text-xs text-gray-500">Capacity</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{group?.capacity}</p>
            <button
              title="Add new post"
              className="bg-transparent border-[1px] border-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 p-1 hover:cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {group?.description}
        </p>
        <div className="flex flex-row overflow-x-auto border-b pt-2 select-none border-gray-200">
          {[
            ["Students", "school"],
            ["Sessions", "open_jam"],
          ].map(([name, icon], index) => (
            <button
              key={index}
              className={`w-full px-3 text-sm text-center hover:bg-gray-100 transition duration-75 ease-in-out 
              hover:cursor-pointer py-2 items-center flex flex-row ${index !== 1 ? "border-r border-r-gray-200" : ""} gap-1 justify-center ${sessionHooks.selectedOption === name ? "border-b-3 border-blue-500" : ""}`}
              onClick={() => sessionHooks.setSelectedOption(name)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{icon}</span>
              <span className="ml-1">{name}</span>
            </button>
          ))}
        </div>
      </div>}
        {sessionHooks.selectedOption === "Sessions" && <SessionList groups={[group!]} ></SessionList>}
    </div>
  );
}