import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TodosState} from "./types.ts";
import {
	createTodo,
	deleteSelectedTodos,
	deleteTodo,
	fetchTodoById,
	fetchTodos,
	updateTodo,
} from "@/entites/todos/model/todosThunks.ts";

const initialState: TodosState = {
	todos: [],
	currentTodo: undefined,
	page: 1,
	limit: 10,
	totalCount: 0,
	totalPages: 0,
	selectedIds: [],
	loading: false,
};

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		// Selecting a display page in a table
		setPage(state, action) {
			state.page = action.payload;
		},
		// Selecting one item in a table
		toggleSelect(state, action) {
			const id = action.payload;
			state.selectedIds = state.selectedIds.includes(id)
				? state.selectedIds.filter((x) => x !== id)
				: [...state.selectedIds, id];
		},
		// Select the number of todos displayed in the table
		setLimit(state, action) {
			state.limit = action.payload;
			state.page = 1; // сбрасываем на первую страницу при изменении лимита
		},
		// Group selection from a table
		selectAllOnPage(state, action) {
			const pageIds = state.todos.map((t) => t.id);
			state.selectedIds = action.payload
				? Array.from(new Set([...state.selectedIds, ...pageIds]))
				: state.selectedIds.filter((id) => !pageIds.includes(id));
		},
		// Creating a temporary empty todo
		addEmptyTemporaryTodo: (state) => {
			const newTodo = {
				id: Date.now(),       // временный id, уникальный
				title: "",
				completed: false,
				userId: 1,
				isNew: true,           // чтобы понимать, что это новая строка
			};
			state.todos.unshift(newTodo);  // вставили в начало
		},
		// Deleting a temporary empty todo
		deleteTemporaryTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(t => t.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodoById.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTodoById.fulfilled, (state, action) => {
				state.loading = false;
				state.currentTodo = action.payload;
			})
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.loading = false;
				state.todos = action.payload.paginated;
				state.totalCount = action.payload.totalCount;
				state.totalPages = action.payload.totalPages;
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				const idExists = state.todos.some(todo => todo.id === action.payload.id);
				if (idExists) {
					state.todos.unshift({...action.payload, id: state.todos.length + 1});
				} else {
					state.todos.unshift(action.payload);
				}
				state.totalCount += 1;
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				const i = state.todos.findIndex((t) => t.id === action.payload.id);
				if (i !== -1) state.todos[i] = action.payload;
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter((t) => t.id !== action.payload);
				state.totalCount -= 1;
			})
			.addCase(deleteSelectedTodos.fulfilled, (state, action) => {
				const ids = action.payload;
				state.todos = state.todos.filter((t) => !ids.includes(t.id));
				state.selectedIds = [];
				state.totalCount -= ids.length;
			});
	},
});

export const {
	setPage,
	toggleSelect,
	selectAllOnPage,
	setLimit,
	addEmptyTemporaryTodo,
	deleteTemporaryTodo,
} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
