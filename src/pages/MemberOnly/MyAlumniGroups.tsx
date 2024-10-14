import { faCrown, faGavel, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import IconArrowForward from '../../components/Icon/IconArrowForward';
import IconChecks from '../../components/Icon/IconChecks';
import IconCircleCheck from '../../components/Icon/IconCircleCheck';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconMenuUsers from '../../components/Icon/Menu/IconMenuUsers';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';

const MyGroups = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('AdminDashboard'));
    });

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const uniqueVisitorSeries: any = {
        series: [
            {
                name: 'Sales',
                data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            },
            {
                name: 'Premium Admins',
                data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
            },
            {
                name: 'Admins',
                data: [91, 7, 85, 121, 95, 8, 105, 291, 104, 9, 66, 0],
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#5c1ac3', '#ffbb44', '#016427FF'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };

    const salesByCategory: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Apparel', 'Sports', 'Others'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    const [loading] = useState(false);

    const revenueChart: any = {
        series: [
            {
                name: 'Income',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    const navigate = useNavigate();

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>MyGroups</span>
                </li>
            </ul>
            {/* Justify Center Pills */}
            <div className="panel" id="justify_center_pills">
                <div className="mb-5">
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap justify-center space-x-2 rtl:space-x-reverse">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-success text-white !outline-none rounded-full' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-success hover:text-white hover:rounded-full`}
                                    >
                                        All Groups
                                        <span className="absolute -mt-3 -ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold uppercase text-white">25</span>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-success text-white !outline-none rounded-full' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-success hover:text-white hover:rounded-full`}
                                    >
                                        Active <span className="absolute -mt-3 -ml-2 rounded-full bg-info px-1.5 py-0.5 text-xs font-semibold uppercase text-white">25</span>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-success text-white !outline-none rounded-full' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-success hover:text-white hover:rounded-full`}
                                    >
                                        Inactive
                                        <span className="absolute -mt-3 -ml-2 rounded-full bg-danger px-1.5 py-0.5 text-xs font-semibold uppercase text-white">25</span>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-success text-white !outline-none rounded-full' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-success hover:text-white hover:rounded-full`}
                                    >
                                        Paid
                                        <span className="absolute -mt-3 -ml-2 rounded-full bg-success px-1.5 py-0.5 text-xs font-semibold uppercase text-white">25</span>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-success text-white !outline-none rounded-full' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-success hover:text-white hover:rounded-full`}
                                    >
                                        Pending Payment
                                        <span className="absolute -mt-3 -ml-2 rounded-full bg-warning px-1.5 py-0.5 text-xs font-semibold uppercase text-white">25</span>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-success text-white !outline-none rounded-full' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-success hover:text-white hover:rounded-full`}
                                    >
                                        Pending Approval
                                        <span className="absolute -mt-3 -ml-2 rounded-full bg-danger px-1.5 py-0.5 text-xs font-semibold uppercase text-white">25</span>
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <div className="pt-5">
                                        <div className="grid  sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                                            <div className=" h-full sm:col-span-3 xl:col-span-3">
                                                <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                    {/*  Previous Statement  */}
                                                    <div className="panel overflow-hidden">
                                                        <div className="items-center justify-between">
                                                            <div>
                                                                <div className="flex  w-full justify-between">
                                                                    <div className="text-lg font-bold">Alumi Group 1 </div>
                                                                    <div className="dropdown">
                                                                        <Dropdown
                                                                            offset={[0, 5]}
                                                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                            btnClassName="hover:opacity-80"
                                                                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    <button type="button">View Report</button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button">Edit Report</button>
                                                                                </li>
                                                                            </ul>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                                <div className="text-success flex">
                                                                    {' '}
                                                                    <IconChecks className="text-success opacity-40 w-6 h-6" />
                                                                    Paid on June 27, 2022{' '}
                                                                </div>
                                                                <div className="text-grey-400 flex items-center gap-2">
                                                                    <b>Starts:</b> June 27, 2022
                                                                </div>
                                                                <div className="text-grey-400 flex items-center gap-2">
                                                                    <IconArrowForward className="text-success opacity-40 w-6 h-6" /> <b>Ends:</b> June 27, 2022
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-200 h-1 rounded-full m-4"></div>
                                                        <div className="relative ">
                                                            <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                                                <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                                            </div>
                                                            <div className="">
                                                                <div className="text-sm text-gray-600 flex items-center gap-1 w-full">
                                                                    <FontAwesomeIcon icon={faCrown} className="text-success w-4 h-6" /> <b>John hscbdlshlskvhlbnvlsdfns</b>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-3">
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <IconMenuUsers className="text-success w-6 h-6" />
                                                                    <div className="font-semibold text-xl text-black ml-2">11</div>
                                                                </div>
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <FontAwesomeIcon icon={faGavel} className="text-success w-5 h-5" style={{ fill: 'none' }} />
                                                                    <div className="font-semibold text-sm text-black ml-2">Not Signed</div>
                                                                </div>
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <FontAwesomeIcon icon={faUnlockAlt} className="text-success w-5 h-5" />
                                                                    <div className="font-semibold text-sm text-black ml-2">Active</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel overflow-hidden">
                                                        <div className="items-center justify-between">
                                                            <div>
                                                                <div className="flex  w-full justify-between">
                                                                    <div className="text-lg font-bold">Alumi Group 1 </div>
                                                                    <div className="dropdown">
                                                                        <Dropdown
                                                                            offset={[0, 5]}
                                                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                            btnClassName="hover:opacity-80"
                                                                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    <button type="button" onClick={() => navigate('/member/groups/preview')}>
                                                                                        View Report
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button">Edit Report</button>
                                                                                </li>
                                                                            </ul>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                                <div className="text-danger flex gap-1">
                                                                    <IconInfoCircle className="opacity-40 w-4 h-4" />
                                                                    Must Be Paid Before June 27, 2022{' '}
                                                                </div>
                                                                <div className="text-grey-400 flex items-center gap-1">
                                                                    <b>Starts:</b> June 27, 2022
                                                                </div>
                                                                <div className="text-grey-400 flex items-center gap-2">
                                                                    <IconArrowForward className="text-success opacity-40 w-6 h-6" /> <b>Ends:</b> June 27, 2022
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-200 h-1 rounded-full m-4"></div>
                                                        <div className="relative ">
                                                            <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                                                <IconInfoCircle className="text-danger opacity-20 w-full h-full" />
                                                            </div>
                                                            <div className="">
                                                                <div className="text-sm text-gray-600 flex items-center gap-1 w-full">
                                                                    <FontAwesomeIcon icon={faCrown} className="text-success w-4 h-6" /> <b>John hscbdlshlskvhlbnvlsdfns</b>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <IconMenuUsers className="text-success w-6 h-6" />
                                                                    <div className="font-semibold text-xl text-black ml-2">11</div>
                                                                </div>
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <FontAwesomeIcon icon={faGavel} className="text-success w-5 h-5" style={{ fill: 'none' }} />
                                                                    <div className="font-semibold text-sm text-black ml-2">Not Signed</div>
                                                                </div>
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <FontAwesomeIcon icon={faUnlockAlt} className="text-success w-5 h-5" />
                                                                    <div className="font-semibold text-sm text-black ml-2">Active</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel overflow-hidden">
                                                        <div className="items-center justify-between">
                                                            <div>
                                                                <div className="flex  w-full justify-between">
                                                                    <div className="text-lg font-bold">Alumi Group 1 </div>
                                                                    <div className="dropdown">
                                                                        <Dropdown
                                                                            offset={[0, 5]}
                                                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                                            btnClassName="hover:opacity-80"
                                                                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    <button type="button">View Report</button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button">Edit Report</button>
                                                                                </li>
                                                                            </ul>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                                <div className="text-danger flex gap-1">
                                                                    <IconInfoCircle className="opacity-40 w-4 h-4" />
                                                                    Must Be Paid Before June 27, 2022{' '}
                                                                </div>
                                                                <div className="text-grey-400 flex items-center gap-1">
                                                                    <b>Starts:</b> June 27, 2022
                                                                </div>
                                                                <div className="text-grey-400 flex items-center gap-2">
                                                                    <IconArrowForward className="text-success opacity-40 w-6 h-6" /> <b>Ends:</b> June 27, 2022
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-200 h-1 rounded-full m-4"></div>
                                                        <div className="relative ">
                                                            <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                                                <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                                            </div>
                                                            <div className="">
                                                                <div className="text-sm text-gray-600 flex items-center gap-1 w-full">
                                                                    <FontAwesomeIcon icon={faCrown} className="text-success w-4 h-6" /> <b>John hscbdlshlskvhlbnvlsdfns</b>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <IconMenuUsers className="text-success w-6 h-6" />
                                                                    <div className="font-semibold text-xl text-black ml-2">11</div>
                                                                </div>
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <FontAwesomeIcon icon={faGavel} className="text-success w-5 h-5" style={{ fill: 'none' }} />
                                                                    <div className="font-semibold text-sm text-black ml-2">Not Signed</div>
                                                                </div>
                                                                <div className="text-primary flex items-center">
                                                                    {' '}
                                                                    <FontAwesomeIcon icon={faUnlockAlt} className="text-success w-5 h-5" />
                                                                    <div className="font-semibold text-sm text-black ml-2">Active</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <div className="flex items-start pt-5">
                                        <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                                            <img src="/assets/images/profile-34.jpeg" alt="img" className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark" />
                                        </div>
                                        <div className="flex-auto">
                                            <h5 className="mb-4 text-xl font-medium">Media heading</h5>
                                            <p className="text-white-dark">
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                                turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="pt-5">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>Paid</Tab.Panel>
                            <Tab.Panel>Pending Payment</Tab.Panel>
                            <Tab.Panel>Pending Approval</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
};

export default MyGroups;
