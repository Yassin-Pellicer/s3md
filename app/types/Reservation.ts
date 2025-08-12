import { Session } from "./Session";

export type Reservation = {
  id?: string;
  createdAt?: Date;
  sessionId?: string;
  studentId?: string;
  session?: Session;
};
