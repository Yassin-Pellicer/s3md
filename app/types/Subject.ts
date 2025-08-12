import { Tutor } from "./Tutor";
import { Course } from "./Course";
import { Session } from "./Session";

export type Subject = {
  id?: string;
  tutorId?: string;
  topic?: string;
  postId?: string;
  tutor?: Tutor;
  courses?: Course[];
  sessions?: Session[];
  materialRoute?: string;
};
