import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconCaretDown from '../Icon/IconCaretDown';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconChatNotification from '../Icon/IconChatNotification';
import IconHeart from '../Icon/IconHeart';
import IconHelpCircle from '../Icon/IconHelpCircle';
import IconHome from '../Icon/IconHome';
import IconMinus from '../Icon/IconMinus';
import IconOpenBook from '../Icon/IconOpenBook';
import IconUsersGroup from '../Icon/IconUsersGroup';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('VRISTO')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('apps')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/admindashboard" className="group">
                                            <div className="flex items-center">
                                                <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Dashboard</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/users" className="group">
                                            <div className="flex items-center">
                                                <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">User Management</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/alumnigroups" className="group">
                                            <div className="flex items-center">
                                                <IconUsersGroup className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Alumni Groups Management</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/contracts" className="group">
                                            <div className="flex items-center">
                                                <IconOpenBook className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Contracts</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/scrumboard" className="group">
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Payments</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/contacts" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Reports & Analysis</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('invoice')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Settings</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconChatNotification className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Notification</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Personal')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/member/dashboard" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconHome className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Home</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <NavLink to="/member/groups" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconUsersGroup className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">My Groups</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <NavLink to="/member/mypayments" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconCashBanknotes className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Payments</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <NavLink to="https://vristo.sbthemes.com" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconOpenBook className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">My Contracts</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <NavLink to="https://vristo.sbthemes.com" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconHeart className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">My Beneficiaries</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('supports')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="https://vristo.sbthemes.com" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('documentation')}</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <NavLink to="#" target="_blank" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconHelpCircle className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Help</span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
