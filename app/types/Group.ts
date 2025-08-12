import { Course } from "./Course";
import { Session } from "./Session";

export type Group = {
  id?: string;
  title?: string;
  description?: string;
  courseId?: string;
  course?: Course;
  sessions?: Session[];
};
