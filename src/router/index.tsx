import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import ProtectedRoute from '../middlewares/ProtectedRoutes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout><ProtectedRoute>{route.element}</ProtectedRoute></DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
