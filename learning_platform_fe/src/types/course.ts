export interface CourseResponse {
  id: number;
  content: string;
  created_at: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  status: string;
  response?: CourseResponse | null;
}
