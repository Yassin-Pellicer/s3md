import { Post } from "./Post";
import { Tutor } from "./Tutor";

export type Subject = {
  id?: string;
  tutorId?: string;
  topic?: string;
  tutor?: Tutor;
  postId?: string;
  post?: Post;
};