import { lazy } from 'react';
import AlumniGroupManagementpage from '../pages/AlumniGroupManagement/AlumniGroupManagemnetPage';
import ContractManagementpage from '../pages/ContractsManagement/Contractsmanagementpage';
import AdminDashboard from '../pages/Dasboard/AdminDashboard';
import InsurancePacakes from '../pages/InsurancePackageManagement/InsurancePackageManagement';
import MemberDashboard from '../pages/MemberOnly/MemberDashboard';
import MemberGroupEdit from '../pages/MemberOnly/MyAlumniGroupUtils/MemberGroupEdit';
import MemberGroupPreview from '../pages/MemberOnly/MyAlumniGroupUtils/MemberGroupPreview ';
import MyGroups from '../pages/MemberOnly/MyAlumniGroups';
import MyBeneficiaries from '../pages/MemberOnly/MyBeneficiaries';
import MyContracts from '../pages/MemberOnly/MyContracts';
import MyPayments from '../pages/MemberOnly/MyPayments';
import AccountSetting from '../pages/UserManagement/AccountSetting';
import Profile from '../pages/UserManagement/Profile';
import UserManagement from '../pages/UserManagement/UserManagement';
import { RowContextMenuExample } from '../pages/UserManagement/UserManagement copy';
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
        path: '/insurancepackages',
        element: <InsurancePacakes />,
    },
    {
        path: '/alumnigroups',
        element: <AlumniGroupManagementpage />,
    },
    {
        path: '/admindashboard',
        element: <AdminDashboard />,
    },
    {
        path: '/member/dashboard',
        element: <MemberDashboard />,
    },
    {
        path: '/member/groups',
        element: <MyGroups />,
    },
    {
        path: '/member/groups/preview',
        element: <MemberGroupPreview />,
    },
    {
        path: '/member/groups/edit',
        element: <MemberGroupEdit />,
    },
    {
        path: '/member/mypayments',
        element: <MyPayments />,
    },
    {
        path: '/member/beneficiaries',
        element: <MyBeneficiaries />,
    },
    {
        path: '/member/contracts',
        element: <MyContracts />,
    },
    {
        path: '/test',
        element: <RowContextMenuExample />,
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
