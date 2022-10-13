export interface Task {
  _id?: number;
  name?: string;
  description?: string;
  value?: number;
  createdAt?: Date;
  isFinished?: boolean;
}
