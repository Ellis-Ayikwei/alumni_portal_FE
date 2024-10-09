import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../helper/axiosInstance';
import { GetUserData } from '../../../store/usersSlice';

export const dParams = {
    id: null,
    name: '',
    email: '',
    phone: '',
    role: 'REGULAR',
    location: '',
    username: '',
    password: '',
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

const useSaveNewUser = async (showMessage: CallableFunction, setAddUserModal: CallableFunction, params: Object, setDefaultParams: CallableFunction, dispatch: Dispatch<AnyAction>) => {
    if (!params.first_name) {
        showMessage('Name is required.', 'error');
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
    if (!params.role) {
        showMessage('Occupation is required.', 'error');
        return true;
    }

    //   searchContacts();

    showMessage(JSON.stringify({ params }));

    const payload = JSON.stringify({ ...params });

    try {
        const response = await axiosInstance.post('/users', payload);
        showMessage(`User created successfully.`, 'success');
        setDefaultParams(dParams);
        dispatch(GetUserData() as any);
        setAddUserModal(false);
    } catch (error: any) {
        if (error.response && error.response.data) {
            // Access the `description` provided by Flask
            const parser = new DOMParser();
            const errorData = error.response.data;
            const doc = parser.parseFromString(errorData, 'text/html');
            const errorMess = doc.querySelector('body')?.innerText || 'An error occurred';
            const errorMessage = errorMess.split('\n')[1];
            console.error('Error:', errorMessage);
            showMessage(`${errorMessage}`, 'error');
        }
    } finally {
        setDefaultParams(dParams);
        // setAddUserModal(false);
    }
};
export default useSaveNewUser;
