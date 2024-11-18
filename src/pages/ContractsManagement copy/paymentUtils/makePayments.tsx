import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import useSwr from 'swr';
import IconLoader from '../../../components/Icon/IconLoader';
import IconX from '../../../components/Icon/IconX';
import axiosInstance from '../../../helper/axiosInstance';
import fetcher from '../../../helper/fetcher';
import { IRootState } from '../../../store';
import { GetAlumniData } from '../../../store/alumnigroupSlice';
import { GetPaymentsData } from '../../../store/paymentsSlice';
import { GetUsersData } from '../../../store/usersSlice';
import AddPaymentMethod from './addPaymentMethod';
import showMessage from './showMessage';

interface MakePaymentsProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    edit?: boolean;
    paymentId?: string;
    setPaymentId?: (value: string) => void;
    setEdit?: (value: boolean) => void;
}

const MakePayments = ({ showModal, setShowModal, edit, setEdit, paymentId, setPaymentId }: MakePaymentsProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAlumniData() as any);
        dispatch(GetUsersData() as any);
    }, [dispatch]);

    const [amount, setAmount] = useState<number>(0);
    const groups = useSelector((state: IRootState) => state.alumnidata.alumniGroups);
    const users = useSelector((state: IRootState) => state.usersdata.usersData);

    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [receiptUrl, setReceiptUrl] = useState<string>('');
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [addNewMethodModal, setAddNewMethodModal] = useState(false);

    const { data: paymentMethods, error: paymentMethodsError, isLoading: paymentMethodsLoading } = useSwr('/payment_methods', fetcher);
    const [params, setParams] = useState<any>({});

    const { data, error, loading } = useSwr(edit ? `/payments/${paymentId}` : null, fetcher);

    useEffect(() => {
        if (edit && data) {
            console.log('data', data);
            setParams({ ...data, payment_date: dayjs(data.payment_date).format('YYYY-MM-DD') });
            console.log('params', { ...data });
        }
        return () => {
            setParams({});
        };
    }, [data, edit]);
    const savePayment = async () => {
        setIsSaveLoading(true);

        const payload = {
            ...params,
        };
        console.log(' the payload', payload);

        try {
            const response = !edit ? await axiosInstance.post('/payments', payload) : await axiosInstance.put(`/payments/${paymentId}`, payload);
            if (response.status === 201 ||  response.status === 200) {
                showMessage(`Payment has been ${edit ? 'updated' : 'created'} successfully.`, 'success');
                dispatch(GetPaymentsData() as any);
                setShowModal(false);
            }
        } catch (error: any) {
            showMessage('An error occurred while creating payment.', 'error');
            console.error('Error:', error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    const handleChange = (e: InputChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setParams({ ...params, [id]: value });
    };

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                open={showModal}
                onClose={() => {
                    setShowModal(false), setEdit && setEdit(false), setPaymentId && setPaymentId('');
                }}
                className="relative z-[51]"
            >
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
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-y-scroll w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Add New Payment</div>
                                <div className="p-5">
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Amount
                                            </label>
                                            <div className="mt-1">
                                                <CurrencyInput
                                                    id="amount"
                                                    name="amount"
                                                    prefix="GH₵ "
                                                    value={params?.amount || 0}
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => handleChange({ target: { id: 'amount', value: value || '' } } as InputChangeEvent)}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Payment Date
                                            </label>
                                            <div className="mt-1">
                                                <input id="payment_date" type="date" value={params?.payment_date || ''} onChange={(e) => handleChange(e)} className="form-input" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Status
                                            </label>
                                            <div className="mt-1">
                                                <Select
                                                    id="status"
                                                    classNamePrefix="select"
                                                    isSearchable={false}
                                                    isClearable={false}
                                                    onChange={(newValue) => handleChange({ target: { id: 'status', value: newValue?.value || '' } } as InputChangeEvent)}
                                                    options={[
                                                        { value: 'PENDING', label: 'Pending' },
                                                        { value: 'COMPLETED', label: 'completed' },
                                                        { value: 'FAILED', label: 'Failed' },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Group
                                            </label>
                                            <div className="mt-1">
                                                <Select
                                                    id="group_id"
                                                    classNamePrefix="select"
                                                    isSearchable={true}
                                                    isClearable={false}
                                                    onChange={(option: any) => handleChange({ target: { id: 'group_id', value: option.value } } as InputChangeEvent)}
                                                    options={Object.values(groups)?.map((group) => ({
                                                        value: group.id,
                                                        label: group.name,
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="payedBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Payed by
                                            </label>
                                            <div className="mt-1">
                                                <Select
                                                    id="payer_id"
                                                    classNamePrefix="select"
                                                    isSearchable={true}
                                                    isClearable={false}
                                                    onChange={(option: any) => handleChange({ target: { id: 'payer_id', value: option.value } } as InputChangeEvent)}
                                                    options={Object.values(users)?.map((user) => ({
                                                        value: user?.id,
                                                        label: user?.full_name,
                                                    }))}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Payment Method
                                            </label>
                                            <div className="mt-1">
                                                <Select
                                                    id="payment_method_id"
                                                    classNamePrefix="select"
                                                    isSearchable={true}
                                                    isClearable={false}
                                                    onChange={(option: any) => handleChange({ target: { id: 'payment_method_id', value: option.value } } as InputChangeEvent)}
                                                    options={
                                                        paymentMethods
                                                            ? Object.values(paymentMethods)?.map((pm) => ({
                                                                  value: pm?.id,
                                                                  label: pm?.name,
                                                              }))
                                                            : []
                                                    }
                                                />
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Payment method not in list ?
                                                <button type="button" onClick={() => setAddNewMethodModal(true)} className="ml-2 text-sm text-gray-500 underline rtl:ml-auto ltr:mr-auto">
                                                    add new payment method
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-8 flex items-center justify-end gap-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                setShowModal(false), setEdit && setEdit(false), setPaymentId && setPaymentId(''), setParams && setParams({});
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button type="button" onClick={() => savePayment()} className="btn btn-success" disabled={isSaveLoading}>
                                            {!isSaveLoading ? edit ? 'Update' : 'Save' : <IconLoader className="animate-spin inline-block" />}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    {addNewMethodModal && <AddPaymentMethod showModal={addNewMethodModal} setShowModal={setAddNewMethodModal} />}
                </div>
            </Dialog>
        </Transition>
    );
};

export default MakePayments;
