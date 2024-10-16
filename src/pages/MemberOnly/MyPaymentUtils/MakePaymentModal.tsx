import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Select from 'react-select';
import IconCashBanknotes from '../../../components/Icon/IconCashBanknotes';
import IconX from '../../../components/Icon/IconX';
interface MakePaymentModalProps {
    isPaymentModalOpened: boolean;
    setIsPaymentModalOpened: (isOpen: boolean) => void;
    paymentData: any;
}
const pars = {
    seleced: '',
};
const MakePaymentModal: React.FC<MakePaymentModalProps> = ({ isPaymentModalOpened, setIsPaymentModalOpened, paymentData }) => {
    const PaymentTypes = [
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'bank_transfer', label: 'Bank Transfer' },
        { value: 'cash', label: 'Cash' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'Mobile Money', label: 'Mobile Money' },
    ];

    const [selectedOption, setSelectedOption] = useState<any>();

    return (
        <Transition appear show={isPaymentModalOpened} as={Fragment}>
            <Dialog as="div" open={isPaymentModalOpened} onClose={() => setIsPaymentModalOpened(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel my-8 w-full max-w-md  h-full rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                    <h5>Pay Now</h5>
                                    <button type="button" onClick={() => setIsPaymentModalOpened(false)} className="text-white-dark hover:text-dark">
                                        <IconX className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-5 p-5 h-full">
                                    <div className="flex items-center space-x-2">
                                        <h6 className="text-sm font-semibold">Payment for:</h6>
                                        <p className="text-sm">{paymentData?.member?.name}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <h6 className="text-sm font-semibold">Amount:</h6>
                                        <p className="text-sm">{paymentData?.amount}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <h6 className="text-sm font-semibold">Description:</h6>
                                        <p className="text-sm">{paymentData?.description}</p>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="Payment Type" className="block text-sm font-semibold mb-2">
                                            Payment Type
                                        </label>
                                        <Select id="role" options={PaymentTypes} isSearchable={false} required className="w-full" onChange={(option) => setSelectedOption(option)} isMulti={false} />
                                    </div>
                                </div>
                                <div className="mb-5 flex items-center justify-center gap-3">
                                    <button type="button" className="btn btn-outline-success flex gap-1">
                                        <IconCashBanknotes className="w-5 h-5 shrink-0" />

                                        <span>
                                            Continue to pay {selectedOption ? <b>${paymentData?.amount}</b> : null} with {selectedOption?.label}
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-outline-danger flex gap-1">
                                        <IconX className="shrink-0" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MakePaymentModal;
