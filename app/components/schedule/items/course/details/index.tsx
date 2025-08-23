import { useCourseStore } from "@/app/contexts/course.store";
import { SubjectList } from "../../subject/list";
import { GroupList } from "../../group/list";
import { hooks } from "./hook";

export function CourseDetails() {
  const courseStore = useCourseStore();
  const course = courseStore.selectedCourse;
  const detailsHook = hooks();

  return (
    <div className="flex flex-col">
      <div
        key={course?.id}
        className="shadow-sm top-0 bg-white z-50 sticky"
      >
        {/* Course Header */}
        <div className="p-3 border-b top-0 sticky border-gray-200 pb-2 mb-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="material-symbols-outlined">school</p>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {course?.title}
                </h2>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              {course?.price !== undefined && (
                <div className="flex items-center gap-2">
                  <p className="material-symbols-outlined">payments</p>
                  <span className="text-2xl font-bold text-green-600">
                    {course?.price} €
                  </span>
                </div>
              )}
              <button
                title="Add new post"
                className="bg-transparent border-[1px] border-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-200 p-1 hover:cursor-pointer"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>more_vert</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-md line-clamp-3">
            {course?.description}
          </p>
        </div>
        <div className="px-3 pb-2 items-center flex flex-row justify-between align-center ">
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
          {course?.subjects && course?.subjects.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2">
              <p className="material-symbols-outlined">subject</p>
              <div className="flex flex-wrap gap-2">
                {course?.subjects.slice(0, 3).map((subject, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-black bg-blue-50 rounded-lg border border-blue-200"
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
        <div className="flex flex-row overflow-x-auto pt-2">
          {[
            ["Schedule", "event"],
            ["Groups", "groups"],
            ["Subjects", "subject"],
            ["Students", "people"],
            ["Requests", "article"],
          ].map(([name, icon], index) => (
            <button
              key={index}
              className={`w-full px-3 text-sm text-center hover:bg-gray-100 transition duration-75 ease-in-out 
              hover:cursor-pointer py-2 items-center flex flex-row ${index !== 4 ? "border-r border-r-gray-200" : ""} gap-1 justify-center ${detailsHook.selectedOption === name ? "border-b-3 border-blue-500" : ""}`}
              onClick={() => detailsHook.setSelectedOption(name)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{icon}</span>
              <span className="ml-1">{name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="m-4">
        {detailsHook.selectedOption === "Groups" && <GroupList></GroupList>}
        {detailsHook.selectedOption === "Subjects" && <SubjectList subjects={course?.subjects}></SubjectList>}
      </div>
    </div>
  );
}
