import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar.tsx";
import { HomePage } from "./pages/HomePage";
import { AcidsPage } from "./pages/AcidsPage";
import { AcidDetailsPage } from "./pages/AcidDetailsPage";
import { ROUTES } from "./Routes";
import Container from "react-bootstrap/Container";
import { dest_root } from "./target_config";

import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
    useEffect(()=>{
        invoke('tauri', {cmd:'create'})
            .then(() =>{console.log("Tauri launched")})
            .catch(() =>{console.log("Tauri not launched")})
    }, [])

    return (
        <BrowserRouter basename={dest_root}>
            <MyNavbar />
            <Container className="mt-4">
                <Routes>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route path={ROUTES.ACIDS} element={<AcidsPage />} />
                    <Route path={`${ROUTES.ACIDS}/:id`} element={<AcidDetailsPage />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;