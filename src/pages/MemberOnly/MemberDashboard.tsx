import { faCrown, faGavel, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import IconArrowForward from '../../components/Icon/IconArrowForward';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import IconBolt from '../../components/Icon/IconBolt';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import IconChecks from '../../components/Icon/IconChecks';
import IconCircleCheck from '../../components/Icon/IconCircleCheck';
import IconClock from '../../components/Icon/IconClock';
import IconEye from '../../components/Icon/IconEye';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconNetflix from '../../components/Icon/IconNetflix';
import IconOpenBook from '../../components/Icon/IconOpenBook';
import IconUser from '../../components/Icon/IconUser';
import IconUsersGroup from '../../components/Icon/IconUsersGroup';
import IconMenuUsers from '../../components/Icon/Menu/IconMenuUsers';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';

const MemberDashboard = () => {
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

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>MemberDashboard</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold"> My Groups</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
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
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 flex items-center gap-2">
                                {' '}
                                <IconUsersGroup className="hover:opacity-80 opacity-70" /> 170{' '}
                            </div>
                            <div className="badge bg-white/30">+ 2.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Month 44,700
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">My Contracts</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
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
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 flex items-center gap-2">
                                {' '}
                                <IconOpenBook className="hover:opacity-80 opacity-70" /> 170{' '}
                            </div>
                            <div className="badge bg-white/30">+ 2.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 84,709
                        </div>
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Pending Onboarding</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
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
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 flex items-center gap-2">
                                {' '}
                                <IconMenuUsers className="hover:opacity-80 opacity-70" /> 170{' '}
                            </div>
                            <div className="badge bg-white/30">+ 2.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 37,894
                        </div>
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Profile completion</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
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
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 flex items-center gap-2">
                                {' '}
                                <IconCashBanknotes className="hover:opacity-80 opacity-70" /> 170{' '}
                            </div>
                            <div className="badge bg-white/30">+ 2.35% </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 50.01%
                        </div>
                    </div>
                </div>

                {/*  Recent Groups  */}

                <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-3 xl:col-span-2 pb-0">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Active Contracts</h5>
                            <button type="button" className="text-primary font-semibold hover:underline group">
                                Show More{' '}
                                <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
                            <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0">
                                <div className="items-center justify-between p-4 py-2">
                                    <div className="group">
                                        <ul className="list-inside list-disc text-white-dark font-semibold mb-7 space-y-2">
                                            <li>10,000 Monthly Visitors</li>
                                            <li>Unlimited Reports</li>
                                            <li>signed On 20th march</li>
                                            <li>
                                                Under writer: <b>John D</b>
                                            </li>
                                        </ul>
                                        <div className="flex items-center justify-between mb-4 font-semibold">
                                            <p className="flex items-center rounded-full bg-dark px-2 py-1 text-xs text-white-light font-semibold">
                                                <IconClock className="w-3 h-3 ltr:mr-1 rtl:ml-1" />5 Days Left To Renew
                                            </p>
                                            <p className="ltr:ml-auto rtl:mr-auto text-secondary">
                                                <button type="button" className="text-primary font-semibold hover:underline group">
                                                    View Contract{' '}
                                                    <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                                                </button>
                                            </p>
                                        </div>
                                        <div className="rounded-full h-2.5 p-0.5 bg-dark-light overflow-hidden mb-5 dark:bg-dark-light/10">
                                            <div className="bg-gradient-to-r from-[#f67062] to-[#fc5296] w-full h-full rounded-full relative" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full  sm:col-span-3 xl:col-span-1">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Transactions</h5>
                            <div className="dropdown">
                                <Dropdown placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}>
                                    <ul>
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Mark as Done</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-6">
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">SP</span>
                                    <div className="px-3 flex-1">
                                        <div>Shaun Park</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$36.11</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                                        <IconCashBanknotes />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Cash withdrawal</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$16.44</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-danger-light dark:bg-danger text-danger dark:text-danger-light">
                                        <IconUser className="w-6 h-6" />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Amy Diaz</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$66.44</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                                        <IconNetflix />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Netflix</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$32.00</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-info-light dark:bg-info text-info dark:text-info-light">DA</span>
                                    <div className="px-3 flex-1">
                                        <div>Daisy Anderson</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$10.08</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-primary-light dark:bg-primary text-primary dark:text-primary-light">
                                        <IconBolt />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Electricity Bill</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$22.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-3 xl:col-span-3">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Alumni Groups</h5>
                            <button type="button" className="text-primary font-semibold hover:underline group">
                                Show More{' '}
                                <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
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
    );
};

export default MemberDashboard;
