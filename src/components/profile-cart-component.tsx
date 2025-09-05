import { AtSymbolIcon, KeyIcon, MapPinIcon, PencilSquareIcon, PhoneIcon, TrashIcon, UserIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { defaultAddress, useUser, type UserAddress } from "../queries/queryHooks";
import Modal from 'react-modal';
import { useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form'

Modal.setAppElement('#root')

const modalStyles: Modal.Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        backdropFilter: "blur(20px)"
    },
    content: {
        top: '50%',
        left: '50%',
        width: '50vw',
        height: 'fit-content',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--background)',
        borderRadius: '1.5rem',
        padding: '2rem'
    },
};

const deleteModalStyles: Modal.Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        backdropFilter: "blur(20px)"
    },
    content: {
        top: '50%',
        left: '50%',
        width: 'fit-content',
        height: 'fit-content',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--background)',
        borderRadius: '1.5rem',
        padding: '2rem'
    },
};

type Inputs = {
    id: number,
    city: string,
    street: string,
    building: number,
    floor: number,
    apartment: number,
    entrance: number,
}

export default function ProfileCartComponent() {
    const { t } = useTranslation();
    const tabName = window.location.pathname;
    const { data, isLoading } = useUser();
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [editedAddress, setEditedAddress] = useState<UserAddress>(defaultAddress());

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        console.log(editedAddress);

        const tmp: UserAddress = {
            id: -1,
            city: "",
            street: "",
            building: -1,
            floor: -1,
            apartment: -1,
            entrance: -1,
        }
        setEditedAddress(tmp);
        setIsOpen(false);
    }

    return (
        <div className="flex justify-center font-[Montserrat] font-semibold min-h-[100vh]">
            {
                isLoading ?
                    <div className="">Loading...</div>
                    : <div className="">

                        <Modal isOpen={deleteModalIsOpen}
                            closeTimeoutMS={200}
                            onRequestClose={() => setDeleteModalIsOpen(false)}
                            style={deleteModalStyles}>
                            <h1 className="text-2xl font-[Montserrat] font-semibold text-center">
                                Are you sure?
                            </h1>
                        </Modal>
                        <Modal
                            closeTimeoutMS={200}
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={modalStyles}>
                            <button onClick={closeModal} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                                <XMarkIcon className='h-full size-7' />
                            </button>
                            <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
                                {
                                    modalEdit ?
                                        <div className="">Edit</div>
                                        :
                                        <div className="">Add</div>
                                }
                            </h1>
                            <AddressForm address={editedAddress} isInEditMode={modalEdit} />
                        </Modal>
                    </div>
            }

            <div className="w-[88rem] p-(--default-padding)  pt-(--navbar-height) mt-(--default-padding) pb-(--default-padding)">
                <h1 className='text-5xl text-center mb-[1em]'>Profile</h1>
                <div className="flex ">
                    <div className="flex-1 flex justify-start">
                        <div className="flex flex-col gap-y-4 mt-[4.25rem]">
                            <Link to="/profile" className={clsx('h-[51px] w-[150px] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center',
                                {
                                    "bg-(--foreground) text-(--background)": tabName === '/profile',
                                    "bg-(--background) text-(--foreground)": tabName === '/cart',
                                })}>Text 1</Link>
                            <Link to="/cart" className={clsx('h-[51px] w-[150px] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center',
                                {
                                    "bg-(--foreground) text-(--background)": tabName === '/cart',
                                    "bg-(--background) text-(--foreground)": tabName === '/profile',
                                })}>Text 1</Link>
                            <Link to="/" className='h-[51px] w-[150px] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--foreground)'>Text 1</Link>
                        </div>
                    </div>
                    <div className="flex-3">
                        {
                            isLoading ?
                                <div className="">Loading...</div>
                                :
                                <div className="">
                                    {
                                        tabName === '/profile' ?
                                            <div className="">
                                                <form action="" method="post" className="grid gap-y-4">
                                                    <h2>Personal data</h2>
                                                    <div className='text-(--foreground) font-[Montserrat]'>
                                                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                                                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                                            <div className="mr-3 ml-3">
                                                                <UserIcon className='h-full size-6' />
                                                            </div>
                                                            <input id="username" type="text" name="username" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3"
                                                                value={data!.username} />
                                                        </div>
                                                    </div>
                                                    <div className='text-(--foreground) font-[Montserrat]'>
                                                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                                                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                                            <div className="mr-3 ml-3">
                                                                <KeyIcon className='h-full size-6' />
                                                            </div>
                                                            <input id="password" type="password" name="password" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                                                        </div>
                                                    </div>
                                                    <div className='text-(--foreground) font-[Montserrat]'>
                                                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                                                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                                            <div className="mr-3 ml-3">
                                                                <PhoneIcon className='h-full size-6' />
                                                            </div>
                                                            <input id="phone" type="text" name="phone" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3"
                                                                value={data!.phone} />
                                                        </div>
                                                    </div>
                                                    <div className='text-(--foreground) font-[Montserrat]'>
                                                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                                                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                                            <div className="mr-3 ml-3">
                                                                <AtSymbolIcon className='h-full size-6' />
                                                            </div>
                                                            <input id="email" type="text" name="email" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3"
                                                                value={data!.email} />
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="mt-(--default-padding)">
                                                    <div className="flex justify-between items-center">
                                                        <div className="">
                                                            <span className="block text-lg">Big text</span>
                                                            <span className="block text-sm/3 font-normal">Small text text text</span>
                                                        </div>
                                                        <button onClick={() => { setModalEdit(false); openModal() }} className="h-[51px] w-[33%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)">
                                                            Text
                                                        </button>
                                                    </div>
                                                    <div className="mt-[1rem] font-[Montserrat]">
                                                        {
                                                            data?.addresses.map(address => (
                                                                <div key={address.street} className="flex items-center">
                                                                    <div className="mr-3">
                                                                        <MapPinIcon className='h-full size-6' />
                                                                    </div>
                                                                    <div className="w-full">
                                                                        {address.city} {address.street} {address.building} {address.entrance} {address.floor} {address.apartment}
                                                                    </div>
                                                                    <div className="flex gap-x-2">
                                                                        <button onClick={() => { setEditedAddress(address); setModalEdit(true); openModal() }}>
                                                                            <PencilSquareIcon className='h-full size-6 cursor-pointer' />
                                                                        </button>
                                                                        <button onClick={() => { setDeleteModalIsOpen(true) }}>
                                                                            <TrashIcon className='h-full size-6 cursor-pointer' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            :
                                            <div className=""></div>
                                    }
                                </div>
                        }


                    </div>
                </div>
            </div>
        </div>
    );



}

function AddressForm({ address, isInEditMode }:
    {
        address: UserAddress;
        isInEditMode: boolean
    }) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (isInEditMode) {
            // ... PUT
        } else {
            // ... POST
        }
        address = defaultAddress();
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-5 gap-x-5" style={{
                gridTemplate: `
                                                    'a1 a1 a1 a1'
                                                    'a2 a2 a2 a2'
                                                    'a3 a4 a5 a6'
                                                    `

            }}>
                <div className="" style={{ gridArea: 'a1' }}>
                    <div className='text-(--foreground) font-[Montserrat]'>
                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">

                            <input key={address.floor} id="city" type="text" {...register("city")} placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none p-3"
                                defaultValue={address.city} />
                        </div>
                    </div>
                </div>
                <div className="" style={{ gridArea: 'a2' }}>
                    <div className='text-(--foreground) font-[Montserrat]'>
                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                            <input id="username" type="text" {...register("street")} placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none p-3"
                                defaultValue={address.street} />
                        </div>
                    </div>
                </div>
                <div className="" style={{ gridArea: 'a3' }}>
                    <div className='text-(--foreground) font-[Montserrat]'>
                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                            <input id="username" type="text" {...register("building")} placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none p-3"
                                defaultValue={address.building} />
                        </div>
                    </div>
                </div>
                <div className="" style={{ gridArea: 'a4' }}>
                    <div className='text-(--foreground) font-[Montserrat]'>
                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                            <input id="username" type="text" {...register("floor")} placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none p-3"
                                defaultValue={address.floor} />
                        </div>
                    </div>
                </div>
                <div className="" style={{ gridArea: 'a5' }}>
                    <div className='text-(--foreground) font-[Montserrat]'>
                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                            <input id="username" type="text" {...register("entrance")} placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none p-3"
                                defaultValue={address.entrance} />
                        </div>
                    </div>
                </div>
                <div className="" style={{ gridArea: 'a6' }}>
                    <div className='text-(--foreground) font-[Montserrat]'>
                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                            <input id="username" type="text" {...register("apartment")} placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none p-3"
                                defaultValue={address.apartment} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="font-[Montserrat] font-semibold text-2xl mt-9 h-[51px] w-[33%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)">Text</button>
            </div>
        </form>
    );
}