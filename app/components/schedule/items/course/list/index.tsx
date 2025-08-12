import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";

export function CourseList() {

  const courseHooks = hooks();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <h1>courses</h1>
        <button
          title=""
          onClick={() => courseHooks.setOpenCreateSubjectModal(true)}
          className="w-fit bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
        >
          <i
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            add
          </i>
        </button>
      </div>

      {courseHooks.courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-md p-5 mb-6 hover:shadow-lg transition-shadow duration-300"
          style={{ borderLeft: `6px solid #3b82f6` }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-900">{course.title}</h2>
            {course.price !== undefined && (
              <span className="text-sm text-green-600 font-bold">
                ${course.price}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-3">{course.description}</p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Starts:</span>{" "}
              {course.startsAt ? course.startsAt.toLocaleDateString() : "N/A"}
            </div>
            <div>
              <span className="font-semibold">Ends:</span>{" "}
              {course.endsAt ? course.endsAt.toLocaleDateString() : "N/A"}
            </div>
            <div>
              <span className="font-semibold">Tutor:</span>{" "}
              {course.tutor ? (
                <>
                  {course.tutor.firstName} {course.tutor.lastName}
                </>
              ) : (
                <span className="italic text-gray-400">No tutor assigned</span>
              )}
            </div>
            <div>
              <span className="font-semibold">Subjects:</span>{" "}
              {course.subjects?.length || 0}
            </div>
          </div>
        </div>
      ))}

      <CreateSubjectModal
        open={courseHooks.openCreateSubjectModal}
        setOpen={courseHooks.setOpenCreateSubjectModal}
      ></CreateSubjectModal>
    </div>
  );
}