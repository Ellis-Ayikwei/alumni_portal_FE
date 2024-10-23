import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import IconSave from '../../components/Icon/IconSave';
import IconTrash from '../../components/Icon/IconTrash';
import IconX from '../../components/Icon/IconX';
import { setPageTitle } from '../../store/themeConfigSlice';
import AddNewBeneficiary from './MyAlumniGroupUtils/AddNewBeneficiary';
import AddNewGroupMember from './MyAlumniGroupUtils/AddNewGroupMember';

const MyBeneficiaries = () => {
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
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>MyGroups</span>
                </li>
            </ul>
            <div className="flex items-center lg:justify-between flex-wrap gap-4 mb-6">
                <Link to="/apps/invoice/edit" className="btn btn-danger gap-2">
                    <IconArrowBackward />
                    Back
                </Link>
                <div className="flex !gap-2">
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
            <div className="panel px-2 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">My Beneficiaries</h5>
                </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                <div className="grid gap-4 w-full ">
                    <div className="h-full w-full mb-4">
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
            </div>

            <AddNewGroupMember AddUserModal={AddUserModal} setAddUserModal={setAddUserModal} />
            <AddNewBeneficiary AddUserModal={AddNewBeneficiaryModal} setAddUserModal={setAddNewBeneficiaryModal} />
        </div>
    );
};

export default MyBeneficiaries;
