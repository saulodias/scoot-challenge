import PriorityEnum from "../enums/priority.enum";

export default interface Todo {
  id?: string; 
  description: string;
  dueDate: string | Date;
  priority: PriorityEnum;
}
