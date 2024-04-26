export interface Task {
  taskID: number;
  name: string;
  description: string;
  taskFreeTexts?: string[];
  questionTask?: QuestionTask; // This is optional because a task might not have a question task associated with it
  mediaLis?: MediaTask[];
}
export interface QuestionTask {
  questionTaskID: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  taskID: number;
}
export interface MediaTask {
  mediaTaskID: number;
  fileName: string;
  mediaPath: string;
  mediaType: string;
  // fileSize?: number; // Optional, uncomment if you decide to include file size
  // uploadedDate?: Date; // Optional, uncomment if you decide to include upload date
  taskID: number; // This is the foreign key reference to the Task
}
