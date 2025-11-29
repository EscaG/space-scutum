export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosState {
	todos: Todo[];
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	selectedIds: number[];
	loading: boolean;
}
