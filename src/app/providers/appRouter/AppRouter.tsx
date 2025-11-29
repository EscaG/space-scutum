import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {NotFoundPage} from "@pages/NotFound/NotFound.tsx";
import {HomePage} from "@pages/Home/HomePage.tsx";


export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
};
