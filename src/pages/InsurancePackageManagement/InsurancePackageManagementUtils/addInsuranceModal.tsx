import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import IconX from '../../../components/Icon/IconX';

interface AddInsurancePackageProps {
    viewModal: boolean;
    setViewModal: (value: boolean) => void;
}

const AddInsurancePackage = ({ viewModal, setViewModal }: AddInsurancePackageProps) => {
    const [Imgsrc, setImageSrc] = useState('');
    const contractStatus = 'active';
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    // const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    //     setImages(imageList as never[]);
    //     console.log(imageList, addUpdateIndex);
    // };

    return (
        <Transition appear show={viewModal} as={Fragment}>
            <Dialog
                as="div"
                open={viewModal}
                onClose={() => {
                    setViewModal(false), setImages([]);
                }}
            >
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black bg-[#ecf8ec]">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h1 className="text-2xl font-bold mb-4">Add Insurance Package</h1>
                                    <button
                                        type="button"
                                        className="text-white-dark hover:text-dark"
                                        onClick={() => {
                                            setViewModal(false);
                                            setImages([]);
                                        }}
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    {/* Contract Details Section */}

                                    {/* <div className="panel" id="single_file">
                                        <div className="mb-5">
                                            <div className="custom-file-container" data-upload-id="packImage">
                                                <label className="custom-file-container__custom-file"></label>
                                                {images.length === 0 ? <img src="/assets/images/image.png" className="max-w-sm  m-auto" alt="" /> : ''}

                                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                        <div className="upload__image-wrapper">
                                                            {imageList.map((image, index) => (
                                                                <div key={index} className="custom-file-container__image-preview relative">
                                                                    <img src={image.dataURL} alt="img" className="m-auto" />
                                                                </div>
                                                            ))}
                                                            &nbsp;
                                                            <div className="flex justify-between">
                                                                <button className="custom-file-container__custom-file__custom-file-control mt-2 btn btn-success" onClick={onImageUpload}>
                                                                    {images.length === 0 ? 'Choose Image...' : 'Change Image...'}
                                                                </button>
                                                                {images.length > 0 ? (
                                                                    <button
                                                                        type="button"
                                                                        className="custom-file-container__image-clear btn btn-danger gap-1 rounded-full"
                                                                        title="Clear Image"
                                                                        onClick={() => {
                                                                            setImages([]);
                                                                        }}
                                                                    >
                                                                        <IconTrash />
                                                                    </button>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </ImageUploading>
                                            </div>
                                        </div>
                                    </div> */}

                                    <form>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="groupName" className="text-gray-600">
                                                Package Name:
                                            </label>
                                            <input type="text" id="groupName" className="font-semibold border border-gray-300 rounded p-1" placeholder="Enter Package Name" />
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="description" className="text-gray-600">
                                                Description:
                                            </label>
                                            <textarea id="description" className="font-semibold border border-gray-300 rounded p-1" placeholder="Enter Package Description" />
                                        </div>
                                        <div className="text-xs p-1 font-semibold text-gray-800 mb-3 mt-5 w-full bg-white-light">
                                            <p>Benefits</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="deathMember" className="text-gray-600">
                                                Death (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="deathSpouse" className="text-gray-600">
                                                Death (Spouse):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="nominatedLives" className="text-gray-600">
                                                2 nominated lives (Each):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="criticalIllness" className="text-gray-600">
                                                Critical Illness (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="permanentDisability" className="text-gray-600">
                                                Permanent Disability (Member):
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-xs p-1 font-semibold text-gray-800 mb-3 mt-5 w-full bg-white-light">
                                            <p>Payment Terms</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="monthlyPremium" className="text-gray-600">
                                                Monthly Premium :
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-2 mt-2">
                                            <label htmlFor="annualPremium" className="text-gray-600">
                                                Annual Premium :
                                            </label>
                                            <div className="flex">
                                                <CurrencyInput
                                                    id="money"
                                                    name="money"
                                                    prefix="GH₵ "
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => console.log(value, name)}
                                                    placeholder="Enter amount"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setViewModal(false)}>
                                            Close
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setViewModal(false)}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddInsurancePackage;
