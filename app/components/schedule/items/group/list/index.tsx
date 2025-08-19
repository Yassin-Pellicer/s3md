import React from "react";
import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";
import CreateGroupModal from "../modal/create";
import { SessionList } from "../../session/list";
import { SessionDetails } from "../../session/details";
import { useCourseStore } from "@/app/contexts/course.store";

export function GroupList() {
  const groupHooks = hooks();
  const courseStore = useCourseStore();

  return (
    <div>
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-row space-x-2 align-center items-center">
          <span className="material-symbols-outlined">group</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Groups</h1>
        </div>

        <button
          title="Add new post"
          className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => groupHooks.setOpenCreateGroupModal(true)}
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courseStore.selectedCourse?.groups!.map(group => (
          <div
            key={group.id}
            className={`rounded-lg shadow-sm border-[1px] ${groupHooks.selectedGroup?.id === group.id ? "border-green-500" : "border-gray-200"}`}
            onClick={() => groupHooks.setSelectedGroup(group)}
          >
            <div className="relative p-3 border-b-[1px] border-gray-200 pb-3 mb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {group.title}
                    </h2>
                  </div>

                </div>

                <div className="flex flex-row gap-4 align-center text-center bg-white/60 rounded-xl">
                  <div className="flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      groups
                    </span>
                    <span className="text-xs text-gray-500">Students</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">0</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {group.description}
              </p>
            </div>

          </div>
        ))}
      </div>

      <div className="mt-4">
        <SessionDetails group={groupHooks.selectedGroup}></SessionDetails>
        <SessionList group={groupHooks.selectedGroup} ></SessionList>
      </div>
      <CreateGroupModal
        open={groupHooks.openCreateGroupModal}
        setOpen={groupHooks.setOpenCreateGroupModal}
      />
    </div>
  );
}