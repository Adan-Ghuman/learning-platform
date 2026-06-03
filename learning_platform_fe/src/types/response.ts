import type {Course} from "./course";

export interface Response {
  id: number;
  learner_id: number;
  course_id: number;
  content: string;
  created_at: string;
  course: Course;
}
