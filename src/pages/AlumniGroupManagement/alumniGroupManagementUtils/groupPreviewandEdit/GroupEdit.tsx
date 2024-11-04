import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
import Swal from 'sweetalert2';
import useSwr, { mutate } from 'swr';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import IconChecks from '../../../../components/Icon/IconChecks';
import IconEdit from '../../../../components/Icon/IconEdit';
import IconLoader from '../../../../components/Icon/IconLoader';
import IconPencil from '../../../../components/Icon/IconPencil';
import IconSave from '../../../../components/Icon/IconSave';
import IconShare from '../../../../components/Icon/IconShare';
import IconTrash from '../../../../components/Icon/IconTrash';
import IconUserPlus from '../../../../components/Icon/IconUserPlus';
import IconX from '../../../../components/Icon/IconX';
import axiosInstance from '../../../../helper/axiosInstance';
import fetcher from '../../../../helper/fetcher';
import showMessage from '../../../../helper/showMessage';
import { IRootState } from '../../../../store';
import { GetAlumniData } from '../../../../store/alumnigroupSlice';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import AddNewBeneficiary from '../../../MemberOnly/MyAlumniGroupUtils/AddNewBeneficiary';
import AddNewGroupMember from '../../../MemberOnly/MyAlumniGroupUtils/AddNewGroupMember';
import ChangePackage from './changePackage';
import MakePresident from './makepresident';

