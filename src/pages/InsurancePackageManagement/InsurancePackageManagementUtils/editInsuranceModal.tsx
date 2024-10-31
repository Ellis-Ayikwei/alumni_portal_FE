import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import IconSave from '../../../components/Icon/IconSave';
import IconTrash from '../../../components/Icon/IconTrash';
import IconX from '../../../components/Icon/IconX';
import axiosInstance from '../../../helper/axiosInstance';

interface Insurance {
    name: string;
    description: string;
    sum_assured: number;
    monthly_premium_ghs: number;
    annual_premium_ghs: number;
    is_active: boolean;
    benefits: any[];
}

interface EditInsurancePackageProps {
    viewModal: boolean;
    setViewModal: (value: boolean) => void;
    data: Insurance;
}

const EditInsurancePackage = ({ viewModal, setViewModal, data }: EditInsurancePackageProps) => {
    const [Imgsrc, setImageSrc] = useState('');
    const contractStatus = 'active';
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    console.log('the data is', data);

    const initialInsurance = {
        name: data?.name || '',
        description: data?.description || '',
        sum_assured: data?.sum_assured || 0,
        monthly_premium_ghs: data?.monthly_premium_ghs || 0,
        annual_premium_ghs: data?.annual_premium_ghs || 0,
        is_active: data?.is_active,
        bnfs: data?.benefits || {},
    };

    console.log('the initial value', initialInsurance);

    const [insurance, setInsurance] = useState({});

    useEffect(() => {
        if (data) {
            setInsurance({
                name: data.name || '',
                description: data.description || '',
                sum_assured: data.sum_assured || 0,
                monthly_premium_ghs: data.monthly_premium_ghs || 0,
                annual_premium_ghs: data.annual_premium_ghs || 0,
                is_active: data.is_active,
                bnfs: data.benefits || [],
            });
        }
    }, [data]);

    const [benefits, setBenefits] = useState<any>({});

    interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

    const handleInputChange = (id: string, value: string | undefined) => {
        setInsurance({ ...insurance, [id]: value, bnfs: benefits });
    };

    const handleBenefitChange = (id: string, value: string | undefined) => {
        setBenefits({ ...benefits, [id]: value });
    };

    const handleSaveInsurance = async () => {
        try {
            const response = await axiosInstance.post('/insurance_packages', JSON.stringify(insurance));
            console.log('data', response);
        } catch (err) {}
    };

    useEffect(() => {
        console.log('insurance', insurance);
    }, [insurance]);

    return (
        <Transition appear show={viewModal} as={Fragment}>
            <Dialog
                as="div"
                open={viewModal}
                onClose={() => {
                    setViewModal(false), setImages([]);
                }}
            >
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black bg-[#ecf8ec]">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h1 className="text-2xl font-bold mb-4">Edit Insurance Package</h1>
                                    <button
                                        type="button"
                                        className="text-white-dark hover:text-dark"
                                        onClick={() => {
                                            setViewModal(false);
                                            setImages([]);
                                        }}
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    {/* Contract Details Section */}

                                    <form>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="packageName" className="text-gray-600">
                                                Package Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="packageName"
                                                value={insurance.name}
                                                className="font-semibold border border-gray-300 rounded p-1"
                                                placeholder="Enter Package Name"
                                                onChange={(e: InputChangeEvent) => handleInputChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="packageDescription" className="text-gray-600">
                                                Description:
                                            </label>
                                            <textarea
                                                id="packageDescription"
                                                className="font-semibold border border-gray-300 rounded p-1"
                                                placeholder="Enter Package Description"
                                                value={insurance.description}
                                                onChange={(e: InputChangeEvent) => handleInputChange('description', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="sumAssured" className="text-gray-600">
                                                Sum Assured:
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="sumAssured"
                                                    name="sumAssured"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    value={insurance.sum_assured}
                                                    onValueChange={(value) => handleInputChange('sum_assured', value)}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-xs p-1 font-semibold text-gray-800 mb-3 mt-5 w-full bg-white-light">
                                            <p>Benefits</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="deathMember" className="text-gray-600">
                                                Death (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="deathMember"
                                                    name="deathMember"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => handleBenefitChange('Death (Member)', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="deathSpouse" className="text-gray-600">
                                                Death (Spouse):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="deathSpouse"
                                                    name="deathSpouse"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => handleBenefitChange('Death (Spouse)', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="nominatedLives" className="text-gray-600">
                                                2 Nominated Lives (Each):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="nominatedLives"
                                                    name="nominatedLives"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => handleBenefitChange('2 Nominated Lives (Each)', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="criticalIllnessMember" className="text-gray-600">
                                                Critical Illness (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="criticalIllnessMember"
                                                    name="criticalIllnessMember"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => handleBenefitChange('Critical Illness (Member)', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="permanentDisabilityMember" className="text-gray-600">
                                                Permanent Disability (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="permanentDisabilityMember"
                                                    name="permanentDisabilityMember"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => handleBenefitChange('Permanent Disability (Member)', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-xs p-1 font-semibold text-gray-800 mb-3 mt-5 w-full bg-white-light">
                                            <p>Payment Terms</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="monthlyPremium" className="text-gray-600">
                                                Monthly Premium:
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="monthlyPremium"
                                                    name="monthlyPremium"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    value={insurance.monthly_premium_ghs}
                                                    onValueChange={(value) => handleInputChange('monthly_premium_ghs', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="annualPremium" className="text-gray-600">
                                                Annual Premium:
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="annualPremium"
                                                    name="annualPremium"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    value={insurance.annual_premium_ghs}
                                                    onValueChange={(value) => handleInputChange('annual_premium_ghs', value)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setViewModal(false)}>
                                            <IconX /> Close
                                        </button>
                                        <button type="button" className="btn btn-danger ltr:ml-4 rtl:mr-4" onClick={handleSaveInsurance}>
                                            <IconTrash />
                                        </button>
                                        {false ? (
                                            <button type="button" className="btn btn-warning ltr:ml-4 rtl:mr-4" onClick={handleSaveInsurance}>
                                                Activate
                                            </button>
                                        ) : (
                                            <button type="button" className="btn btn-danger bg-red-700 ltr:ml-4 rtl:mr-4" onClick={handleSaveInsurance}>
                                                Deactivate
                                            </button>
                                        )}
                                        <button type="button" className="btn btn-success ltr:ml-4 rtl:mr-4 gap-1" onClick={handleSaveInsurance}>
                                            <IconSave />
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
export default EditInsurancePackage;
