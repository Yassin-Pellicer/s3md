import { Session } from "./Session";

export type Reservation = {
  id?: string | null;
  createdAt?: Date | null;
  sessionId?: string | null;
  session?: Session | null;
  studentId?: string | null;
};
