import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { router } from "./router";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// TODO: Add auth
const useAuth = () => {
	return {
		isAuthenticated: false,
	};
};

// TODO: Add auth provider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

const InnerApp = () => {
	const auth = useAuth();
	return (
		<RouterProvider
			router={router}
			context={{ isAuthenticated: auth.isAuthenticated }}
		/>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	);
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
