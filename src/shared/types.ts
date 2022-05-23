export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export type InputError = 'typeError' | 'defError' | null;
