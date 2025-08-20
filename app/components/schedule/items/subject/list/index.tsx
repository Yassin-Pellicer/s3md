import React from "react";
import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";
import { Subject } from "@/app/types/Subject";

export function SubjectList({ subjects: subjectsProp = [] }: { subjects?: Subject[] } = {}) {
  const subjectHooks = hooks(subjectsProp);
  return (
    <div>
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-row space-x-2 align-center items-center">
          <span className="material-symbols-outlined">subject</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Subject</h1>
        </div>

        <button
          title="Add new post"
          className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => subjectHooks.setOpenCreateSubjectModal(true)}
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4">
        <div className=" backdrop-blur-sm rounded-2xl p-2 border-[1px] border-gray-200 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>subject</span>
            <div>
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{subjectHooks.subjects.length}</p>
            </div>
          </div>
        </div>

        <div className=" backdrop-blur-sm border-[1px] border-gray-200 shadow-sm rounded-2xl p-2 transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>person</span>
            <div>
              <p className="text-sm text-gray-600">With Tutors</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjectHooks.subjects.filter(subject => subject.tutor).length}
              </p>
            </div>
          </div>
        </div>

        <div className=" backdrop-blur-sm rounded-2xl p-2 border-[1px] border-gray-200 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>folder</span>
            <div>
              <p className="text-sm text-gray-600">With Materials</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjectHooks.subjects.filter(subject => subject.materialRoute).length}
              </p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-2xl p-2 border-[1px] border-gray-200 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>category</span>
            <div>
              <p className="text-sm text-gray-600">Topics</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(subjectHooks.subjects.map(s => s.topic).filter(Boolean)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-1 border-[1px] border-gray-200 shadow-sm mb-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search subjects..."
            className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl"
          />
        </div>
      </div>

      {subjectHooks.subjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="rounded-3xl p-12 border border-white/20 shadow-lg inline-block">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">subject</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No subjects yet</h3>
            <p className="text-gray-500 mb-6">Create your first subject to get started</p>
            <button
              onClick={() => subjectHooks.setOpenCreateSubjectModal(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Create Subject
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjectHooks.subjects.map((subject) => (
            <div
              key={subject.id}
              className="rounded-lg shadow-sm border-[1px] border-gray-200"
              style={{
                borderLeft: `6px solid ${subject.color || "#8b5cf6"}`,
              }}
            >
              <div className="relative p-3 border-b-[1px] border-gray-200 pb-3 mb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {subject.title}
                      </h2>
                      {subject.topic && (
                        <span className="px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full mr-4">
                          {subject.topic}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-500">Color:</span>
                      <div
                        className="w-6 h-6 rounded-lg shadow-sm border-2 border-white"
                        style={{ backgroundColor: subject.color || "#8b5cf6" }}
                        title={subject.color || "#8b5cf6"}
                      />
                      <span className="text-xs text-gray-400 font-mono">
                        {subject.color || "#8b5cf6"}
                      </span>
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
                  {subject.description}
                </p>
              </div>

              <div className="px-2 pb-2">
                <div className="flex flex-row justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>person</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Tutor</p>
                      {subject.tutor ? (
                        <p className="font-semibold text-gray-800 text-sm">
                          {subject.tutor.firstName} {subject.tutor.lastName}
                        </p>
                      ) : (
                        <p className="text-gray-400 italic text-sm">Not assigned</p>
                      )}
                    </div>
                  </div>

                  {/* Material Route */}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>folder</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Materials</p>
                      {subject.materialRoute ? (
                        <div className="flex items-center gap-2">
                          <p className="text-blue-600 text-sm font-medium hover:underline cursor-pointer truncate">
                            {subject.materialRoute}
                          </p>
                          <span className="material-symbols-outlined text-sm">
                            open_in_new
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-sm">No materials</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateSubjectModal
        open={subjectHooks.openCreateSubjectModal}
        setOpen={subjectHooks.setOpenCreateSubjectModal}
      />
    </div>
  );
}