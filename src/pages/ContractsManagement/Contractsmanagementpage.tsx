import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import IconClock from '../../components/Icon/IconClock';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';

const ContractManagementpage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(setPageTitle('ContractManagementpage'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const data = location.state || {};
    console.log('data', data);
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>ContractManagementpage</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Contracts</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="panel">
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
            </div>
        </div>
    );
};

export default ContractManagementpage;
