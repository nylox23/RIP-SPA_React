import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar.tsx";
import { HomePage } from "./pages/HomePage";
import { AcidsPage } from "./pages/AcidsPage";
import { AcidDetailsPage } from "./pages/AcidDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CarbonatesListPage } from "./pages/CarbonatesListPage";
import { CarbonateDetailsPage } from "./pages/CarbonateDetailsPage";
import { ROUTES } from "./Routes";
import Container from "react-bootstrap/Container";
import {dest_root} from "./target_config.ts";

function App() {
    return (
        <BrowserRouter basename={dest_root}>
            <MyNavbar />
            <Container className="mt-4 mb-5">
                <Routes>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route path={ROUTES.ACIDS} element={<AcidsPage />} />
                    <Route path={`${ROUTES.ACIDS}/:id`} element={<AcidDetailsPage />} />

                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

                    <Route path={ROUTES.CARBONATE_LIST} element={<CarbonatesListPage />} />
                    <Route path={`${ROUTES.CARBONATE_DETAIL}/:id`} element={<CarbonateDetailsPage />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;