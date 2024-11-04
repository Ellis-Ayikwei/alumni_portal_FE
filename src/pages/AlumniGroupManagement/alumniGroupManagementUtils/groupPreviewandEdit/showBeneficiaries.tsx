import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import useSwr from 'swr';
import 'tippy.js/dist/tippy.css';
import IconX from '../../../../components/Icon/IconX';
import fetcher from '../../../../helper/fetcher';

export const dParams = {
    name: '',
    start_date: '',
    end_date: '',
    school: '',
    status: '',
    package_id: '',
    president_user_id: '',
};

interface showBeneficiariesProps {
    showBeneficiariesModal: boolean;
    setShowBeneficiariesModal: (value: boolean) => void;
    benefactorId: string;
}

const ShowBeneficiaries = ({ showBeneficiariesModal, setShowBeneficiariesModal, benefactorId }: showBeneficiariesProps) => {
    const dispatch = useDispatch();
    const { data: member_data, error: member_error, isLoading: member_loadng } = useSwr(
        showBeneficiariesModal ? `/group_members/${benefactorId}` : null,
        fetcher
    );

    // console.log('the member data', member_data);
    return (
        <Transition appear show={showBeneficiariesModal} as={Fragment}>
            <Dialog as="div" open={showBeneficiariesModal} onClose={() => setShowBeneficiariesModal(false)} className="relative z-[51]">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-y-scroll w-full max-w-3xl text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => setShowBeneficiariesModal(false)}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    <h4>
                                        Beneficiaries of <b>{member_data?.user_info?.username}</b>
                                    </h4>
                                </div>
                                <div className="p-5">
                                    <div className="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>relationship</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {member_data?.beneficiaries?.map((bnf: any) => <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                    <td className="min-w-[150px] text-black dark:text-white">
                                                        <div className="flex items-center">
                                                            <span className="whitespace-nowrap">{bnf.first_name} {bnf.last_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-primary">{bnf.email}</td>
                                                    <td>{bnf.phone}</td>
                                                    <td>{bnf.relationship_types}</td>
                                                </tr>)}
                                            </tbody>
                                        </table>
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

export default ShowBeneficiaries;
