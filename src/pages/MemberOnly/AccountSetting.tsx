import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import PasswordChecklist from 'react-password-checklist';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSwr, { mutate } from 'swr';
import IconEdit from '../../components/Icon/IconEdit';
import IconHome from '../../components/Icon/IconHome';
import IconLoader from '../../components/Icon/IconLoader';
import IconLock from '../../components/Icon/IconLock';
import IconSave from '../../components/Icon/IconSave';
import IconX from '../../components/Icon/IconX';
import axiosInstance from '../../helper/axiosInstance';
import fetcher from '../../helper/fetcher';
import { setPageTitle } from '../../store/themeConfigSlice';
import showMessage from './MyAlumniGroupUtils/showMessage';

const AccountSetting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [readOnly, setReadOnly] = useState(true);
    const [onEdit, setOnEdit] = useState(false);
    const [params, setParams] = useState<{ [key: string]: any }>({});
    const [tabs, setTabs] = useState<string>('home');
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    const { id } = useParams();

    const { data: user, error } = useSwr(`/users/my_profile/${id}`, fetcher);

    useEffect(() => {
        if (user) {
            setParams({ ...user, dob: dayjs(user.dob).format('YYYY-MM-DD') });
        }
    }, [user]);
    useEffect(() => {
        console.log('user', params);
    }, [params]);

    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const handleEdit = () => {
        setOnEdit(!onEdit);
        setReadOnly(!readOnly);
    };

    const handleDiscardChanegs = () => {
        setOnEdit(!onEdit);
        setReadOnly(!readOnly);
    };

    const handleSaveChanges = async () => {
        console.log('clicked');

        setOnEdit(!onEdit);
        setReadOnly(!readOnly);
        setIsSaveLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 6000));

            const payload = {
                ...params,
            };
            console.log('the payload', payload);
            let userId = localStorage.getItem('userId');

            const response = await axiosInstance.put(`/users/${userId}`, JSON.stringify({ ...params }));

            if (response.status === 200) {
                showMessage('Successfully updated', 'success');
                mutate(`/users/my_profile/${id}`);
                setIsSaveLoading(false);
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
                setIsSaveLoading(false);
            }
        } finally {
            setIsSaveLoading(false);
        }
    };

    const resetPassword = async () => {
        setIsSaveLoading(true);
        const requiredFields = [
            { field: 'currentPassword', message: 'Current password is required.' },
            { field: 'password', message: 'New password is required.' },
            { field: 'confirmPassword', message: 'Confirm password is required.' },
        ];

        for (let { field, message } of requiredFields) {
            if (!field) {
                showMessage(message, 'error');
                setIsSaveLoading(false);
                return true;
            }
        }

        if (password !== confirmPassword) {
            setIsSaveLoading(false);
            return showMessage('Password and Confirm Password do not match', 'error');
        }

        const payload = {
            currentPassword,
            newPassword: password,
            confirmPassword,
        };
        console.log('the payload', payload);
        try {
            const response = await axiosInstance.put(`/users/reset_password/${id}`, payload);
            if (response.status === 200) {
                showMessage(`Password Reset Successfully.`, 'success');
                setIsSaveLoading(false);
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
                setIsSaveLoading(false);
            }
        } finally {
            setIsSaveLoading(false);
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Account Settings</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Home
                            </button>
                        </li>

                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('security')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'security' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconLock />
                                Security
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div>
                        <h6 className="text-lg font-bold mb-5">General Information</h6>
                        <div className="flex flex-col">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Jimmy@gmail.com"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.email}
                                        onChange={(e) => setParams({ ...params, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.username}
                                        onChange={(e) => setParams({ ...params, username: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.first_name}
                                        onChange={(e) => setParams({ ...params, first_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        placeholder="Last Name"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.last_name}
                                        onChange={(e) => setParams({ ...params, last_name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <input
                                        id="gender"
                                        type="text"
                                        placeholder="Gender"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.gender}
                                        onChange={(e) => setParams({ ...params, gender: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input
                                        id="dob"
                                        type="date"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.dob}
                                        placeholder="YYYY-MM-DD"
                                        onChange={(e) => setParams({ ...params, dob: dayjs(e.target.value).format('DD-MM-YYYY') })}
                                        min="1997-01-01"
                                        max={dayjs().format('YYYY-MM-DD')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        placeholder="Phone"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.phone}
                                        onChange={(e) => setParams({ ...params, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="occupation">Occupation</label>
                                    <input
                                        id="occupation"
                                        type="text"
                                        placeholder="Occupation"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.occupation}
                                        onChange={(e) => setParams({ ...params, occupation: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <textarea
                                        id="address"
                                        placeholder="Address"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.address}
                                        onChange={(e) => setParams({ ...params, address: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="other_names">Other Names</label>
                                    <input
                                        id="other_names"
                                        type="text"
                                        placeholder="Other Names"
                                        className="form-input"
                                        readOnly={readOnly}
                                        value={params?.other_names}
                                        onChange={(e) => setParams({ ...params, other_names: e.target.value })}
                                    />
                                </div>

                                <div className="sm:col-span-2 mt-3 flex justify-end gap-2">
                                    {onEdit ? (
                                        <button type="button" className="btn btn-danger gap-2" onClick={handleDiscardChanegs}>
                                            <IconX /> Discard Changes
                                        </button>
                                    ) : (
                                        <button type="button" className="btn btn-primary gap-2" disabled={isSaveLoading} onClick={handleEdit}>
                                            <IconEdit /> Edit
                                        </button>
                                    )}
                                    <button type="button" className="btn btn-success " disabled={!onEdit || isSaveLoading} onClick={handleSaveChanges}>
                                        {isSaveLoading ? (
                                            <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                                        ) : (
                                            <div className="flex gap-2">
                                                <IconSave /> Save changes
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                {tabs === 'security' ? (
                    <div className="switch">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Password Reset</h5>
                                <p>Change your password to secure your account. We suggest you use a strong password.</p>

                                <div>
                                    <label htmlFor="current-password">Current Password</label>
                                    <input id="current-password" type={type} placeholder="Current Password" className="form-input" onChange={(e) => setCurrentPassword(e.target.value)} />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password1">
                                        New Password <span className="text-red-600">*</span>
                                    </label>
                                    <div className="flex">
                                        <input
                                            type={type}
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            className="form-input"
                                            value={params.password1}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-7">
                                    <label htmlFor="password2">
                                        Confirm password <span className="text-red-600">*</span>
                                    </label>
                                    <div className="">
                                        <input
                                            type={type}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="Re-Type Password"
                                            className="form-input w-full"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            autoComplete="current-password"
                                            required
                                        />
                                        <div className="text-right mt-2">
                                            {' '}
                                            <span className="cursor-pointer text-gray-500 flex items-center justify-end" onClick={handleToggle}>
                                                show
                                                <Icon className="ml-1" icon={icon} size={16} />
                                            </span>
                                        </div>
                                    </div>

                                    {password && <PasswordChecklist rules={['minLength', 'specialChar', 'number', 'capital', 'match']} minLength={8} value={password} valueAgain={confirmPassword} />}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button type="button" className="btn btn-success " onClick={resetPassword}>
                                        {isSaveLoading ? (
                                            <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                                        ) : (
                                            <div className="flex gap-2">
                                                <IconSave /> Reset Password
                                            </div>
                                        )}
                                    </button>
                                    <div>
                                        forgot Password?{' '}
                                        <button type="button" className="underline underline-offset-2">
                                            Recorver Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Two-Factor Authentication</h5>
                                <p>Enable two-factor authentication to add an extra layer of security to your account.</p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox7" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
