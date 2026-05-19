import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App.jsx"
import {BrowserRouter} from "react-router-dom"
import {EditorProvider} from "react-simple-wysiwyg"
import {LoadingProvider} from "./components/LoadingContext.jsx"
import {AuthProvider} from "./components/AuthContext.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <EditorProvider>
                <LoadingProvider>
                    <AuthProvider>
                        <App/>
                    </AuthProvider>
                </LoadingProvider>
            </EditorProvider>
        </BrowserRouter>
    </StrictMode>,
)
