export interface Todo {
  id: number;
  title: string;
  completed: boolean;
	userId: number;
	isNew?: boolean;
}

export interface TodosState {
	todos: Todo[];
	currentTodo: Todo | undefined;
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	selectedIds: number[];
	loading: boolean;
}
