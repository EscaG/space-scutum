import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {NotFoundPage} from "@pages/NotFound/NotFound.tsx";
import {HomePage} from "@pages/Home/HomePage.tsx";
import {MainLayout} from "@app/layout/MainLayout.tsx";
import {ToDoPage} from "@pages/ToDo/ToDoPage.tsx";


export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route element={<MainLayout/>}>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/todo/:id" element={<ToDoPage/>}/>
			</Route>

			{/*A separate 404 page to display without a header*/}
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
};
