import { Group } from "./Group";
import { Subject } from "./Subject";

export type Session = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string | null;
  description?: string | null;
  duration?: number;   
  date?: Date;         
  seriesId?: string;
  groupId?: string;    
  subjectId?: string;
  group?: Group;
  subject?: Subject;
};
