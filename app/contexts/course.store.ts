import { Course } from "../types/Course";
import { create } from "zustand";

interface EditorState {
  selectedCourse ?: Course
  setSelectedCourse: (course: Course) => void

}

export const useCourseStore = create<EditorState>((set) => ({
  selectedCourse: undefined,
  setSelectedCourse: (course: Course) => set({ selectedCourse: course }),
}));
