import {createRoot} from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import {ThemeProvider} from "@app/providers/theme/ThemeProvider.tsx";
import {StoreProvider} from "@app/providers/store/StoreProvider.tsx";
import App from '@app/App.tsx';


createRoot(document.getElementById('root')!).render(
	<StoreProvider>
		<ThemeProvider>
			<HashRouter>
				<App/>
			</HashRouter>
		</ThemeProvider>
	</StoreProvider>,
);
