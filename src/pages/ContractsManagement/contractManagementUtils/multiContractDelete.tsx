import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axiosInstance from '../../../helper/axiosInstance';
import confirmDialog from '../../../helper/confirmDialog';
import { GetUsersData } from '../../../store/usersSlice';
import { GetAlumniData } from '../../../store/alumnigroupSlice';
import { GetContractsData } from '../../../store/contractsSlice';

const handleMultiContractDelete = async (selectedContracts : { id: string }[], dispatch: Dispatch<AnyAction>, setSelectedrecords: any): Promise<boolean> => {
    const isConfirmed = await confirmDialog({
        title: 'Delete Contracts',
        body: ' This cannot be undone',
        note: 'It is recommended to deactivate the group instead.',
        finalQuestion: 'Are you sure you want to delete this Contract(s)?',
    });
    if (!isConfirmed) {
        return false;
    }

    const promises = selectedContracts.map((contract) => {
        return axiosInstance.delete(`/contracts/${contract.id}`);
    });

    const results = await Promise.allSettled(promises);

    const failedDeletes = results.filter((result) => result.status === 'rejected');
    if (failedDeletes.length > 0) {
        console.error('Failed to delete users:', failedDeletes);
    }

    dispatch(GetContractsData() as any);
    setSelectedrecords([]);
    return true;
};

export default handleMultiContractDelete;
