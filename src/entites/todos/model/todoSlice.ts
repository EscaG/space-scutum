import {createSlice} from "@reduxjs/toolkit";
import type {TodosState} from "./types.ts";
import {
	createTodo,
	deleteSelectedTodos,
	deleteTodo,
	fetchTodos,
	updateTodo,
} from "@/entites/todos/model/todosThunks.ts";

const initialState: TodosState = {
	todos: [],
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
	},
	extraReducers: (builder) => {
		builder
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
				state.todos.unshift(action.payload);
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

export const { setPage, toggleSelect, selectAllOnPage, setLimit } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
