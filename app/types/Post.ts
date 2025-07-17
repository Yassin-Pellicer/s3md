import { Subject } from "./Subject";

export type Post = {
  id?: string;
  createdAt?: Date;
  route?: string;
  title?: string;
  description?: string;
  subjects?: Subject[];
  banner?: string;
};
