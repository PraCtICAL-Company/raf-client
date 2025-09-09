import { ArchiveBoxIcon, AtSymbolIcon, BanknotesIcon, BuildingLibraryIcon, ClockIcon, CreditCardIcon, DeviceTabletIcon, KeyIcon, MapPinIcon, PencilSquareIcon, PhoneIcon, TrashIcon, UserIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { defaultAddress, useUser, type UserAddress } from "../queries/queryHooks";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAtom } from "jotai";
import { cartAtom, type Cart } from "../state/atoms";
import CartItemQuantityInput from "./number-input";
import { totalPrice } from "../functions/cart";

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
        padding: '2rem',
        overflow: "hidden"
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
        minWidth: '33%',
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
    const tabName = window.location.pathname;

    const { t } = useTranslation();

    const { data, isLoading } = useUser();

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalEdit, setModalEdit] = useState<boolean>(false);

    const [activeAddress, setActiveAddress] = useState<UserAddress>(defaultAddress());

    const [cart, setCart] = useAtom<Cart>(cartAtom);
    const [cartTotal, setCartTotal] = useState<number>(0);

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setCartTotal(totalPrice(cart));
    }, []);

    // edit/add modal

    const openEditModal = (address: UserAddress): void => {
        setModalEdit(true);
        setActiveAddress(address);
        setModalIsOpen(true);
    }

    const openAddModal = (): void => {
        setModalEdit(false);
        setModalIsOpen(true);
    }

    const closeEditModal = (): void => {
        setModalIsOpen(false);
        setModalEdit(false);
        setActiveAddress(defaultAddress);
    }

    // const closeAddModal = (): void => {
    //     setModalIsOpen(false);
    //     setModalEdit(false);
    //     setActiveAddress(defaultAddress);
    // }

    // delete modal

    const openDeleteModal = (address: UserAddress): void => {
        setActiveAddress(address);
        setDeleteModalIsOpen(true);
    }

    const closeDeleteModal = (): void => {
        setDeleteModalIsOpen(false);
        setActiveAddress(defaultAddress);
    }

    const handleDelete = (): void => {
        // handling logic
    }

    return (
        <div className="flex justify-center font-[Montserrat] font-semibold min-h-[100vh]">
            {
                isLoading ?
                    <div className="">Loading...</div>
                    : <div className="">

                        <Modal isOpen={deleteModalIsOpen}
                            closeTimeoutMS={200}
                            onRequestClose={closeDeleteModal}
                            style={deleteModalStyles}>
                            <h1 className="text-2xl font-[Montserrat] font-semibold text-center">
                                Delete  {activeAddress.city} {activeAddress.street} {activeAddress.building} {activeAddress.entrance} {activeAddress.floor} {activeAddress.apartment}?
                            </h1>
                            <button onClick={closeDeleteModal} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                                <XMarkIcon className='h-full size-7' />
                            </button>
                            <div className="flex justify-center mt-(--default-padding) font-[Montserrat] font-semibold">
                                <button onClick={handleDelete} className="h-[51px] w-[33%] block cursor-pointer rounded-xl text-lg flex items-center justify-center text-(--background) bg-(--accent)">
                                    Text
                                </button>
                            </div>

                        </Modal>
                        <Modal
                            closeTimeoutMS={200}
                            isOpen={modalIsOpen}
                            onRequestClose={closeEditModal}
                            style={modalStyles}>
                            <button onClick={closeEditModal} className="absolute right-[2rem] top-[2rem] cursor-pointer">
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
                            <AddressForm address={activeAddress} isInEditMode={modalEdit} />
                        </Modal>
                    </div>
            }

            <div className="w-[88rem] p-(--default-padding)  pt-(--navbar-height) mt-(--default-padding) pb-(--default-padding)">
                <h1 className='text-5xl text-center mb-[1em]'>
                    {
                        tabName == '/profile' ?
                            "Profile" :
                            "Cart"
                    }
                </h1>
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
                                                                value={data!.username} readOnly />
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
                                                                value={data!.phone} readOnly />
                                                        </div>
                                                    </div>
                                                    <div className='text-(--foreground) font-[Montserrat]'>
                                                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                                                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                                            <div className="mr-3 ml-3">
                                                                <AtSymbolIcon className='h-full size-6' />
                                                            </div>
                                                            <input id="email" type="text" name="email" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3"
                                                                value={data!.email} readOnly />
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="mt-(--default-padding)">
                                                    <div className="flex justify-between items-center">
                                                        <div className="">
                                                            <span className="block text-lg">Big text</span>
                                                            <span className="block text-sm/3 font-normal">Small text text text</span>
                                                        </div>
                                                        <button onClick={() => { openAddModal() }} className="h-[51px] w-[33%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)">
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
                                                                        <button onClick={() => { openEditModal(address) }}>
                                                                            <PencilSquareIcon className='h-full size-6 cursor-pointer' />
                                                                        </button>
                                                                        <button onClick={() => { openDeleteModal(address) }}>
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
                                            <div className="flex">
                                                <div className="flex-1 grid gap-y-(--default-padding)">
                                                    {
                                                        cart.items.map(cartItem => (
                                                            <div key={cartItem.itemType.id} className={clsx("flex gap-x-5 items-start", {
                                                                "opacity-50 pointer-events-none": !cartItem.itemType.inStock
                                                            })}>
                                                                <div className="overflow-hidden bg-center bg-cover w-[200px] h-[200px] rounded-4xl" style={{ backgroundImage: `url(../../src/assets/${cartItem.itemType.imgUrl})` }}>
                                                                </div>
                                                                <div className="text-right min-w-[300px] h-full grid gap-y-2 relative">
                                                                    <div className="flex flex-col items-end">
                                                                        <h2 className="text-lg">{cartItem.itemType.title}</h2>
                                                                        {
                                                                            cartItem.itemType.inStock ?
                                                                                <div className="flex gap-x-2 items-center w-fit">
                                                                                    <ArchiveBoxIcon className='size-4' />
                                                                                    <span>In stock</span>
                                                                                </div>
                                                                                :
                                                                                <div className="flex gap-x-2 items-center w-fit">
                                                                                    <ClockIcon className='size-4' />
                                                                                    <span className='font-normal'>Out of stock</span>
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                    <div className="absolute right-[0] bottom-[0] flex flex-col items-end gap-y-3">
                                                                        <div className="">
                                                                            {
                                                                                cartItem.itemType.hotPrice ?
                                                                                    <div className="text-center">
                                                                                        <div className='text-xl line-through decoration-[2px]'>{cartItem.itemType.hotPrice.oldPrice}€</div>
                                                                                        <div className='text-3xl flex gap-x-3 underline decoration-[2px] items-center'>
                                                                                            <img src="../../src/assets/svg/icons/hot-price.svg" className='w-[30px]' />
                                                                                            {cartItem.itemType.hotPrice.newPrice}€
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <div className="text-3xl">{cartItem.itemType.priceInEuro}€</div>

                                                                            }
                                                                        </div>
                                                                        <CartItemQuantityInput cartItem={cartItem} min={1} max={99} onChange={() => {
                                                                            setCart(cart);
                                                                            setCartTotal(totalPrice(cart));
                                                                        }} />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="flex-1 flex justify-center">
                                                    <OrderComponent cartTotal={cartTotal} />
                                                </div>
                                            </div>

                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );



}

function OrderComponent({ cartTotal }: {
    cartTotal: number;
}) {
    const { t } = useTranslation();
    const [cart, setCart] = useAtom(cartAtom);
    const [message, setMessage] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CardOnline");
    const [commentModalIsOpen, setCommentModalIsOpen] = useState<boolean>(false)
    const [paymentMethodModalIsOpen, setPaymentMethodModalIsOpen] = useState<boolean>(false)

    const handleCommit = (): void => {
        console.log(paymentMethod);
        console.log(message);

        // let cartCopy = cart;
        // cartCopy.items = [];
        // setCart(cart);
    }

    return (
        <div className="">
            <Modal
                isOpen={commentModalIsOpen}
                closeTimeoutMS={200}
                style={modalStyles}
                onRequestClose={() => setCommentModalIsOpen(false)}
            >
                <button onClick={() => setCommentModalIsOpen(false)} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                    <XMarkIcon className='h-full size-7' />
                </button>
                <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
                    Details
                </h1>
                <div className="flex">
                    <div className="flex-1 flex items-center justify-center">
                        <img src="../../src/assets/png/delivery.png" alt="delivery" className="h-[200px]" />
                    </div>
                    <div className="flex-1">
                        <div className='text-(--foreground) font-[Montserrat]'>
                            <label className="block text-sm font-semibold">{t("homepage.contact_form.input3.label")}</label>
                            <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                <textarea onChange={(e) => setMessage(e.target.value)} id="message" name="message" placeholder={t("homepage.contact_form.input3.placeholder")} className="w-full outline-none p-3 resize-none h-[10em]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between font-[Montserrat] mt-[1rem]">
                    <div className="px-6 py-3 bg-(--accent) rounded-2xl font-semibold text-3xl text-(--background)">
                        Total:&nbsp;
                        <span className="underline decoration-[1.5px]">
                            {
                                cartTotal
                            }
                            €
                        </span>
                    </div>
                    <button onClick={() => setPaymentMethodModalIsOpen(true)} className="px-9 py-2 cursor-pointer rounded-xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold">Continue</button>
                </div>
            </Modal>
            <Modal
                isOpen={paymentMethodModalIsOpen}
                closeTimeoutMS={200}
                style={modalStyles}
                onRequestClose={() => setPaymentMethodModalIsOpen(false)}
            >
                <div className=""></div>
                <img src="../../src/assets/svg/wallet.svg" className="absolute z-[-1] opacity-50 left-[0] h-[350px]" />
                <button onClick={() => setPaymentMethodModalIsOpen(false)} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                    <XMarkIcon className='h-full size-7' />
                </button>
                <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
                    Payment
                </h1>
                <div className="flex items-center justify-center min-h-[150px]">
                    <PaymentSwitch onChange={(val) => setPaymentMethod(val)} />
                </div>
                <div className="flex items-center justify-between font-[Montserrat] mt-[1rem]">
                    <div className="px-6 py-3 bg-(--accent) rounded-2xl font-semibold text-3xl text-(--background)">
                        Total:&nbsp;
                        <span className="underline decoration-[1.5px]">
                            {
                                cartTotal
                            }
                            €
                        </span>
                    </div>
                    <button onClick={() => handleCommit()} className="px-9 py-2 cursor-pointer rounded-xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold">Continue</button>
                </div>
            </Modal>
            <div className="bg-(--accent) p-[2rem] rounded-4xl h-fit grid gap-y-4">
                <span className="text-3xl text-[#fff]">
                    Total:&nbsp;
                    {
                        cartTotal.toFixed(2)
                    }
                    €
                </span>
                <button onClick={() => setCommentModalIsOpen(true)} className="py-4 w-[100%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-2xl flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)">
                    Text
                </button>
            </div>
        </div>

    );
}

function PaymentSwitch({ onChange }:
    {
        onChange: (newValue: PaymentMethod) => void;
    }
) {
    const [methodIndex, setMethodIndex] = useState<number>(0)

    const PAYMENT_METHODS = [
        { value: "Card" as PaymentMethod, label: "Card", icon: <CreditCardIcon className="size-6" /> },
        { value: "Cash" as PaymentMethod, label: "Cash", icon: <BanknotesIcon className="size-6" /> },
        { value: "CardOnline" as PaymentMethod, label: "Card online", icon: <BuildingLibraryIcon className="size-6" /> },
    ]

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {
                PAYMENT_METHODS.map((opt, index) => (
                    <button
                        onClick={() => { setMethodIndex(index); onChange(PAYMENT_METHODS[methodIndex].value) }}
                        className={clsx("cursor-pointer px-3 py-2 flex gap-x-2 font-semibold font-[Montserrat] border-[2px] rounded-xl border-(--foreground) transition-colors duration-200", {
                            "bg-(--foreground) text-(--background)": methodIndex == index
                        })}>
                        {opt.icon}
                        < span > {opt.label}</span>
                    </button >
                ))
            }
        </div >
    )
}

export type PaymentMethod = "CardOnline" | "Cash" | "Card"

function AddressForm({ address, isInEditMode }:
    {
        address: UserAddress;
        isInEditMode: boolean
    }) {
    const { register, handleSubmit } = useForm<Inputs>();
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