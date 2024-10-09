import Tippy from '@tippyjs/react';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';
import Dropdown from '../../components/Dropdown';
import IconBell from '../../components/Icon/IconBell';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconEye from '../../components/Icon/IconEye';
import IconFile from '../../components/Icon/IconFile';
import IconPencil from '../../components/Icon/IconPencil';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconRefresh from '../../components/Icon/IconRefresh';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { GetUserData } from '../../store/usersSlice';
import SaveNewUser from './userManagementUtils/addNewUser';

const col = ['username', 'email', 'phone', 'address', 'created_at', 'dob', 'role', 'azure_id', 'id'];

const UserManagement = () => {
    const dispatch = useDispatch();
    const [usersdata, setUsersData] = useState<any>([]);
    const usersData = useSelector((state: IRootState) => state.usersdata.usersData);
    const userDataIsLoading = useSelector((state: IRootState) => state.usersdata.loading);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // First effect for fetching data (runs only once on mount)
    useEffect(() => {
        dispatch(setPageTitle('Multiple Tables'));
        dispatch(GetUserData() as any);
    }, [dispatch]);

    // Second effect for updating initialRecords2 when usersData changes
    useEffect(() => {
        if (usersData) {
            setInitialRecords2(sortBy(usersData, 'first_name'));
        }
    }, [usersData]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const navigate = useNavigate();

    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(sortBy(usersdata, 'first_name'));
    const [recordsData2, setRecordsData2] = useState(initialRecords2);
    const rowData = initialRecords2;
    const [search2, setSearch2] = useState('');
    const [sortStatus2, setSortStatus2] = useState<DataTableSortStatus>({
        columnAccessor: 'first_name',
        direction: 'asc',
    });

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize2;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

    useEffect(() => {
        setInitialRecords2(() => {
            return usersdata.filter((item: any) => {
                return (
                    item.first_name.toLowerCase().includes(search2.toLowerCase()) ||
                    item.company.toLowerCase().includes(search2.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search2.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search2.toLowerCase()) ||
                    item.email.toLowerCase().includes(search2.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search2.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search2]);

    useEffect(() => {
        const data2 = sortBy(initialRecords2, sortStatus2.columnAccessor);
        setInitialRecords2(sortStatus2.direction === 'desc' ? data2.reverse() : data2);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus2]);

    const getActivityColor = (accessor: string | boolean) => {
        const colors = ['success', 'danger'];
        if (accessor === true) {
            return colors[0];
        } else if (accessor === false || accessor === 'disapproved') {
            return colors[1];
        } else {
            return '';
        }
    };

    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
    });

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const header = ['Id', 'Firstname', 'Lastname', 'Email', 'Adress', 'Start Date', 'Phone', 'Role', 'id', 'Dob', 'azure_id'];


    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData2,
            },
        });
    }

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = rowData;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            // eslint-disable-next-line array-callback-return
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                rowhtml += '<tr>';
                // eslint-disable-next-line array-callback-return
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const [AddUserModal, setAddUserModal] = useState<any>(false);

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const editUser = (user: any = null) => {
        navigate('/userAccountSetting');
    };

    const deleteUser = (user: any = null) => {
        showMessage('User has been deleted successfully.');
    };

    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [hideCols, setHideCols] = useState<any>(['id', 'azure_id']);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'username', title: 'Username', sortable: true },
        { accessor: 'email', title: 'Email', sortable: true },
        { accessor: 'phone', title: 'Phone No.', sortable: true },
        { accessor: 'address', title: 'Address', sortable: true },
        {
            accessor: 'created_at',
            title: 'Date joined',
            sortable: true,
        },
        { accessor: 'dob', title: 'DOB', sortable: true },
        { accessor: 'role', title: 'Role', sortable: true },
        { accessor: 'azure_id', title: 'Azure_id', sortable: true },
        { accessor: 'id', title: 'User id', sortable: true },
    ];

    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div>

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">User Management</h5>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="flex items-center flex-wrap">
                        <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1 ">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            CSV
                        </button>
                        <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            TXT
                        </button>
                        <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            EXCEL
                        </button>
                        <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                            PRINT
                        </button>
                    </div>
                    <div className="dropdown">
                        <Dropdown
                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            button={
                                <>
                                    <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                    <IconCaretDown className="w-5 h-5" />
                                </>
                            }
                        >
                            <ul className="!min-w-[140px]">
                                {cols.map((col, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="flex flex-col"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <div className="flex items-center px-4 py-1">
                                                <label className="cursor-pointer mb-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={!hideCols.includes(col.accessor)}
                                                        className="form-checkbox"
                                                        defaultValue={col.accessor}
                                                        onChange={(event: any) => {
                                                            setHideCols(event.target.value);
                                                            showHideColumns(col.accessor, event.target.checked);
                                                        }}
                                                    />
                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                </label>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Dropdown>
                    </div>

                    <div>
                        <button type="button" className="btn btn-dark w-8 h-8 p-0 rounded-full" onClick={() => dispatch(GetUserData() as any)}>
                            <IconRefresh className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search2} onChange={(e) => setSearch2(e.target.value)} />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setAddUserModal(true);
                        }}
                    >
                        <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                        Add User
                    </button>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData2}
                        columns={[
                            {
                                accessor: 'first_name',
                                title: 'Name',
                                sortable: true,
                                render: ({ first_name, last_name, id }) => (
                                    <div className="flex items-center w-max">
                                        <img className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                        <div>{first_name + ' ' + last_name}</div>
                                    </div>
                                ),
                            },
                            { accessor: 'username', title: 'Username', sortable: true, hidden: hideCols.includes('username') },
                            { accessor: 'email', title: 'Email', sortable: true, hidden: hideCols.includes('email') },
                            { accessor: 'phone', title: 'Phone No.', sortable: true, hidden: hideCols.includes('phone') },
                            { accessor: 'address', title: 'Address', sortable: true, hidden: hideCols.includes('address') },
                            {
                                accessor: 'dob',
                                title: 'DOB',
                                sortable: true,
                                hidden: hideCols.includes('dob'),
                                render: ({ dob }) => {
                                    const validDob = dob as string | number | Date;

                                    return <div>{formatDate(validDob)}</div>;
                                },
                            },
                            {
                                accessor: 'is_active',
                                title: 'Active',
                                sortable: true,
                                hidden: hideCols.includes('Active'),
                                render: ({ is_active }) => <span className={`badge bg-${getActivityColor(is_active)}`}>{is_active ? 'Active' : 'Inactive'}</span>,
                            },
                            {
                                accessor: 'created_at',
                                title: 'Date joined',
                                sortable: true,
                                hidden: hideCols.includes('created_at'),
                                render: ({ created_at }) => {
                                    const validDob = created_at as string | number | Date;

                                    return <div>{formatDate(created_at)}</div>;
                                },
                            },
                            { accessor: 'role', title: 'Role', sortable: true, hidden: hideCols.includes('role') },
                            { accessor: 'azure_id', title: 'Azure_id', sortable: true, hidden: hideCols.includes('azure_id') },
                            { accessor: 'id', title: 'User id', sortable: true, hidden: hideCols.includes('id') },

                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <NavLink to="/profile" className="flex hover:text-primary">
                                            <IconEye />
                                        </NavLink>
                                        <Tippy content="Edit">
                                            <button type="button" onClick={() => editUser()}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Delete">
                                            <button type="button" onClick={(record) => deleteUser(record)}>
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords2.length}
                        recordsPerPage={pageSize2}
                        page={page2}
                        onPageChange={(p) => setPage2(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize2}
                        sortStatus={sortStatus2}
                        onSortStatusChange={setSortStatus2}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
            <SaveNewUser AddUserModal={AddUserModal} setAddUserModal={setAddUserModal} />
        </div>
    );
};

export default UserManagement;
