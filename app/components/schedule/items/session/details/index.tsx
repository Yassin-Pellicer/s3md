import React from "react";
import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";

export function SessionList() {
  const sessionHooks = hooks();

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-row space-x-2 align-center items-center">
          <span className="material-symbols-outlined">open_jam</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Session</h1>
        </div>

        <button
          title="Add new post"
          className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => sessionHooks.setOpenCreateSessionModal(true)}
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      <CreateSubjectModal
        open={sessionHooks.openCreateSessionModal}
        setOpen={sessionHooks.setOpenCreateSessionModal}
      />
    </div>
  );
}