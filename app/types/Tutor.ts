import { Session } from "inspector";
import { Subject } from "./Subject";

export type Tutor = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string | null;
  avatar?: string | null;
  subjects?: Subject[];
  sessions?: Session[];
};
