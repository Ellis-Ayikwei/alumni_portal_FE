import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import IconPencil from '../../../components/Icon/IconPencil';
import IconSave from '../../../components/Icon/IconSave';
import IconSend from '../../../components/Icon/IconSend';
import IconShare from '../../../components/Icon/IconShare';
import IconTrash from '../../../components/Icon/IconTrash';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import IconX from '../../../components/Icon/IconX';
import { setPageTitle } from '../../../store/themeConfigSlice';
import AddNewBeneficiary from './AddNewBeneficiary';
import AddNewGroupMember from './AddNewGroupMember';
import showMessage from './showMessage';

const MemberGroupEdit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Edit'));
    });
    const currencyList = ['USD - US Dollar', 'GBP - British Pound', 'IDR - Indonesian Rupiah', 'INR - Indian Rupee', 'BRL - Brazilian Real', 'EUR - Germany (Euro)', 'TRY - Turkish Lira'];
    const [tax, setTax] = useState<any>(0);
    const [discount, setDiscount] = useState<any>(0);
    const [shippingCharge, setShippingCharge] = useState<any>(0);
    const [paymentMethod, setPaymentMethod] = useState<any>('bank');

    const [items, setItems] = useState<any>([
        {
            id: 1,
            title: 'Calendar App Customization',
            description: 'Make Calendar App Dynamic',
            quantity: 2,
            amount: 120,
            isTax: false,
        },
        {
            id: 2,
            title: 'Chat App Customization',
            description: 'Customized Chat Application to resolve some Bug Fixes',
            quantity: 1,
            amount: 25,
            isTax: false,
        },
    ]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD - US Dollar');
    const [params, setParams] = useState<any>({
        title: 'Tailwind',
        invoiceNo: '#0001',
        to: {
            name: 'Jesse Cory',
            email: 'redq@company.com',
            address: '405 Mulberry Rd. Mc Grady, NC, 28649',
            phone: '(128) 666 070',
        },
        invoiceDate: '',
        dueDate: '',
        bankInfo: {
            no: '1234567890',
            name: 'Bank of America',
            swiftCode: 'VS70134',
            country: 'United States',
            ibanNo: 'K456G',
        },
        notes: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!',
    });
    useEffect(() => {
        let dt: Date = new Date();
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        let date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        setParams({
            ...params,
            invoiceDate: dt.getFullYear() + '-' + month + '-' + date,
            dueDate: dt.getFullYear() + '-' + month + '-' + date,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;

        setItems([...items, { id: maxId + 1, title: '', description: '', rate: 0, quantity: 0, amount: 0 }]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeQuantityPrice = (type: string, value: string, id: number) => {
        // const list = items;
        const item = items.find((d: any) => d.id === id);
        if (type === 'quantity') {
            item.quantity = Number(value);
        }
        if (type === 'price') {
            item.amount = Number(value);
        }
        setItems([...items]);
    };

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

    const [AddUserModal, setAddUserModal] = useState(false);
    const [AddNewBeneficiaryModal, setAddNewBeneficiaryModal] = useState(false);
    const [ActivateSave, setActivateSave] = useState(false);

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
                    <button className={`btn ${ActivateSave ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-300'} flex items-center gap-2 p-2 rounded`}>
                        <IconSave />
                        Save
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
                        <div className="space-y-1 mt-6 text-gray-500 dark:text-gray-400">
                            <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
                            <div>vristo@gmail.com</div>
                            <div>+1 (070) 123-4567</div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full lg:max-w-fit">
                        <div className="flex items-center">
                            <label htmlFor="Alumni Group Name" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                Alumni Group Name
                            </label>
                            <input id="number" type="text" name="alumni-group-name" className="form-input lg:w-[250px] w-2/3" placeholder="#8801" defaultValue={'Presec Year 2015'} />
                        </div>
                        <div className="flex items-center mt-2">
                            <label htmlFor="Alumni Group Name" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                Group Description
                            </label>
                            {/* <input id="number" type="textarea" name="alumni-group-description" className="form-input lg:w-[250px] w-2/3" placeholder="#8801" defaultValue={'group descrition'} /> */}
                            <textarea id="notes" name="alumni-group-description" className="form-textarea min-h-[100px]" placeholder="alumni-group-description" defaultValue={params.notes}></textarea>
                        </div>
                    </div>
                </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap p-5">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>President:</div>
                            <div className="text-black dark:text-white font-semibold">John Doe</div>
                            <div>405 Mulberry Rd. Mc Grady, NC, 28649</div>
                            <div>Johndoe@gmail.com</div>
                            <div>(128) 666 070</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Insurrance Package :</div>
                                <div>Alumni AlumniGroup1</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Issue Date :</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Start Date</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">End Date :</div>
                                <div>13 Sep 2022</div>
                            </div>
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Contract Name:</div>
                                <div className="whitespace-nowrap">Contract for devs</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Contract Id:</div>
                                <div>1234567890</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Contract state:</div>
                                <div>Signed</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Group Activity</div>
                                <div>Not Locked</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Country:</div>
                                <div>Ghana</div>
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
        </div>
    );
};

export default MemberGroupEdit;
