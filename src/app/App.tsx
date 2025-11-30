import {Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/Home/HomePage.tsx";
import {NotFoundPage} from "@pages/NotFound/NotFound.tsx";
import {MainLayout} from "@app/layout/MainLayout.tsx";
import {ToDoPage} from "@pages/ToDo/ToDoPage.tsx";

export default function App() {

	return (
		<Routes>
			<Route element={<MainLayout/>}>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/todo/:id" element={<ToDoPage />} />
			</Route>

			{/*A separate 404 page to display without a header*/}
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	);
}
