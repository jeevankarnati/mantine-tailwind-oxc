export type TodoItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "completed";
