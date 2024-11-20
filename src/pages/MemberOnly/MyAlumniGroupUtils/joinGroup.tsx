import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useSwr from 'swr';
import fetcher from '../../../helper/fetcher';
import { IRootState } from '../../../store';
import { setPageTitle } from '../../../store/themeConfigSlice';

import 'react-perfect-scrollbar/dist/css/styles.css';
import IconArrowForward from '../../../components/Icon/IconArrowForward';
import IconMenuUsers from '../../../components/Icon/Menu/IconMenuUsers';
import axiosInstance from '../../../helper/axiosInstance';
import showMessage from '../../../helper/showMessage';

const adminUsers = ['SUPER_ADMIN', 'ADMIN', 'UNDERWRITER', 'PREMIUM_ADMIN', 'SALES'];

const JoinGroup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const inviteId = '54600f61-3d17-4f91-912f-b922b5239';

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const { group_id } = useParams();
    // const alumniData = useSelector((state: IRootState) => state.alumnidata.alumniGroups);
    const { data: alumniData, error: alumniDataError } = useSwr(`/alumni_groups/${group_id}`, fetcher);
    const { data: all_members, error: all_members_error, isLoading: all_members_loadng } = useSwr(`/group_members`, fetcher);
    const group_members = all_members?.filter((group_member: any) => group_member.group_id == group_id);
    const [showBeneficiariesModal, setShowBeneficiariesModal] = useState<boolean>(false);
    const [benefactorIds, setBenefactorIds] = useState<{ userId: string; memberId: string }>({ userId: '', memberId: '' });
    const { data: group, error: all_group_error, isLoading: all_group_loadng } = useSwr(`/alumni_groups/${group_id}`, fetcher);
    const userId = useSelector((state: IRootState) => state.auth.user?.id);

    console.log('group data is ', group);

    useEffect(() => {
        dispatch(setPageTitle('Group Preview'));
        checkIfUserIsAlreadyAmember()
    });


    const checkIfUserIsAlreadyAmember = () => {
        const isMember = group_members?.find((grp_md: any) => grp_md.user_id == userId);
        if (isMember) {
            showMessage('You are already a member of this group', 'error');
            navigate(`/member/dashboard`);
        }
    }
    const handleJoinGroup = async () => {
        try {
            const payload = JSON.stringify({
                user_id: userId,
                invite_code: code,
                invite_id: inviteId,
                action: 'join',
            });

            const response = await axiosInstance.post(`/alumni_groups/${group_id}/members`, payload);
            console.log('the response', response);
            if (response.status === 200 || response.status === 409) {
                showMessage('Group Joined Successfully', 'success');
                navigate(`/member/groups/${group_id}`);
            }
        } catch (error: any) {
            if (error?.response && error?.response.data) {
                const parser = new DOMParser();
                const errorData = error.response.data;
                const doc = parser.parseFromString(errorData, 'text/html');
                const errorMess = doc.querySelector('body')?.innerText || 'An error occurred';
                const errorMessage = errorMess.split('\n')[1];
                console.error('Error:', error);
                showMessage(`${errorMessage}`, 'error');
            }
        }
    };

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="pt-5 flex  flex-col items-center justify-center  ">
                {/*  Previous Statement  */}
                <h2 className="text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-4xl md:leading-none mb-5">Join Group</h2>
                <div className="mt-8 md:mt-0 md:ml-4 w-[50%]">
                    <div className="panel overflow-hidden rounded-lg shadow-lg">
                        <div className="items-center justify-between">
                            <div>
                                <div className="flex w-full justify-between">
                                    <div className="text-2xl font-bold">{group?.name}</div>
                                </div>

                                <div className="text-white-dark flex">{group?.description}</div>

                                <div className="text-grey-400 flex items-center gap-2 mt-5">
                                    <b>Starts:</b> {dayjs(group?.start_date).format('ddd, DD MMM, YYYY')}
                                </div>
                                <div className="text-grey-400 flex items-center gap-2">
                                    <IconArrowForward className="text-danger opacity-40 w-6 h-6" /> <b>Ends:</b> {dayjs(group?.end_date).format('ddd, DD MMM, YYYY')}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 h-1 rounded-full m-4"></div>
                        <div className="relative">
                            <div>
                                <div className="text-sm text-gray-600 flex items-center gap-1 w-full">
                                    President : <b>{group?.president?.full_name}</b>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-white-dark mt-4">
                                <div className="flex items-center">
                                    <IconMenuUsers className="" />
                                    <div className="font-semibold text-sm ml-2">{group?.members?.length}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="font-semibold text-sm ml-2">Active</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleJoinGroup} className="btn btn-success mt-5 w-full text-xl font-bold gap-2">
                        <IconMenuUsers /> Join Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinGroup;
