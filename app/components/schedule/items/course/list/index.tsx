import React from "react";
import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";
import { useCourseStore } from "@/app/contexts/course.store";

export function CourseList() {
  const courseHooks = hooks();
  const courseStore = useCourseStore();

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-row space-x-2 align-center items-center">
          <span className="material-symbols-outlined">school</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Course</h1>
        </div>

        <button
          title="Add new post"
          className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => courseHooks.setOpenCreateCourseModal(true)}
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4">
        <div className="backdrop-blur-sm rounded-2xl p-2 border-[1px] border-gray-200 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>school</span>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courseHooks.courses.length}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm border-[1px] border-gray-200 shadow-sm rounded-2xl p-2 transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>trending_up</span>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {courseHooks.courses.filter(course => {
                  const now = new Date();
                  return course.startsAt && course.endsAt &&
                    new Date(course.startsAt) <= now &&
                    new Date(course.endsAt) >= now;
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-2xl p-2 border-[1px] border-gray-200 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>person</span>
            <div>
              <p className="text-sm text-gray-600">With Tutors</p>
              <p className="text-2xl font-bold text-gray-900">
                {courseHooks.courses.filter(course => course.tutor).length}
              </p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-2xl p-2 border-[1px] border-gray-200 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined ml-2" style={{ fontSize: '32px' }}>schedule</span>
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {courseHooks.courses.filter(course => {
                  const now = new Date();
                  return course.startsAt && new Date(course.startsAt) > now;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {courseHooks.courses.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-lg inline-block">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">school</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">Create your first course to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courseHooks.courses.map((course) => {
            const isActive = course.startsAt && course.endsAt &&
              new Date(course.startsAt) <= new Date() &&
              new Date(course.endsAt) >= new Date();
            const isUpcoming = course.startsAt && new Date(course.startsAt) > new Date();

            return (
              <div
                key={course.id}
                onClick={() => courseStore.setSelectedCourse(course)}
                className="rounded-lg select-none hover:cursor-pointer hover:scale-[1.02] transition duration-150 shadow-sm border-[1px] border-gray-200"
              >
                {/* Course Header */}
                <div className="relative p-3 border-b border-gray-200 pb-2 mb-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {course.title}
                        </h2>
                        {isActive && (
                          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                            Active
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </div>
                      {course.price !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">
                            ${course.price}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-lg">
                        subject
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Subjects</p>
                        <p className="font-semibold text-gray-800 text-sm">
                          {course.subjects?.length || 0}
                        </p>
                      </div>
                    </div>

                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* Course Details */}


                {/* Tutor & Subjects */}
                <div className="px-3 pb-4 flex justify-between align-center items-center ">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-lg">
                      person
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Tutor</p>
                      {course.tutor ? (
                        <p className="font-semibold text-gray-800 text-sm">
                          {course.tutor.firstName} {course.tutor.lastName}
                        </p>
                      ) : (
                        <p className="text-gray-400 italic text-sm">Not assigned</p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          calendar_today
                        </span>
                        <div>
                          <p className="text-gray-500">Starts</p>
                          <p className="font-semibold text-xs text-gray-800">
                            {course.startsAt ? new Date(course.startsAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : "TBD"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          event_available
                        </span>
                        <div>
                          <p className="text-gray-500">Ends</p>
                          <p className="font-semibold text-xs text-gray-800">
                            {course.endsAt ? new Date(course.endsAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : "TBD"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject Tags */}
                {course.subjects && course.subjects.length > 0 && (
                  <div className="">
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          {subject.title || `Subject ${index + 1}`}
                        </span>
                      ))}
                      {course.subjects.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                          +{course.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <CreateSubjectModal
        open={courseHooks.OpenCreateCourseModal}
        setOpen={courseHooks.setOpenCreateCourseModal}
      />
    </div>
  );
}