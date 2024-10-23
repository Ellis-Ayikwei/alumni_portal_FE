import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CurrencyInput from 'react-currency-input-field';
import IconX from '../../../components/Icon/IconX';
import InsurancePacakes from '../InsurancePacakes';

interface EditInsurancePackageProps {
    viewModal: boolean;
    setViewModal: (value: boolean) => void;
}

const EditInsurancePackage = ({ viewModal, setViewModal }: EditInsurancePackageProps) => {
    const contractStatus = 'active';

    return (
        <Transition appear show={viewModal} as={Fragment}>
            <Dialog as="div" open={viewModal} onClose={() => setViewModal(false)}>
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
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h1 className="text-2xl font-bold mb-4">Edit Insurance Package</h1>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setViewModal(false)}>
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    {/* Contract Details Section */}

                                    <form>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="groupName" className="text-gray-600">
                                                Group Name:
                                            </label>
                                            <input type="text" id="groupName" className="font-semibold border border-gray-300 rounded p-1" placeholder="Enter Group Name" />
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="description" className="text-gray-600">
                                                Description:
                                            </label>
                                            <textarea id="description" className="font-semibold border border-gray-300 rounded p-1" placeholder="Enter Description" />
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
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
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
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="nominatedLives" className="text-gray-600">
                                                2 nominated lives (Each):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="criticalIllness" className="text-gray-600">
                                                Critical Illness (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="permanentDisability" className="text-gray-600">
                                                Permanent Disability (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
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
                                                Monthly Premium :
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="annualPremium" className="text-gray-600">
                                                Annual Premium :
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setViewModal(false)}>
                                            Close
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setViewModal(false)}>
                                            Save Changes
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