const GroupEdit = () => {
    const dispatch = useDispatch();
    const { group_id } = useParams();
    const alumniData = useSelector((state: IRootState) => state.alumnidata.alumniGroups);
    const { data: all_members, error: all_members_error, isLoading: all_members_loadng } = useSwr(`/group_members`, fetcher);
    const group_members = all_members?.filter((group_member: any) => group_member.group_id == group_id);
    const [showBeneficiariesModal, setShowBeneficiariesModal] = useState<boolean>(false);
    const [benefactorId, setBenefactorId] = useState<string>('');
    const [group, setGroup] = useState<any>({});

    useEffect(() => {
        dispatch(setPageTitle('Edit Group'));
    });

    useEffect(() => {
        dispatch(GetAlumniData() as any);
    }, [dispatch]);

    const [memberApprovalLaoding, setMemberApprovalLaoding] = useState<{ [key: string]: boolean }>({});
    const [makePresidentModal, setMakePresidentModal] = useState<boolean>(false);
    const [changeInsurancePackageModal, setChangeInsurancePackageModal] = useState<boolean>(false);
    const [isSaveLoading, setIsSaveLoading] = useState(false);

    const [params, setParams] = useState<{ [key: string]: any }>({
        name: '',
        start_date: '',
        end_date: '',
        school: '',
        status: '',
        package_id: '',
        description: '',
        president_user_id: '',
    });

    const [imageSrc, setImageSrc] = useState('/assets/images/logo.svg');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setImageSrc(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const [changedParams, setChangedParams] = useState<{ [key: string]: any }>({});

    const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedParams = { ...params };
        const updatedChangedParams = { ...changedParams };

        if (value.trim() !== '') {
            updatedParams[name] = value;
            updatedChangedParams[name] = value;
        } else {
            delete updatedParams[name];
            delete updatedChangedParams[name];
        }

        setParams(updatedParams);
        setChangedParams(updatedChangedParams);
        console.log('the updated params', updatedParams);
        console.log('the changed params', updatedChangedParams);
    };

    const [AddUserModal, setAddUserModal] = useState(false);
    const [AddNewBeneficiaryModal, setAddNewBeneficiaryModal] = useState(false);
    const [ActivateSave, setActivateSave] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    const handleMemberApproval = async (action: string, member_id: string) => {
        try {
            setMemberApprovalLaoding((prevLoading) => ({ ...prevLoading, [member_id]: true }));

            const approvalResponse = await axiosInstance.put(`/group_members/${member_id}`, JSON.stringify({ status: action }));

            if (approvalResponse.status === 200) {
                Swal.fire(`${action} Successfully`, '', 'success');
                mutate('/group_members');
                setRefreshData(!refreshData);
            }

            setMemberApprovalLaoding((prevLoading) => ({ ...prevLoading, [member_id]: false }));

            return true;
        } catch (error) {
            Swal.fire('Failed', '', 'error');
            setMemberApprovalLaoding((prevLoading) => ({ ...prevLoading, [member_id]: false }));

            console.log(error);
        }
    };

    useEffect(() => {
        console.log('befor', group);
        setGroup(Object.values(alumniData).find((group: any) => group?.id == group_id));
        console.log('after', group);
    }, [alumniData, refreshData]);

    const handleGroupInfoSave = async () => {
        try {
            const response = await axiosInstance.put(`/alumni_groups/${group_id}`, JSON.stringify(changedParams));
            if (response.status === 200) {
                Swal.fire('Group Info Updated', '', 'success');
                mutate('/alumni_groups');
                setRefreshData(!refreshData);
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
            setIsSaveLoading(false);
        }
    };

    return (
        <div className="flex xl:flex-col flex-col gap-2.5">
            <div className="flex items-center lg:justify-between flex-wrap gap-4 mb-6">
                <Link to="/apps/invoice/edit" className="btn btn-danger gap-2">
                    <IconArrowBackward />
                    Back
                </Link>
                <div className="flex !gap-2">
                    <button
                        onClick={() => {
                            setAddUserModal(true);
                        }}
                        className="btn btn-primary gap-2 bg-blue-500 text-white"
                    >
                        <IconUserPlus />
                        Add Member
                    </button>

                    <div>
                        <RWebShare
                            data={{
                                text: 'Like humans, flamingos make friends for life',
                                url: 'https://on.natgeo.com/2zHaNup',
                                title: 'Flamingos',
                            }}
                            onClick={() => console.log('invite button clicked')}
                        >
                            <button className="btn btn-warning gap-2 bg-yellow-500 text-white">
                                <IconShare />
                                Invite A member
                            </button>
                        </RWebShare>
                    </div>
                    <button
                        className="btn btn-info gap-2 bg-teal-500 text-white"
                        onClick={() => {
                            setAddNewBeneficiaryModal(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        Add Beneficiary
                    </button>
                </div>
            </div>
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="flex justify-between flex-wrap px-4">
                    <div className="mb-6 lg:w-1/2 w-full">
                        <div className="flex items-center text-black dark:text-white shrink-0">
                            <img src={imageSrc} alt="img" className="w-14" />
                            <label htmlFor="imageUpload" className="ml-2 cursor-pointer">
                                <IconPencil className="-mt-5 -ml-5  w-6 h-6 " />
                            </label>
                            <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                        </div>
                        <div className="mt-6 text-gray-500 dark:text-gray-400 flex gap-2 items-center">
                            <div>
                                <label htmlFor="schoolstartdate" className="ml-2 cursor-pointer">
                                    school start date:
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    id="schoolstartdate"
                                    className="form-input"
                                    onChange={(e) => handleItemChange(e)}
                                    defaultValue={group?.start_date ? dayjs(group.start_date).format('YYYY-MM-DD') : ''}
                                />
                            </div>
                            <div>
                                <label htmlFor="schoolstartdate" className="ml-2 cursor-pointer">
                                    school end date:
                                </label>
                                <input
                                    type="date"
                                    name="end_date"
                                    id="schoolstartdate"
                                    className="form-input"
                                    onChange={(e) => handleItemChange(e)}
                                    defaultValue={group?.end_date ? dayjs(group?.end_date).format('YYYY-MM-DD') : ''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full lg:max-w-fit">
                        <div className="flex items-center">
                            <label htmlFor="Alumni Group Name" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                Alumni Group Name
                            </label>
                            <input id="number" type="text" name="name" className="form-input lg:w-[250px] w-2/3" placeholder="#8801" defaultValue={group?.name} onChange={(e) => handleItemChange(e)} />
                        </div>
                        <div className="flex items-center mt-2">
                            <label htmlFor="Alumni Group Name" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                Group Description
                            </label>
                            {/* <input id="number" type="textarea" name="alumni-group-description" className="form-input lg:w-[250px] w-2/3" placeholder="#8801" defaultValue={'group descrition'} /> */}
                            <textarea
                                id="description"
                                name="description"
                                className="form-textarea min-h-[100px]"
                                placeholder="alumni-group-description"
                                onChange={(e) => handleItemChange(e)}
                                defaultValue={group?.description}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 px-3 ltr:ml-auto rtl:mr-auto justify-end items-end">
                    <button className={`btn  btn-outline-danger flex items-center gap-2 p-2 rounded `}>
                        <IconX className="w-6 h-6" />
                        Discard Changes
                    </button>
                    <button className={`btn  btn-outline-success flex items-center gap-2 p-2 rounded `}>
                        {true ? <IconSave className="w-6 h-6" /> : <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />}
                        Save Changes
                    </button>
                </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap p-3">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>President:</div>
                            <div className="text-black dark:text-white font-semibold">{group?.president?.username}</div>
                            <div>{group?.president?.address}</div>
                            <div>{group?.president?.email}</div>
                            <div>{group?.president?.phone}</div>
                            <Tippy content="Change president">
                                <button onClick={() => setMakePresidentModal(true)} className="btn bg-success rounded-full px-2 py-1 w-fit text-white" aria-label="make-president">
                                    <IconEdit className="w-4 h-4" />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Insurrance Package :</div>
                                <div className="flex items-center gap-1">
                                    {group?.insurance_package?.name}{' '}
                                    <button onClick={() => setChangeInsurancePackageModal(true)} className="btn bg-success rounded-full px-2 py-1 w-fit text-white">
                                        <IconEdit className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Date Created:</div>
                                <div>{dayjs(group?.created_at).format('DD MMM YYYY')}</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Contract Name:</div>
                                <div className="whitespace-nowrap">{group?.contract?.name}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Contract Id:</div>
                                <div>{group?.contract?.id}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Contract state:</div>
                                <div>{group?.contract?.is_signed === true ? 'Signed' : 'Not Signed'}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Group Activity</div>
                                <div>{group?.contract?.status}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4 w-full ">
                    <div className="panel h-full w-full mb-4">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Group Members</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Member Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>DOB</th>
                                        <th>Occupation</th>
                                        <th>Status</th>
                                        <th>Date Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group_members?.map((member: any) => (
                                        <tr key={member?.id} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                            <td className="min-w-[150px] text-black dark:text-white">
                                                <div className="flex items-center">
                                                    <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                                    <span className="whitespace-nowrap">
                                                        {' '}
                                                        {member?.user_info?.first_name} {member?.user_info?.last_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-primary">{member?.user_info?.email}</td>
                                            <td>{member?.user_info?.phone}</td>
                                            <td>{dayjs(member?.user_info?.dob).format('DD MMM YYYY')}</td>
                                            <td>{member?.user_info?.occupation}</td>
                                            <td>{member?.status}</td>
                                            <td>{dayjs(member?.created_at).format('DD MMM YYYY')} </td>
                                            <td className="flex flex-wrap flex-row">
                                                {(member?.status === 'PENDING' || member?.status === 'DISAPPROVED') && (
                                                    <button onClick={() => handleMemberApproval('APPROVED', member?.id)} className="hover:text-green-500 has-tooltip">
                                                        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-green-500 -mt-8">Appprove</span>
                                                        {memberApprovalLaoding[member?.id] ? (
                                                            <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                                                        ) : (
                                                            <IconChecks />
                                                        )}
                                                    </button>
                                                )}
                                                {(member?.status === 'PENDING' || member?.status === 'APPROVED') && (
                                                    <button onClick={() => handleMemberApproval('DISAPPROVED', member?.id)} className="hover:text-red-800 has-tooltip">
                                                        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">DISAPPROVE</span>
                                                        {memberApprovalLaoding[member?.id] ? (
                                                            <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                                                        ) : (
                                                            <IconX />
                                                        )}
                                                    </button>
                                                )}

                                                <button className="hover:text-red-800 has-tooltip">
                                                    <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-16">Delete From Group</span>

                                                    <IconTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="panel h-full w-full mb-4">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">My Beneficiaries</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Member Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>DOB</th>
                                        <th>Relationship</th>
                                        <th>Benefactor</th>
                                        <th>Date Added</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Luke Ivory</span>
                                            </div>
                                        </td>
                                        <td className="text-primary">LukeIvory@gmail.com</td>
                                        <td>0240844556</td>
                                        <td>0240844556</td>
                                        <td>Approved</td>
                                        <td>0240844556</td>
                                        <td className="flex flex-wrap flex-row">
                                            <button className="hover:text-red-800 has-tooltip">
                                                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-16">Delete From Group</span>

                                                <IconTrash />
                                            </button>

                                            <button className="hover:text-red-800 has-tooltip">
                                                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">UnApprove</span>

                                                <IconX />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-8 px-4">
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes" name="notes" className="form-textarea min-h-[130px]" placeholder="Notes...." defaultValue={params.notes}></textarea>
                </div>
            </div>

            <AddNewGroupMember AddUserModal={AddUserModal} setAddUserModal={setAddUserModal} />
            <AddNewBeneficiary AddUserModal={AddNewBeneficiaryModal} setAddUserModal={setAddNewBeneficiaryModal} />
            <MakePresident showModal={makePresidentModal} setShowModal={setMakePresidentModal} groupId={group?.id} />
            <ChangePackage showModal={changeInsurancePackageModal} setShowModal={setChangeInsurancePackageModal} groupId={group?.id} />
        </div>
    );
};

export default GroupEdit;
