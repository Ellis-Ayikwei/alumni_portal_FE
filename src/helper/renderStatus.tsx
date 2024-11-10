import { faCheckCircle, faLock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconX from '../components/Icon/IconX';

export const renderStatus = (status: string) => {
    switch (status) {
        case 'ACTIVATED':
            return (
                <span className="flex items-center text-xs bg-green-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4" />
                    <span className="ml-1 text-green-500">Active</span>
                </span>
            );
        case 'ACTIVE':
            return (
                <span className="flex items-center text-xs bg-green-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4" />
                    <span className="ml-1 text-green-500">Active</span>
                </span>
            );
        case 'LOCKED':
            return (
                <span className="flex items-center text-xs bg-yellow-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faLock} className="text-yellow-500 h-4 w-4" />
                    <span className="ml-1 text-yellow-500">Locked</span>
                </span>
            );
        case 'DEACTIVATED':
            return (
                <span className="flex items-center text-xs bg-red-100 px-2 py-1 rounded-full">
                    <IconX className="text-red-500 h-4 w-4" />
                    <span className="ml-1 text-red-500">Deactivated</span>
                </span>
            );
        case 'INACTIVE':
            return (
                <span className="flex items-center text-xs bg-red-100 px-2 py-1 rounded-full">
                    <IconX className="text-red-500 h-4 w-4" />
                    <span className="ml-1 text-red-500">Inactive</span>
                </span>
            );
        case 'PENDING':
            return (
                <span className="flex items-center text-xs bg-blue-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-500 h-4 w-4" />
                    <span className="ml-1 text-blue-500">Pending</span>
                </span>
            );
        case 'APPROVED':
            return (
                <span className="flex items-center text-xs bg-green-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4" />
                    <span className="ml-1 text-green-500">Approved</span>
                </span>
            );
        case 'REJECTED':
            return (
                <span className="flex items-center text-xs bg-red-100 px-2 py-1 rounded-full">
                    <IconX className="text-red-500 h-4 w-4" />
                    <span className="ml-1 text-red-500">Rejected</span>
                </span>
            );
        default:
            return (
                <span className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 h-4 w-4" />
                    <span className="ml-1 text-gray-500">Unknown</span>
                </span>
            );
    }
};

