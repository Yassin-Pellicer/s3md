import { useCourseStore } from "@/app/contexts/course.store";
import { SubjectList } from "../../subject/list";

export function CourseDetails() {
  const courseStore = useCourseStore();
  const course = courseStore.selectedCourse;

  return (
    <div className="flex flex-col">
      <div
        key={course?.id}
        className="shadow-sm"
      >
        {/* Course Header */}
        <div className="relative p-3 border-b border-gray-200 pb-2 mb-2">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {course?.title}
                </h2>
              </div>
              {course?.price !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${course?.price}
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
                  {course?.subjects?.length || 0}
                </p>
              </div>
            </div>

          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {course?.description}
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
              {course?.tutor ? (
                <p className="font-semibold text-gray-800 text-sm">
                  {course?.tutor.firstName} {course?.tutor.lastName}
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
                    {course?.startsAt ? new Date(course?.startsAt).toLocaleDateString('en-US', {
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
                    {course?.endsAt ? new Date(course?.endsAt).toLocaleDateString('en-US', {
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
        {course?.subjects && course?.subjects.length > 0 && (
          <div className="">
            <div className="flex flex-wrap gap-2">
              {course?.subjects.slice(0, 3).map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
                >
                  {subject.title || `Subject ${index + 1}`}
                </span>
              ))}
              {course?.subjects.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                  +{course?.subjects.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 my-4">
        <SubjectList></SubjectList>
      </div>

    </div>
  );
}
