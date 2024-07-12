import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { Auth, Cms } from "../pages"
import { CmsLayout } from "../components"
import { PrivateRoutes } from "./PrivateRoutes"

export const WebRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<CmsLayout />}>
                <Route path="dashboard" element={<PrivateRoutes element={<Cms.Dashboard.Home />} />} />

                <Route path="articles" element={<PrivateRoutes element={<Outlet />} />}>
                    <Route index element={<Cms.Articles.List />} />
                    <Route path="create" element={<Cms.Articles.Create />} />
                    <Route path=":id/edit" element={<Cms.Articles.Edit />} />
                </Route>

                <Route path="login" element={<Auth.Login />} />
            </Route>

            <Route path="/" element={<Navigate to="/cms/dashboard" />} />
        </Routes>
    </BrowserRouter>
}