import {createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "@app/providers/store/config/store.ts";
import {todoApi} from "../api/todoApi.ts";
import type {Todo} from "./types.ts";


export const fetchTodoById = createAsyncThunk(
	"todos/fetchById",
	async (id: number) => {
		return todoApi.getById(id);
	});

// Getting the entire todos list and creating pagination
export const fetchTodos = createAsyncThunk(
	"todos/fetch",
	async (_, {getState}) => {
		const state = getState() as RootState;
		const {page, limit} = state.todos;
		const all = await todoApi.getAll();

		const totalCount = all.length;
		const totalPages = Math.ceil(totalCount / limit);
		const start = (page - 1) * limit;

		return {
			paginated: all.slice(start, start + limit),
			totalCount,
			totalPages,
		};
	},
);

// creating a new todo
export const createTodo = createAsyncThunk(
	"todos/create",
	async (todo: Omit<Todo, "id">) => {
		return todoApi.create(todo);
	});

// Todo update
export const updateTodo = createAsyncThunk(
	"todos/update",
	async ({id, data}: { id: number; data: Partial<Todo> }) => {
		return todoApi.update(id, data);
	},
);

// deleting a todo
export const deleteTodo = createAsyncThunk(
	"todos/delete",
	async (id: number) => {
		return todoApi.remove(id);
	});

// Delete all selected todos
export const deleteSelectedTodos = createAsyncThunk(
	"todos/deleteSelected",
	async (_, {getState}) => {
		const state = getState() as RootState;
		const ids = state.todos.selectedIds;
		for (const id of ids) await todoApi.remove(id);
		return ids;
	},
);
