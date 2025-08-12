import { Subject } from "./Subject";
import { Course } from "./Course";

export type Tutor = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  subjects?: Subject[];
  courses?: Course[];
};
