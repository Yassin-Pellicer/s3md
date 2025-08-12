import { Tutor } from "./Tutor";
import { Course } from "./Course";
import { Session } from "./Session";

export type Subject = {
  id?: string;
  tutorId?: string | null;
  topic?: string | null;
  title: string;
  description: string;
  color: string;
  tutor?: Tutor | null;
  courses?: Course[];
  sessions?: Session[];
  materialRoute?: string | null;
};
