import { hooks } from "./hook";
import CreateSubjectModal from "../modal/create";

export function SubjectList() {

  const subjectHooks = hooks();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <h1>Subjects</h1>
        <button
          title=""
          onClick={() => subjectHooks.setOpenCreateSubjectModal(true)}
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

      {subjectHooks.subjects.map((subject) => (
        <div
          key={subject.id}
          className="bg-gray-100 rounded-lg shadow-md p-5 mb-6 hover:shadow-lg transition-shadow duration-300"
          style={{ borderLeft: `6px solid ${subject.color || "#3b82f6"}` }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-900">{subject.title}</h2>
            <span className="text-sm text-gray-500 italic">{subject.topic}</span>
          </div>

          <p className="text-gray-700 mb-3">{subject.description}</p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Color:</span>
              <span
                className="inline-block w-5 h-5 rounded"
                style={{ backgroundColor: subject.color || "#ccc" }}
                title={subject.color}
              />
            </div>

            <div>
              <span className="font-semibold">Tutor:</span>{" "}
              {subject.tutor ? (
                <span>
                  {subject.tutor.firstName} {subject.tutor.lastName}
                </span>
              ) : (
                <span className="italic text-gray-400">No tutor assigned</span>
              )}
            </div>

            <div>
              <span className="font-semibold">Material Route:</span>{" "}
              <span className="text-blue-600 underline cursor-pointer">
                {subject.materialRoute || "N/A"}
              </span>
            </div>
          </div>
        </div>
      ))}

      <CreateSubjectModal
        open={subjectHooks.openCreateSubjectModal}
        setOpen={subjectHooks.setOpenCreateSubjectModal}
      ></CreateSubjectModal>
    </div>
  );
}