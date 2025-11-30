import type { Todo } from "../model/types";
import {BASE_URL} from "@shared/const";

export const todoApi = {
	async getById(id: number): Promise<Todo>{
		const res = await fetch(`${BASE_URL}/${id}`);
		if (!res.ok) throw new Error(`Failed to load todo ${id}`);
		return res.json();
	},

	async getAll(): Promise<Todo[]> {
		const res = await fetch(`${BASE_URL}`);
		if (!res.ok) throw new Error("Failed to load todos");
		return res.json();
	},

	async create(todo: Omit<Todo, "id">): Promise<Todo> {
		const res = await fetch(`${BASE_URL}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo),
		});
		const data = await res.json();
		console.log(data);
		return data;
		// return res.json();
	},

	async update(id: number, data: Partial<Todo>): Promise<Todo> {
		const res = await fetch(`${BASE_URL}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async remove(id: number): Promise<number> {
		await fetch(`${BASE_URL}/${id}`, {
			method: "DELETE",
		});
		return id;
	},
};
