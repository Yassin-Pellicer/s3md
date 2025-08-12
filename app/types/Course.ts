import { Tutor } from "./Tutor";
import { Subject } from "./Subject";
import { Group } from "./Group";

export type Course = {
  id?: string;
  title?: string;
  description?: string;
  startsAt?: Date;
  endsAt?: Date;
  inscriptionStart?: Date;
  inscriptionEnd?: Date;
  tutorId?: string;
  price?: number;
  duration?: number;
  date?: Date;
  subjects?: Subject[];
  tutor?: Tutor;
  groups?: Group[];
};
