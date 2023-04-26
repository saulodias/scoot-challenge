import PriorityEnum from "../enums/priority.enum";

export default interface Todo {
  description: string;
  dueDate: string;
  priority: PriorityEnum;
}
