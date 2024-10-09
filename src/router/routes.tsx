import { lazy } from 'react';
import AlumniGroupManagementpage from '../pages/AlumniGroupManagement/AlumniGroupManagemnetPage';
import ContractManagementpage from '../pages/ContractsManagement/Contractsmanagementpage';
import AccountSetting from '../pages/UserManagement/AccountSetting';
import Profile from '../pages/UserManagement/Profile';
import UserManagement from '../pages/UserManagement/UserManagement';
const Index = lazy(() => import('../pages/Index'));

const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },

    //Authentication
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/register',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/users',
        element: <UserManagement />,
    },
    {
        path: '/userAccountSetting',
        element: <AccountSetting />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/contracts',
        element: <ContractManagementpage />,
    },
    {
        path: '/alumnigroups',
        element: <AlumniGroupManagementpage />,
    },
    // {
    //     path: '/auth/boxed-lockscreen',
    //     element: <UnlockBoxed />,
    //     layout: 'blank',
    // },
    // {
    //     path: '/auth/boxed-password-reset',
    //     element: <RecoverIdBoxed />,
    //     layout: 'blank',
    // },
];

export { routes };
