import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { StylesConfig } from 'react-select';
import 'tippy.js/dist/tippy.css';
import IconX from '../../../components/Icon/IconX';
import axiosInstance from '../../../helper/axiosInstance';
import { IRootState } from '../../../store';
import { GetUsersData } from '../../../store/usersSlice';

interface AddMembersToGroupProps {
    AddMembersToGroupModal: boolean;
    setAddMembersToGroupModal: (value: boolean) => void;
    groups: any;
}

const roles = [
    { value: 'SUPER_ADMIN', label: 'Super Admin', isDisabled: 'option--is-disabled' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'REGULAR', label: 'Regular' },
    { value: 'UNDERWRITER', label: 'Underwriter' },
    { value: 'PREMIUM_ADMIN', label: 'Premium Admin' },
    { value: 'SALES', label: 'Sales' },
    { value: 'MEMBER', label: 'Member' },
    { value: 'UNDERWRITER', label: 'Underwriter' },
    { value: 'PREMIUM_ADMIN', label: 'Premium Admin' },
    { value: 'SALES', label: 'Sales' },
    { value: 'MEMBER', label: 'Member' },
    { value: 'UNDERWRITER', label: 'Underwriter' },
    { value: 'PREMIUM_ADMIN', label: 'Premium Admin' },
    { value: 'SALES', label: 'Sales' },
    { value: 'MEMBER', label: 'Member' },
];

const AddMembersToGroup = ({ AddMembersToGroupModal, setAddMembersToGroupModal, groups }: AddMembersToGroupProps) => {
    const dispatch = useDispatch();
    const usersData = useSelector((state: IRootState) => state.usersdata.usersData);
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const [usersToAddToALumniGroup, setUsersToAddToALumniGroup] = useState<any>(usersData);

    useEffect(() => {
        dispatch(GetUsersData() as any);
        setUsersToAddToALumniGroup(usersData);
    }, [dispatch]);

    const colourStyles: StylesConfig<any, true> = {
        menuList: (provided, state) => ({
            ...provided,
            height: '200px',
        }),
    };

    const users = Object.values(usersToAddToALumniGroup)?.map((user: any) => {
        return { value: user.id, label: user.first_name + user.last_name };
    });

    useEffect(() => {
        console.log(selectedUsers);
    }, [selectedUsers]);

    const handleAddMembersToGroup = async () => {
        if (selectedUsers.length > 0) {
            const promises = selectedUsers.map((user: any) => {
                groups.forEach((group: any) => {
                    return axiosInstance.post(`/alumni_groups/${group.id}/members`, {
                        user_id: user.value,
                    });
                });
            });

            const allPromises = await Promise.allSettled(promises);

            const failedPromises = allPromises.filter((promise) => promise.status === 'rejected');

            if (failedPromises.length > 0) {
                console.error('Failed to add users to group:', failedPromises);
            }
            if (allPromises.length > 0) {
                setAddMembersToGroupModal(false);
            }
        }
    };

    return (
        <Transition appear show={AddMembersToGroupModal} as={Fragment}>
            <Dialog as="div" open={AddMembersToGroupModal} onClose={() => setAddMembersToGroupModal(false)} className="relative z-[51]">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8 ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg  w-full  h-fit max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => setAddMembersToGroupModal(false)}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{'Add User To An Alumni Group'}</div>
                                <div className="p-5">
                                    Add members to these groups{' '}
                                    <b>
                                        {groups.map((group: any) => (
                                            <p>{group.name},</p>
                                        ))}
                                    </b>
                                    <div className="mb-5 mt-5">
                                        <label htmlFor="role">Select members to add</label>
                                        <Select
                                            id="role"
                                            onChange={(selectedValues) => setSelectedUsers(selectedValues)}
                                            options={users}
                                            isSearchable={true}
                                            required
                                            styles={colourStyles}
                                            hideSelectedOptions={true}
                                            isMulti
                                        />
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setAddMembersToGroupModal(false)}>
                                            Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleAddMembersToGroup}>
                                            Add
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

export default AddMembersToGroup;
