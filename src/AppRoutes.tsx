import { Routes, Route, Navigate } from 'react-router-dom';
import GaragePage from './pages/GaragePage.tsx';
import WinnersPage from './pages/WinnersPage.tsx';

const AppRoutes = ()=>{
    return(
         <Routes>
            <Route path="/" element={<Navigate to="/garage" replace />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/winners" element={<WinnersPage />} />
          </Routes>
    )
};

export default AppRoutes;