import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import IconPencil from '../../components/Icon/IconPencil';
import { IRootState } from '../../store';
import { GetInsurancePackages } from '../../store/insurancePackageSlice';
import { setPageTitle } from '../../store/themeConfigSlice';
import AddInsurancePackage from './InsurancePackageManagementUtils/addInsuranceModal';
import EditInsurancePackage from './InsurancePackageManagementUtils/editInsuranceModal';

const InsurancePacakes = () => {
    const dispatch = useDispatch();
    const [addPackageModal, setAddPackageModal] = useState(false);
    const [editPackageModal, setEditPackageModal] = useState(false);
    const { insurancePackages, loading, error } = useSelector((state: IRootState) => state.insurancePackages) || { insurancePackages: [] };
    const [datatoEdit, setDatatoEdit] = useState({});

    useEffect(() => {
        dispatch(setPageTitle('Insurance Packages'));
    });

    useEffect(() => {
        dispatch(GetInsurancePackages() as any);
        console.log('the insurance packages', insurancePackages);
    }, []);
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const benefits = [
        { bn_name: 'Death (Member)', bn_amounts: '20,000.00' },
        { bn_name: 'Death (Spouse)', bn_amounts: '20,000.00' },
        { bn_name: '2 nominated lives (Each)', bn_amounts: '10,000.00' },
        { bn_name: 'Critical Illness (Member)', bn_amounts: '10,000.00' },
        { bn_name: 'Permanent Disability (Member)', bn_amounts: '10,000.00' },
    ];


const handleEditInsurancePackage = (data: any) => {
    setEditPackageModal(true);
    setDatatoEdit(data)
}

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Insurance Packages</span>
                </li>
            </ul>
            <div>
                <h1 className="text-2xl font-bold mb-4">Insurance Packages</h1>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <Link to="/apps/invoice/edit" className="btn btn-danger gap-2">
                    <IconArrowBackward />
                    Back
                </Link>
                <div className="flex !gap-2">
                    <button
                        className="btn btn-info gap-2 bg-teal-500 text-white rtl:mr-auto ltr:ml-auto"
                        onClick={() => {
                            setAddPackageModal(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faBoxesStacked} />
                        Add Package
                    </button>
                </div>
            </div>
            <div className="pt-5 grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                {Array.isArray(insurancePackages) && insurancePackages.map((item: any) => (
                    <div key={item.id} className="mb-5 items-center justify-center w-full ">
                        <div className=" w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                <div className="flex">
                                    <p className="text-black text-xl mb-1.5 font-bold">{item.name}</p>
                                    <p className={`text-${item.is_active ? 'green-300' : 'red-300'} text-sm mb-1.5 rtl:mr-auto ltr:ml-auto`}>{item.is_active ? 'Active' : 'Inactive'}</p>
                                </div>
                                <h5 className="text-white-dark text-sm font-bold mb-4">{item.description}</h5>
                                <p className="text-white-dark">Benefits</p>
                                <div className="gap-2">
                                    {sortBy(item.benefits, ['name']).map(({ id, name, premium_payable }: { id: string; name: string; premium_payable: string }) => (
                                        <div className="flex justify-between" key={id}>
                                            <span className="text-gray-600">{name}:</span>
                                            <span className="font-semibold">GHc {premium_payable}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3">
                                    <p className="text-white-dark">Payments terms</p>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Monthly Premium GH:</span>
                                        <span className="font-semibold">Ghc {item.monthly_premium_ghs}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Annual Premium:</span>
                                        <span className="font-semibold">GHc {item.annual_premium_ghs}</span>
                                    </div>
                                </div>

                                <div className="relative flex justify-between mt-6 pt-4 before:w-[250px] before:h-[1px] before:bg-white-light before:inset-x-0 before:top-0 before:absolute before:mx-auto dark:before:bg-[#1b2e4b]">
                                    <div className="flex items-center font-semibold gap-2">
                                        <div className="text-[#515365] dark:text-white-dark">56 Groups </div>
                                        <div className="text-[#515365] dark:text-white-dark">Active</div>
                                    </div>
                                    <div className="flex font-semibold">
                                        <button className="btn btn-primary flex items-center ltr:mr-3 rtl:ml-3" onClick={() => handleEditInsurancePackage(item)}>
                                            <IconPencil className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <EditInsurancePackage viewModal={editPackageModal} setViewModal={setEditPackageModal} data={datatoEdit} />
            <AddInsurancePackage viewModal={addPackageModal} setViewModal={setAddPackageModal} />
        </div>
    );
};

export default InsurancePacakes;
