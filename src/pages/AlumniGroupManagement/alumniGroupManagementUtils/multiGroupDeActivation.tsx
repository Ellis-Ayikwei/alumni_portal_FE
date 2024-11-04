import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { GetUsersData } from '../../../store/usersSlice';
import axiosInstance from '../../../helper/axiosInstance';

const handleMultiUserDeActivation = async (
    selectedUsers: { username: string }[],
    dispatch: Dispatch<AnyAction>
): Promise<boolean> => {
    const promises = selectedUsers.map((user) =>
        axiosInstance.put('/users', {
            is_active: false,
            username: user.username,
        })
    );

    await Promise.all(promises);

    dispatch(GetUsersData() as any);

    return true;
};

export default handleMultiUserDeActivation;
