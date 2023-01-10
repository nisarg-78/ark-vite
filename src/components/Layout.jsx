import { Outlet } from "react-router-dom"
import AlertPopup from "./AlertPopup/AlertPopup"

const Layout = () => {
    return (
        <main className="App">
            <AlertPopup />
            <Outlet />
        </main>
    )
}

export default Layout