import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AlertPopup from "./components/AlertPopup/AlertPopup"
import { AlertProvider } from "./context/AlertContext/AlertContext"
import { UserProvider } from "./context/userContext/UserContext"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<AlertProvider>
				<App />
			</AlertProvider>
		</UserProvider>
	</React.StrictMode>
)
