import { faFileContract, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSwr from 'swr';
import Dropdown from '../../../../components/Dropdown';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import IconArrowLeft from '../../../../components/Icon/IconArrowLeft';
import IconEdit from '../../../../components/Icon/IconEdit';
import IconHorizontalDots from '../../../../components/Icon/IconHorizontalDots';
import IconLock from '../../../../components/Icon/IconLock';
import fetcher from '../../../../helper/fetcher';
import { renderStatus } from '../../../../helper/renderStatus';
import { IRootState } from '../../../../store';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ShowBeneficiaries from './showBeneficiaries';
import ViewAmendment from './viewAmendment';
import handleMultiContractLocking from '../multiContractLocking';
import handleMultiContractActivation from '../multiContractActivation';

const ContractPreview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { contract_id } = useParams();
    const { allContracts, error, loading } = useSelector((state: IRootState) => state.allContacts);

    const { data: all_members, error: all_members_error, isLoading: all_members_loadng } = useSwr(`/group_members`, fetcher);
    const group_members = all_members?.filter((group_member: any) => group_member.contract_id == contract_id);
    const [showBeneficiariesModal, setShowBeneficiariesModal] = useState<boolean>(false);
    const [benefactorIds, setBenefactorIds] = useState<{ userId: string; memberId: string }>({ userId: '', memberId: '' });
    const contract = Object.values(allContracts).find((contract: any) => contract?.id == contract_id);

    const [showAmendmentModal, setShowAmendmentModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setPageTitle('Group Preview'));
    });

    const handleVewBeneficiaries = (user_id: string, member_id: string) => {
        console.log('benefactorIds from the edit..............................................', benefactorIds);
        setBenefactorIds({ userId: user_id, memberId: member_id });
        setShowBeneficiariesModal(true);
    };

    useEffect(() => {
        console.log('all contracts', allContracts);
    }, [allContracts]);

    return (
        <div>
            <div className="flex items-center lg:justify-between  flex-wrap gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="btn btn-danger gap-2">
                    <IconArrowBackward />
                    Back
                </button>
                <div className="flex items-center gap-2">
                   {contract?.status === "ACTIVE"  ? <button onClick={() => handleMultiContractLocking([{ id: contract?.id }], dispatch)} className="btn btn-outline-warning gap-2">
                        <IconLock />
                        Lock{' '}
                    </button>
                    :
                    <button onClick={() => handleMultiContractActivation([{ id: contract?.id }], dispatch)} className="btn btn-outline-warning gap-2">
                        <FontAwesomeIcon icon={faUnlockAlt} />
                        Make Active {' '}
                    </button>}
                    <Link to={`/member/groups/edit/${contract?.id}`} className="btn btn-success gap-2">
                        <IconEdit />
                        Amend
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="panel lg:col-span-2">
                    <div className="flex justify-between flex-wrap gap-4 px-4">
                        <div>
                            <div className="text-2xl font-semibold uppercase">{contract?.name}</div>
                            <div className="text-sm font-semibold uppercase text-white-dark">id: {contract?.id}</div>
                        </div>
                        <div className="shrink-0">
                            <FontAwesomeIcon icon={faFileContract} className="text-5xl ltr:ml-auto rtl:mr-auto text-green-300" />
                        </div>
                    </div>
                    <div className="ltr:text-right rtl:text-left px-4">
                        <div className="space-y-1 mt-6 text-white-dark">
                            <div>{contract?.school}</div>
                        </div>
                    </div>
                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Name</span>
                            <span className="block text-base dark:text-gray-300">{contract?.name}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Group</span>
                            <button className="block text-base dark:text-gray-300 underline underline-offset-2" onClick={() => navigate(`/member/groups/preview/${contract?.group.id}`)}>
                                {contract?.group.name}
                            </button>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Expiry Date</span>
                            <span className="block text-base dark:text-gray-300">{dayjs(contract?.expiry_date).format('DD MMM YYYY')}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Date Effective</span>
                            <span className="block text-base dark:text-gray-300">{dayjs(contract?.date_effective).format('DD MMM YYYY')}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Signed</span>
                            <span className="block text-base dark:text-gray-300">{contract?.is_signed ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Signed Date</span>
                            <span className="block text-base dark:text-gray-300">{contract?.signed_date ? dayjs(contract?.signed_date).format('DD MMM YYYY') : 'N/A'}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Status</span>
                            <span className="block text-base dark:text-gray-300 w-fit">{renderStatus(contract?.status)}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Underwriter ID</span>
                            <span className="block text-base dark:text-gray-300">{contract?.underwriter?.full_name}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Insurance Package ID</span>
                            <span className="block text-base dark:text-gray-300">{contract?.insurance_package.name}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Description</span>
                            <span className="block text-base dark:text-gray-300">{contract?.description}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-base font-bold dark:text-white">Policy Number</span>
                            <span className="block text-base dark:text-gray-300">{contract?.policy_number}</span>
                        </div>
                    </div>

                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                    <div className="grid xl:grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="panel h-full w-full">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Contract Members</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">Member Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Beneficiaries</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contract?.contract_members?.map((member: any) => (
                                            <tr key={member.id} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex items-center">
                                                        <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                                        <span className="whitespace-nowrap">
                                                            {member?.user?.first_name} {member?.user?.last_name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="text-primary">{member?.user?.email}</td>
                                                <td>{member?.user?.phone}</td>
                                                <td>
                                                    <p className="ltr:ml-auto rtl:mr-auto text-secondary">
                                                        <button
                                                            type="button"
                                                            className="text-primary font-semibold hover:underline group"
                                                            onClick={() => handleVewBeneficiaries(member.user_id, member.id)}
                                                        >
                                                            View beneficiaries{' '}
                                                            <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                                                        </button>
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel h-full lg:col-span-1">
                    <div className="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg">Amendments</h5>
                        <div className="dropdown">
                            <Dropdown placement={'bottom-end'} button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}>
                                <ul>
                                    <li>
                                        <button type="button">View Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Edit Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Mark as Done</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div>
                        <div className="space-y-6 panel">
                            <div className="flex" onClick={() => setShowAmendmentModal(true)}>
                                <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">
                                    {' '}
                                    <IconEdit />
                                </span>
                                <div className="px-3 flex-1">
                                    <div>Shaun Park</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">shaun peeks</div>
                                </div>
                                <div className="text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">
                                    <span>{renderStatus('APPROVED')}</span>
                                    <span className="text-xs text-white-dark italic">by soso and so</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ViewAmendment showModal={showAmendmentModal} setShowModal={setShowAmendmentModal} />
            {benefactorIds && <ShowBeneficiaries showBeneficiariesModal={showBeneficiariesModal} setShowBeneficiariesModal={setShowBeneficiariesModal} benefactorIds={benefactorIds} edit={false} />}
        </div>
    );
};

export default ContractPreview;
