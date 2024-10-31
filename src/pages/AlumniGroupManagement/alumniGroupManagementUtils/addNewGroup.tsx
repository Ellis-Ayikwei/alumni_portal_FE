import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import useSwr from 'swr';
import 'tippy.js/dist/tippy.css';
import IconX from '../../../components/Icon/IconX';
import axiosInstance from '../../../helper/axiosInstance';
import { GetUsersData } from '../../../store/usersSlice';
import showMessage from '../../UserManagement/userManagementUtils/showMessage';
import fetcher from '../../../helper/fetcher';

export const dParams = {
    name: '',
    start_date: '',
    end_date: '',
    school: '',
    status: '',
    package_id: '',
    president_id: '',
    president_user_id: '',
    president: null}

interface AddNewAlumniGroupProps {
    AddUserModal: boolean;
    setAddUserModal: (value: boolean) => void;
}

const AddNewAlumniGroup = ({ AddUserModal, setAddUserModal }: AddNewAlumniGroupProps) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<any>('list');
    const [defaultParams, setDefaultParams] = useState({ ...dParams });
    const [params, setParams] = useState({ ...dParams });
    const { data: ins_packages, error: ins_error, isLoading: ins_loadng } = useSwr("/insurance_packages", fetcher);


    console.log("the insurance packages", ins_packages)
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
                                    <h4>Add Alumni Group</h4>
                                </div>
                                <div className="p-5">
                                    <form>
                                        <div className="mb-5">
                                            <label htmlFor="name">
                                                Name <span className="text-red-600">*</span>
                                            </label>
                                            <input id="name" type="text" placeholder="Enter Name" className="form-input" value={params.name} onChange={(e) => changeValue(e)} required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="name">
                                                School <span className="text-red-600">*</span>
                                            </label>
                                            <input id="name" type="text" placeholder="Enter School Name" className="form-input" value={params.school} onChange={(e) => changeValue(e)} required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="start_date">
                                                Start Date <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                id="start_date"
                                                type="date"
                                                placeholder="Enter Start Date"
                                                className="form-input"
                                                value={params.start_date}
                                                onChange={(e) => changeValue(e)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="end_date">
                                                End Date <span className="text-red-600">*</span>
                                            </label>
                                            <input id="end_date" type="date" placeholder="Enter End Date" className="form-input" value={params.end_date} onChange={(e) => changeValue(e)} required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="insurance_package">Insurance Package</label>
                                            <Select
                                                defaultValue={params.insurance_package}
                                                id="insurance_package"
                                                options={insurance_packages}
                                                isSearchable={true}
                                                onChange={(e) => setParams({ ...params, insurance_package: e?.value })}
                                                required
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
                                        <div className="mb-5">
                                            <label htmlFor="president_id">
                                                President
                                            </label>
                                            <input
                                                id="president_id"
                                                type="number"
                                                placeholder="Enter President Id"
                                                className="form-input"
                                                value={params.president_id}
                                                onChange={(e) => changeValue(e)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="id">
                                                Id <span className="text-red-600">*</span>
                                            </label>
                                            <input id="id" type="number" placeholder="Enter Id" className="form-input" value={params.id} onChange={(e) => changeValue(e)} required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="create_at">
                                                Create At <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                id="create_at"
                                                type="datetime-local"
                                                placeholder="Enter Create At"
                                                className="form-input"
                                                value={params.create_at}
                                                onChange={(e) => changeValue(e)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="updated_at">
                                                Updated At <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                id="updated_at"
                                                type="datetime-local"
                                                placeholder="Enter Updated At"
                                                className="form-input"
                                                value={params.updated_at}
                                                onChange={(e) => changeValue(e)}
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

export default AddNewAlumniGroup;
