import { faCalendarTimes, faCheckCircle, faLock, faQuestionCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const renderStatus = (status: string) => {
    switch (status) {
        case 'ACTIVE':
            return (
                <span className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-5 w-5" />
                    <span className="ml-2 text-green-500">Active</span>
                </span>
            );
        case 'LOCKED':
            return (
                <span className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faLock} className="text-yellow-500 h-5 w-5" />
                    <span className="ml-2 text-yellow-500">Locked</span>
                </span>
            );
        case 'EXPIRED':
            return (
                <span className="flex items-center bg-red-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCalendarTimes} className="text-red-500 h-5 w-5" />
                    <span className="ml-2 text-red-500">Expired</span>
                </span>
            );
        case 'TERMINATED':
            return (
                <span className="flex items-center bg-red-100 px-2 py-1 rounded-full">
                    <FontAwesomeIcon icon={faTrash} className="text-red-500 h-5 w-5" />
                    <span className="ml-2 text-red-500">Terminated</span>
                </span>
            );
        default:
            return (
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 h-5 w-5" />
                    <span className="ml-2 text-gray-500">Unknown</span>
                </span>
            );
    }
};