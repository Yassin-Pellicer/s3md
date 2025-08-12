import React from "react";
import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";

export function CourseList() {
  const courseHooks = hooks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Courses
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and explore all available courses
            </p>
          </div>
          
          <button
            title="Create new course"
            onClick={() => courseHooks.setOpenCreateSubjectModal(true)}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="hidden sm:inline">New Course</span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <span className="material-symbols-outlined text-blue-600 text-2xl">school</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courseHooks.courses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <span className="material-symbols-outlined text-green-600 text-2xl">trending_up</span>
              </div>
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

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <span className="material-symbols-outlined text-purple-600 text-2xl">person</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">With Tutors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courseHooks.courses.filter(course => course.tutor).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <span className="material-symbols-outlined text-orange-600 text-2xl">schedule</span>
              </div>
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
              <button
                onClick={() => courseHooks.setOpenCreateSubjectModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Create Course
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courseHooks.courses.map((course) => {
              const isActive = course.startsAt && course.endsAt && 
                              new Date(course.startsAt) <= new Date() && 
                              new Date(course.endsAt) >= new Date();
              const isUpcoming = course.startsAt && new Date(course.startsAt) > new Date();
              
              return (
                <div
                  key={course.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:scale-[1.02] hover:bg-white/90"
                >
                  {/* Course Header */}
                  <div className="relative p-6 pb-4">
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
                            {course.duration && (
                              <span className="text-sm text-gray-500">
                                / {course.duration}h
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">
                          book
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Details */}
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-500 text-lg">
                          calendar_today
                        </span>
                        <div>
                          <p className="text-gray-500">Starts</p>
                          <p className="font-semibold text-gray-800">
                            {course.startsAt ? new Date(course.startsAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : "TBD"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-500 text-lg">
                          event_available
                        </span>
                        <div>
                          <p className="text-gray-500">Ends</p>
                          <p className="font-semibold text-gray-800">
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

                  {/* Tutor & Subjects */}
                  <div className="px-6 pb-4">
                    <div className="flex items-center justify-between">
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
                  </div>

                  {/* Subject Tags */}
                  {course.subjects && course.subjects.length > 0 && (
                    <div className="px-6 pb-4">
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

                  {/* Action Footer */}
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                      
                      <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <CreateSubjectModal
          open={courseHooks.openCreateSubjectModal}
          setOpen={courseHooks.setOpenCreateSubjectModal}
        />
      </div>
    </div>
  );
}