import { Group } from "./Group";
import { Subject } from "./Subject";
import { Reservation } from "./Reservation";

export type Session = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tutorId?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  date?: Date;
  capacity?: number;
  groupId?: string;
  subjectId?: string;
  group?: Group;
  subject?: Subject;
  reservation?: Reservation[];
};
