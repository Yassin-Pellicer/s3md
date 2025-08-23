import { Group } from "./Group";
import { Subject } from "./Subject";
import { Reservation } from "./Reservation";

export type Session = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string | null;
  description?: string | null;
  duration: number;
  date: Date;
  groupId: string;
  subjectId: string;
  group?: Group;
  subject?: Subject;
  reservation?: Reservation[];
};
