export interface Task {
  taskID: number;
  name: string;
  description: string;
  taskFreeTexts?: string[];
  questionTask?: QuestionTask; // This is optional because a task might not have a question task associated with it
  mediaList?: MediaTask[];
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
  // fileSize?: number; 
  // uploadedDate?: Date; 
  taskID: number; 
}


export interface Location {
  locationID: number;
  name: string;
  description?: string;
  floor: number;
  qrcode: string;
  locationImage?: LocationImage; 
  objectsList?: ObjectLocation[];
}

export interface LocationImage {
  locationImgID: number;
  name: string;
  type: string;
  imagePath: string;
}


export interface ObjectLocation {
  objectID: number;
  name: string;
  description?: string;
  location: Location;
  objectImages: ObjectImage[];
}

export interface ObjectImage {
  id: number;
  name: string;
  imagePath: string;
  object: ObjectLocation;
}



