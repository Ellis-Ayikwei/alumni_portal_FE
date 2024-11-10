import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axiosInstance from '../../../helper/axiosInstance';
import { GetAlumniData } from '../../../store/alumnigroupSlice';
import { GetContractsData } from '../../../store/contractsSlice';

const handleMultiContractActivation = async (selectedContracts: { id: string }[], dispatch: Dispatch<AnyAction>): Promise<boolean> => {
    const promises = selectedContracts.map((contract) =>
        axiosInstance.put(`/contracts/${contract.id}`, {
            status: 'ACTIVE',
        })
    );

    await Promise.all(promises);

    dispatch(GetContractsData() as any);

    return true;
};

export default handleMultiContractActivation;
