import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchTodoById} from "@/entites/todos/model/todosThunks.ts";
import {useAppDispatch} from "@app/providers/store";
import {useSelector} from "react-redux";
import type {RootState} from "@app/providers/store/config/store.ts";
import {TodoCard} from "@shared/ui/TodoCard/TodoCard.tsx";
import {LoadingSpinner} from "@shared/ui/Spinner/LoadingSpinner.tsx";

export const ToDoPage = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {currentTodo, loading} = useSelector((state: RootState) => state.todos);

	useEffect(() => {
		if (id) dispatch(fetchTodoById(Number(id)));
	}, [dispatch, id]);

	if (loading) return <LoadingSpinner/>;
	if (!currentTodo) {
		return <div>Todo not found</div>;
	}

	return <TodoCard todo={currentTodo}/>;
};
