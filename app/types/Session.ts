import { Reservation } from "./Reservation";
import { Tutor } from "./Tutor";

export type Session = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  tutorId: string;
  tutor: Tutor;
  title: string;
  description: string;
  price: number;
  duration: number;
  date: Date;
  capacity: number;
  reservation: Reservation[];
};
