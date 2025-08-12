import React from "react";
import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";

export function SubjectList() {
  const subjectHooks = hooks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Subjects
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and organize all academic subjects
            </p>
          </div>
          
          <button
            title="Create new subject"
            onClick={() => subjectHooks.setOpenCreateSubjectModal(true)}
            className="group relative bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="hidden sm:inline">New Subject</span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <span className="material-symbols-outlined text-purple-600 text-2xl">subject</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{subjectHooks.subjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <span className="material-symbols-outlined text-green-600 text-2xl">person</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">With Tutors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subjectHooks.subjects.filter(subject => subject.tutor).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <span className="material-symbols-outlined text-blue-600 text-2xl">folder</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">With Materials</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subjectHooks.subjects.filter(subject => subject.materialRoute).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <span className="material-symbols-outlined text-orange-600 text-2xl">category</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Topics</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(subjectHooks.subjects.map(s => s.topic).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search subjects..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <select className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
              <option value="">All Topics</option>
              {[...new Set(subjectHooks.subjects.map(s => s.topic).filter(Boolean))].map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            <select className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
              <option value="">All Tutors</option>
              <option value="assigned">With Tutor</option>
              <option value="unassigned">No Tutor</option>
            </select>
          </div>
        </div>

        {/* Subjects Grid */}
        {subjectHooks.subjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-lg inline-block">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {subjectHooks.subjects.map((subject) => (
              <div
                key={subject.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:scale-[1.02] hover:bg-white/90"
                style={{ 
                  borderLeft: `6px solid ${subject.color || "#8b5cf6"}`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(${subject.color ? 
                    `${parseInt(subject.color.slice(1,3), 16)}, ${parseInt(subject.color.slice(3,5), 16)}, ${parseInt(subject.color.slice(5,7), 16)}` : 
                    '139, 92, 246'}, 0.05) 100%)`
                }}
              >
                {/* Subject Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                          {subject.title}
                        </h2>
                        {subject.topic && (
                          <span className="px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
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
                    
                    <div 
                      className="p-3 rounded-xl border-2 border-white shadow-sm"
                      style={{ backgroundColor: `${subject.color || "#8b5cf6"}20` }}
                    >
                      <span 
                        className="material-symbols-outlined text-2xl"
                        style={{ color: subject.color || "#8b5cf6" }}
                      >
                        auto_stories
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {subject.description}
                  </p>
                </div>

                {/* Subject Details */}
                <div className="px-6 pb-4">
                  <div className="space-y-3">
                    {/* Tutor Information */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <span className="material-symbols-outlined text-green-600 text-lg">
                          person
                        </span>
                      </div>
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
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="material-symbols-outlined text-blue-600 text-lg">
                          folder_open
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Materials</p>
                        {subject.materialRoute ? (
                          <div className="flex items-center gap-2">
                            <p className="text-blue-600 text-sm font-medium hover:underline cursor-pointer truncate">
                              {subject.materialRoute}
                            </p>
                            <span className="material-symbols-outlined text-blue-600 text-sm">
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

                {/* Quick Stats */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="material-symbols-outlined text-purple-600 text-sm">
                          quiz
                        </span>
                        <span className="text-xs text-gray-500">Assignments</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">0</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="material-symbols-outlined text-indigo-600 text-sm">
                          groups
                        </span>
                        <span className="text-xs text-gray-500">Students</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">0</p>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-purple-50 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button 
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        title="Edit subject"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete subject"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                      {subject.materialRoute && (
                        <button 
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Open materials"
                        >
                          <span className="material-symbols-outlined text-lg">folder_open</span>
                        </button>
                      )}
                    </div>
                    
                    <button className="px-4 py-2 text-sm font-semibold text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-200 hover:border-purple-600 rounded-lg transition-all duration-200">
                      View Details
                    </button>
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
    </div>
  );
}