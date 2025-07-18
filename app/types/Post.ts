import { Subject } from "./Subject";

export type Post = {
  id?: string;
  createdAt?: Date;
  route: string;
  fullpath?: string;
  title?: string;
  description?: string;
  subjects?: Subject[];
  imgpath?: string | null;
};
