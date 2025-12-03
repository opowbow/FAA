export enum CourseType {
  LIVE_COHORT = 'Live Cohort',
  SELF_PACED = 'Self-Paced Online',
  WORKSHOP = 'Weekend Workshop'
}

export interface CourseModule {
  title: string;
  description: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  type: CourseType;
  image: string;
  modules: CourseModule[];
}

export interface CartItem extends Course {
  quantity: number;
}

export interface RegistrationData {
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: number;
  interests: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}