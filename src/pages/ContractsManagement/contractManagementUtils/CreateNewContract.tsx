import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import 'tippy.js/dist/tippy.css';
import IconX from '../../../components/Icon/IconX';
import axiosInstance from '../../../helper/axiosInstance';
import { GetUsersData } from '../../../store/usersSlice';
import showMessage from './showMessage';

export const dParams = {
    id: null,
    name: '',
    email: '',
    phone: '',
    role: 'REGULAR',
    location: '',
    username: '',
    password: '',
    password1: '',
    password2: '',
    department: '',
    job_title: '',
    first_name: '',
    last_name: '',
    other_names: '',
    address: '',
    gender: '',
    marital_status: '',
    date_of_birth: '',
    state_of_origin: '',
    local_government: '',
    blood_group: '',
    genotype: '',
    height: '',
    weight: '',
    eye_color: '',
    hair_color: '',
    skin_tone: '',
    physical_challenge: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_email: '',
    next_of_kin_name: '',
    next_of_kin_phone: '',
    next_of_kin_email: '',
    next_of_kin_address: '',
    next_of_kin_relationship: '',
    bank_name: '',
    bank_account_number: '',
    sort_code: '',
    account_type: '',
    bvn: '',
    nin: '',
    image: '',
    medical_history: '',
    medical_history_description: '',
    medical_history_date: '',
    medical_history_doctor_name: '',
    medical_history_doctor_phone: '',
    medical_history_doctor_email: '',
    medical_history_doctor_address: '',
};

interface SaveNewUserProps {
    AddUserModal: boolean;
    setAddUserModal: (value: boolean) => void;
}

const CreateNewContract = ({ AddUserModal, setAddUserModal }: SaveNewUserProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [value, setValue] = useState<any>('list');
    const [defaultParams, setDefaultParams] = useState({ ...dParams });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const groups = [
        { value: 'group1', label: 'group1' },
        { value: 'group2', label: 'group2' },
        { value: 'group3', label: 'group3' },
    ];
    const insurance_packages = [
        { value: 'PLATINUM', label: 'PLATINUM' },
        { value: 'GOLD', label: 'GOLD' },
        { value: 'SILVER', label: 'SILVER' },
        { value: 'BRONZE', label: 'BRONZE' },
    ];
    const users = [
        { value: 'user1', label: 'user1' },
        { value: 'user2', label: 'user2' },
        { value: 'user3', label: 'user3' },
    ];

    const ContractStatus = [
        { value: 'ACTIVE', label: 'ACTIVE' },
        { value: 'INACTIVE', label: 'INACTIVE' },
        { value: 'EXPIRED', label: 'EXPIRED' },
        { value: 'TERMINATED', label: 'TERMINATED' },
    ];

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        console.log('value', value);
        setParams({ ...params, [id]: value });
    };

    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const saveNewUser = async () => {
        console.log('params', params);
        if (!params.first_name) {
            showMessage('First Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.username) {
            showMessage('Username is required.', 'error');
            return true;
        }
        if (!params.password) {
            showMessage('Password is required.', 'error');
            return true;
        }
        if (!params.password1) {
            showMessage('Confirm Password is required.', 'error');
            return true;
        }
        if (params.password !== params.password1) {
            showMessage('Passwords do not match.', 'error');
            return true;
        }
        if (!params.dob) {
            showMessage('Date of Birth is required.', 'error');
            return true;
        }
        if (!params.role) {
            showMessage('Occupation is required.', 'error');
            return true;
        }
        const payload = JSON.stringify({ ...params });

        try {
            const response = await axiosInstance.post('/users', payload);
            if (response.status === 200) {
                showMessage(`User created successfully.`, 'success');
                setParams(defaultParams);
                dispatch(GetUsersData() as any);
                setAddUserModal(false);
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const parser = new DOMParser();
                const errorData = error.response.data;
                const doc = parser.parseFromString(errorData, 'text/html');
                const errorMess = doc.querySelector('body')?.innerText || 'An error occurred';
                const errorMessage = errorMess.split('\n')[1];
                console.error('Error:', errorMessage);
                showMessage(`${errorMessage}`, 'error');
            }
        } finally {
            // setParams(defaultParams);
        }
    };
    return (
        <Transition appear show={AddUserModal} as={Fragment}>
            <Dialog as="div" open={AddUserModal} onClose={() => setAddUserModal(false)} className="relative z-[51]">
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
                                    onClick={() => setAddUserModal(false)}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {params.id ? 'Edit Contract' : 'Add Contract'}
                                </div>
                                <div className="p-5">
                                    <form>
                                        <div className="mb-5">
                                            <label htmlFor="group_id">
                                                Alumni Group <span className="text-red-600">*</span>
                                            </label>
                                            <Select
                                                defaultValue={params.group_id}
                                                id="group_id"
                                                options={groups}
                                                isSearchable={true}
                                                onChange={(e) => setParams({ ...params, group_id: e?.value })}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="expiry_date">
                                                Expiry Date <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                id="expiry_date"
                                                type="date"
                                                placeholder="Enter Expiry Date"
                                                className="form-input"
                                                value={params.expiry_date}
                                                onChange={(e) => changeValue(e)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="expiry_date">Date Effective</label>
                                            <input id="expiry_date" type="date" placeholder="Enter Expiry Date" className="form-input" value={params.effctive_date} onChange={(e) => changeValue(e)} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="signed_date">Signed Date</label>
                                            <input
                                                id="signed_date"
                                                type="datetime-local"
                                                placeholder="Enter Signed Date"
                                                className="form-input"
                                                value={params.signed_date}
                                                onChange={(e) => changeValue(e)}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="signed_date">Policy Number</label>
                                            <input id="signed_date" type="text" placeholder="Enter policy number" className="form-input" value={params.signed_date} onChange={(e) => changeValue(e)} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="signed_date">Contract Description</label>
                                            <textarea
                                                id="signed_date"
                                                placeholder="Enter Enter Contract Description"
                                                className="form-input"
                                                value={params.signed_date}
                                                onChange={(e) => changeValue(e)}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="status">
                                                Status <span className="text-red-600">*</span>
                                            </label>
                                            <Select
                                                defaultValue={params.status}
                                                id="status"
                                                options={Object.values(ContractStatus)}
                                                isSearchable={false}
                                                onChange={(e) => setParams({ ...params, status: e?.value })}
                                                required
                                            />
                                        </div>
                                        {/* <div className="mb-5">
                                            <label htmlFor="underwriter_id">
                                                Underwriter <span className="text-red-600">*</span>
                                            </label>
                                            <Select
                                                defaultValue={params.underwriter_id}
                                                id="underwriter_id"
                                                options={users}
                                                isSearchable={true}
                                                onChange={(e) => setParams({ ...params, underwriter_id: e?.value })}
                                                required
                                            />
                                        </div> */}
                                        <div className="mb-5">
                                            <label htmlFor="insurance_package_id">
                                                Insurance Package <span className="text-red-600">*</span>
                                            </label>
                                            <Select
                                                defaultValue={params.insurance_package_id}
                                                id="insurance_package_id"
                                                options={insurance_packages}
                                                isSearchable={true}
                                                onChange={(e) => setParams({ ...params, insurance_package_id: e?.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setAddUserModal(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                {params.id ? 'Update' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CreateNewContract;
