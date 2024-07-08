import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Cms } from "../pages"
import { CmsLayout } from "../components"

export const WebRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<CmsLayout />}>
                <Route path="dashboard" element={<Cms.Dashboard.Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
}