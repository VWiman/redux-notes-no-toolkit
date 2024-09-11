import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import { EditingProvider } from "./context/statusProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<EditingProvider>
				<App />
			</EditingProvider>
		</Provider>
	</StrictMode>
);
