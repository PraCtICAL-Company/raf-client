import {
  ArchiveBoxIcon,
  AtSymbolIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  ClockIcon,
  CreditCardIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { } from "../api/queries";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAtom } from "jotai";
import { cartAtom, userAtom } from "../state/atoms";
import CartItemQuantityInput from "./number-input";
import { addToCart, refreshCart, removeFromCart, removeFromCartEntirely, totalItems, totalPrice } from "../functions/cart";
import {
  defaultAddress,
  type Cart,
  type CartItem,
  type Order,
  type User,
  type UserAddress,
} from "../types";
import {
  useAddAddress,
  useDeleteAddress,
  useEditAddress,
  useOrderFromCart,
} from "../api/requests";

Modal.setAppElement("#root");

const modalStyles: Modal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .4)",
    backdropFilter: "blur(20px)",
  },
  content: {
    top: "50%",
    left: "50%",
    width: "50vw",
    height: "fit-content",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--background)",
    borderRadius: "1.5rem",
    padding: "2rem",
    overflow: "hidden",
  },
};

const deleteModalStyles: Modal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .4)",
    backdropFilter: "blur(20px)",
  },
  content: {
    top: "50%",
    left: "50%",
    minWidth: "33%",
    height: "fit-content",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--background)",
    borderRadius: "1.5rem",
    padding: "2rem",
  },
};

export default function ProfileCartComponent() {
  const tabName = window.location.pathname;

  const { t } = useTranslation();

  const [userQuery] = useAtom(userAtom);
  const { data, isLoading } = userQuery;

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  const [activeAddress, setActiveAddress] =
    useState<UserAddress>(defaultAddress());

  const [cart, setCart] = useAtom<Cart>(cartAtom);
  const [cartTotal, setCartTotal] = useState<number>(0);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const deleteAddress = useDeleteAddress();

  useEffect(() => {
    setCartTotal(totalPrice(cart));
  }, []);

  // edit/add modal

  const openEditModal = (address: UserAddress): void => {
    setModalEdit(true);
    setActiveAddress(address);
    setModalIsOpen(true);
  };

  const openAddModal = (): void => {
    setModalEdit(false);
    setModalIsOpen(true);
  };

  const closeEditModal = (): void => {
    setModalIsOpen(false);
    setModalEdit(false);
    setActiveAddress(defaultAddress());
  };

  // const closeAddModal = (): void => {
  //     setModalIsOpen(false);
  //     setModalEdit(false);
  //     setActiveAddress(defaultAddress);
  // }

  // delete modal

  const openDeleteModal = (address: UserAddress): void => {
    setActiveAddress(address);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = (): void => {
    setDeleteModalIsOpen(false);
    setActiveAddress(defaultAddress);
  };

  const handleDelete = (): void => {
    deleteAddress.mutate({
      address: activeAddress,
    });
    setDeleteModalIsOpen(false);
  };

  const removeItemFromCart = (item: CartItem): void => {
    let cartCopy = { ...cart };
    cartCopy.items = cartCopy.items.filter(
      (it) => it.itemType.id != item.itemType.id
    );
    removeFromCartEntirely(cartCopy, item);
    setCart(cartCopy);
    setCartTotal(totalPrice(cartCopy));
  };

  return (
    <div className="flex justify-center font-[Montserrat] font-semibold min-h-[100vh]">
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="">
          <Modal
            isOpen={deleteModalIsOpen}
            closeTimeoutMS={200}
            onRequestClose={closeDeleteModal}
            style={deleteModalStyles}
          >
            <h1 className="text-2xl font-[Montserrat] font-semibold text-center">
              {t("profile.modals.delete.title")}
              <br />
              {activeAddress.settlement} {activeAddress.street}{" "}
              {activeAddress.house} {activeAddress.entrance}{" "}
              {activeAddress.floor} {activeAddress.apartment}?
            </h1>
            <button
              onClick={closeDeleteModal}
              className="absolute right-[2rem] top-[2rem] cursor-pointer"
            >
              <XMarkIcon className="h-full size-7" />
            </button>
            <div className="flex justify-center mt-(--default-padding) font-[Montserrat] font-semibold">
              <button
                onClick={handleDelete}
                className="h-[51px] w-[33%] block cursor-pointer rounded-xl text-lg flex items-center justify-center text-(--background) bg-(--accent)"
              >
                {t("profile.modals.delete.submit_btn_text")}
              </button>
            </div>
          </Modal>
          <Modal
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeEditModal}
            style={modalStyles}
          >
            <button
              onClick={closeEditModal}
              className="absolute right-[2rem] top-[2rem] cursor-pointer"
            >
              <XMarkIcon className="h-full size-7" />
            </button>
            <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
              {modalEdit ? (
                <div className="">
                  {t("profile.modals.add_edit.title.edit")}
                </div>
              ) : (
                <div className="">{t("profile.modals.add_edit.title.add")}</div>
              )}
            </h1>
            {data && (
              <AddressForm
                address={activeAddress}
                isInEditMode={modalEdit}
                onCommit={() => closeEditModal()}
              />
            )}
          </Modal>
        </div>
      )}
      <div className="w-[88rem] p-[2rem] lg:p-(--default-padding) lg:pt-(--navbar-height) lg:mt-(--default-padding) pb-(--default-padding)">
        {data ? (
          <div className="">
            <h1 className="text-5xl text-center mb-[1em]">
              {tabName == "/profile"
                ? t("profile.page_title")
                : t("cart.page_title")}
            </h1>
            <div className="flex flex-col xl:flex-row">
              <div className="flex-1 flex justify-center items-center xl:items-start xl:justify-start">
                <div className="flex flex-col gap-y-4 mb-(--default-padding) xl:mt-[4.25rem]">
                  <Link
                    to="/profile"
                    className={clsx(
                      "h-[51px] w-[150px] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center",
                      {
                        "bg-(--foreground) text-(--background)":
                          tabName === "/profile",
                        "bg-(--background) text-(--foreground)":
                          tabName === "/cart",
                      }
                    )}
                  >
                    {t("cart_profile_switch.profile_tab_text")}
                  </Link>
                  <Link
                    to="/cart"
                    className={clsx(
                      "h-[51px] w-[150px] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center",
                      {
                        "bg-(--foreground) text-(--background)":
                          tabName === "/cart",
                        "bg-(--background) text-(--foreground)":
                          tabName === "/profile",
                      }
                    )}
                  >
                    {t("cart_profile_switch.cart_tab_text")}
                  </Link>
                  <Link
                    to="/"
                    className="h-[51px] w-[150px] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--foreground)"
                  >
                    {t("cart_profile_switch.exit_tab_text")}
                  </Link>
                </div>
              </div>
              <div className="flex-3">
                {isLoading ? (
                  <div className="">Loading...</div>
                ) : (
                  <div className="">
                    {tabName === "/profile" ? (
                      <div className="">
                        <form action="" method="post" className="grid gap-y-4">
                          <h2>{t("profile.personal_data.title")}</h2>
                          <div className="text-(--foreground) font-[Montserrat]">
                            <label className="block text-sm font-semibold">
                              {t("profile.personal_data.username_input.label")}
                            </label>
                            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                              <div className="mr-3 ml-3">
                                <UserIcon className="h-full size-6" />
                              </div>
                              <input
                                id="username"
                                type="text"
                                name="username"
                                className="w-full outline-none pr-3 pb-3 pt-3"
                                value={data.user?.name || ""}
                                readOnly
                              />
                            </div>
                          </div>
                          {/* <div className='text-(--foreground) font-[Montserrat]'>
                                                        <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                                                        <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                                                            <div className="mr-3 ml-3">
                                                                <KeyIcon className='h-full size-6' />
                                                            </div>
                                                            <input id="password" type="password" name="password" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                                                        </div>
                                                    </div> */}
                          <div className="text-(--foreground) font-[Montserrat]">
                            <label className="block text-sm font-semibold">
                              {t("profile.personal_data.phone_input.label")}
                            </label>
                            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                              <div className="mr-3 ml-3">
                                <PhoneIcon className="h-full size-6" />
                              </div>
                              <input
                                id="phone"
                                type="text"
                                name="phone"
                                className="w-full outline-none pr-3 pb-3 pt-3"
                                value={data.user?.phone || ""}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="text-(--foreground) font-[Montserrat]">
                            <label className="block text-sm font-semibold">
                              {t("profile.personal_data.email_input.label")}
                            </label>
                            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                              <div className="mr-3 ml-3">
                                <AtSymbolIcon className="h-full size-6" />
                              </div>
                              <input
                                id="email"
                                type="text"
                                name="email"
                                className="w-full outline-none pr-3 pb-3 pt-3"
                                value={data.user?.email || ""}
                                readOnly
                              />
                            </div>
                          </div>
                        </form>
                        <div className="mt-(--default-padding)">
                          <div className="flex flex-col md:flex-row gap-y-6 justify-between items-center">
                            <div className="w-full">
                              <span className="block text-lg">
                                {t("profile.personal_data.addresses.big_text")}
                              </span>
                              <span className="block text-sm/3 font-normal">
                                {t(
                                  "profile.personal_data.addresses.small_text"
                                )}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                openAddModal();
                              }}
                              className="h-[51px] w-full md:max-w-[33%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)"
                            >
                              {t(
                                "profile.personal_data.add_address_button_text"
                              )}
                            </button>
                          </div>
                          <div className="mt-[1rem] font-[Montserrat]">
                            {data?.addresses.map((address) => {
                              return (
                                <div
                                  key={address.street}
                                  className="flex items-center"
                                >
                                  <div className="mr-3">
                                    <MapPinIcon className="h-full size-6" />
                                  </div>
                                  <div className="w-full">
                                    {address.settlement} {address.street}{" "}
                                    {address.house} {address.entrance}{" "}
                                    {address.floor} {address.apartment}
                                  </div>
                                  <div className="flex gap-x-2">
                                    <button
                                      onClick={() => openEditModal(address)}
                                    >
                                      <PencilSquareIcon className="h-full size-6 cursor-pointer" />
                                    </button>
                                    <button
                                      onClick={() => openDeleteModal(address)}
                                    >
                                      <TrashIcon className="h-full size-6 cursor-pointer" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col xl:flex-row">
                        <div className="flex-1 grid gap-y-(--default-padding) mb-(--default-padding) xl:mb-[0rem]">
                          {cart.items.map((cartItem) => (
                            <div
                              key={cartItem.itemType.id}
                              className={clsx(
                                "flex flex-col xl:flex-row gap-x-5 items-center xl:items-start",
                                {
                                  "opacity-50 pointer-events-none":
                                    !cartItem.itemType.inStock,
                                }
                              )}
                            >
                              <div
                                className="overflow-hidden bg-center bg-cover w-[300px] h-[300px] xl:w-[200px] xl:h-[200px] rounded-4xl"
                                style={{
                                  backgroundImage: `url(../../src/assets/${cartItem.itemType.imgUrl})`,
                                }}
                              ></div>
                              <div className="text-center xl:text-right min-w-[300px] h-full grid gap-y-2 relative">
                                <div className="flex flex-col items-center py-[2rem] xl:py-[0] xl:items-end">
                                  <h2 className="text-lg">
                                    {cartItem.itemType.title}
                                  </h2>
                                  {cartItem.itemType.inStock ? (
                                    <div className="flex gap-x-2 items-center w-fit">
                                      <ArchiveBoxIcon className="size-4" />
                                      <span>{t("cart.stock.in_stock")}</span>
                                    </div>
                                  ) : (
                                    <div className="flex gap-x-2 items-center w-fit">
                                      <ClockIcon className="size-4" />
                                      <span className="font-normal">
                                        {t("cart.stock.out_of_stock")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="absolute right-[0] bottom-[0] flex flex-col items-center xl:items-end gap-y-3 w-full">
                                  <TrashIcon
                                    style={{ pointerEvents: "all" }}
                                    className="cursor-pointer size-6 absolute left-[0.5rem] bottom-[0.5rem]"
                                    onClick={() => removeItemFromCart(cartItem)}
                                  />
                                  <div className="">
                                    {cartItem.itemType.hotPrice ? (
                                      <div className="text-center">
                                        <div className="text-xl line-through decoration-[2px]">
                                          {cartItem.itemType.hotPrice.oldPrice}€
                                        </div>
                                        <div className="text-3xl flex gap-x-3 underline decoration-[2px] items-center">
                                          <img
                                            src="../../src/assets/svg/icons/hot-price.svg"
                                            className="w-[30px]"
                                          />
                                          {cartItem.itemType.hotPrice.newPrice}€
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-3xl">
                                        {cartItem.itemType.priceInEuro}€
                                      </div>
                                    )}
                                  </div>
                                  <CartItemQuantityInput
                                    cartItem={cartItem}
                                    min={1}
                                    max={99}
                                    onChange={(newValue) => {
                                      const cartCopy = { ...cart }

                                      refreshCart(cartCopy)

                                      setCart(cartCopy);
                                      setCartTotal(totalPrice(cartCopy));
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex-1 flex justify-center">
                          <OrderComponent cartTotal={cartTotal} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <h1 className="text-5xl text-center mb-[1em]">
              {t("cart_profile_switch.no_login_title")}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderComponent({ cartTotal }: { cartTotal: number }) {
  const { t } = useTranslation();
  const [{ data }] = useAtom(userAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [message, setMessage] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [commentModalIsOpen, setCommentModalIsOpen] = useState<boolean>(false);
  const [paymentMethodModalIsOpen, setPaymentMethodModalIsOpen] =
    useState<boolean>(false);

  const orderFromCart = useOrderFromCart();

  const handleCommit = (): void => {
    console.log(paymentMethod);
    console.log(message);

    let cartCopy = cart;

    if (!data?.user) return;

    const order: Order = {
      items: cartCopy.items,
      timestamp: new Date(),
      sender: data.user,
    };

    orderFromCart.mutate({ order });
    // cartCopy.items = [];
    // setCart(cart);

    setCommentModalIsOpen(false);
    setPaymentMethodModalIsOpen(false);
  };

  return (
    <div className="">
      <Modal
        isOpen={commentModalIsOpen}
        closeTimeoutMS={200}
        style={modalStyles}
        onRequestClose={() => setCommentModalIsOpen(false)}
      >
        <button
          onClick={() => setCommentModalIsOpen(false)}
          className="absolute right-[2rem] top-[2rem] cursor-pointer"
        >
          <XMarkIcon className="h-full size-7" />
        </button>
        <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
          {t("cart.modals.message.title")}
        </h1>
        <div className="flex">
          <div className="flex-1 hidden md:flex items-center justify-center">
            <img
              src="../../src/assets/png/delivery.png"
              alt="delivery"
              className="w-[80%]"
            />
          </div>
          <div className="flex-1">
            <div className="text-(--foreground) font-[Montserrat]">
              <label className="block text-sm font-semibold">
                {t("cart.modals.message.message_input.label")}
              </label>
              <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  name="message"
                  placeholder={t(
                    "cart.modals.message.message_input.placeholder"
                  )}
                  className="w-full outline-none p-3 resize-none h-[10em]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between font-[Montserrat] mt-[1rem]">
          <div className="md:flex flex-col lg:flex-row w-full hidden justify-between gap-y-4">
            <div className="px-6 py-3 bg-(--accent) rounded-2xl font-semibold text-3xl text-(--background)">
              {t("cart.modals.message.total")}:&nbsp;
              <span className="underline decoration-[1.5px]">{cartTotal}€</span>
            </div>
            <button
              onClick={() => setPaymentMethodModalIsOpen(true)}
              className="px-9 py-2 cursor-pointer rounded-xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold"
            >
              {t("cart.modals.message.continue_btn_text")}
            </button>
          </div>
          <div className="md:hidden rounded-3xl bg-(--accent) p-4 flex w-full justify-between">
            <div className="font-semibold text-xl md:text-3xl text-(--background)">
              <div className="">{t("cart.modals.message.total")}:&nbsp;</div>
              <span className="underline decoration-[1.5px]">{cartTotal}€</span>
            </div>
            <button
              onClick={() => setPaymentMethodModalIsOpen(true)}
              className="px-4 cursor-pointer rounded-2xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold"
            >
              {t("cart.modals.message.continue_btn_text")}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={paymentMethodModalIsOpen}
        closeTimeoutMS={200}
        style={modalStyles}
        onRequestClose={() => setPaymentMethodModalIsOpen(false)}
      >
        <img
          src="../../src/assets/svg/wallet.svg"
          className="absolute z-[-1] opacity-50 left-[0] h-[350px]"
        />
        <button
          onClick={() => setPaymentMethodModalIsOpen(false)}
          className="absolute right-[2rem] top-[2rem] cursor-pointer"
        >
          <XMarkIcon className="h-full size-7" />
        </button>
        <h1 className="text-2xl md:text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
          {t("cart.modals.payment_method.title")}
        </h1>
        <div className="flex items-center justify-center min-h-[150px]">
          <PaymentSwitch
            onChange={(val) => {
              console.log(val);
              setPaymentMethod(val);
            }}
          />
        </div>
        <div className="flex items-center justify-between font-[Montserrat] mt-[1rem]">
          <div className="md:flex flex-col lg:flex-row w-full hidden justify-between gap-y-4">
            <div className="px-6 py-3 bg-(--accent) rounded-2xl font-semibold text-3xl text-(--background)">
              {t("cart.modals.message.total")}:&nbsp;
              <span className="underline decoration-[1.5px]">{cartTotal}€</span>
            </div>
            <button
              onClick={() => handleCommit()}
              className="px-9 py-2 cursor-pointer rounded-xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold"
            >
              {t("cart.modals.message.continue_btn_text")}
            </button>
          </div>
          <div className="md:hidden rounded-3xl bg-(--accent) p-4 flex w-full justify-between">
            <div className="font-semibold text-xl md:text-3xl text-(--background)">
              <div className="">
                {t("cart.modals.payment_method.total")}:&nbsp;
              </div>
              <span className="underline decoration-[1.5px]">{cartTotal}€</span>
            </div>
            <button
              onClick={() => handleCommit()}
              className="px-4 cursor-pointer rounded-2xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold"
            ></button>
          </div>
        </div>
      </Modal>
      <div className="bg-(--accent) p-[1.5rem] rounded-4xl h-fit grid gap-y-4">
        <span className="text-3xl text-[#fff]">
          {t("cart.total")}:&nbsp;
          {cartTotal.toFixed(2)}€
        </span>
        <button
          onClick={() => setCommentModalIsOpen(true)}
          className="py-4 w-[100%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-2xl flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)"
        >
          {t("cart.total_btn_text")}
        </button>
      </div>
    </div>
  );
}

function PaymentSwitch({
  onChange,
}: {
  onChange: (newValue: PaymentMethod) => void;
}) {
  const { t } = useTranslation();
  const [methodIndex, setMethodIndex] = useState<number>(0);

  const PAYMENT_METHODS = [
    {
      value: "Card" as PaymentMethod,
      label: t("cart.modals.payment_method.button_input.card"),
      icon: <CreditCardIcon className="size-6" />,
    },
    {
      value: "Cash" as PaymentMethod,
      label: t("cart.modals.payment_method.button_input.cash"),
      icon: <BanknotesIcon className="size-6" />,
    },
    {
      value: "CardOnline" as PaymentMethod,
      label: t("cart.modals.payment_method.button_input.card_online"),
      icon: <BuildingLibraryIcon className="size-6" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {PAYMENT_METHODS.map((opt, index) => (
        <button
          onClick={() => {
            setMethodIndex(index);
            onChange(PAYMENT_METHODS[index].value);
          }}
          className={clsx(
            "cursor-pointer px-3 py-2 flex gap-x-2 font-semibold font-[Montserrat] border-[2px] rounded-xl border-(--foreground) transition-colors duration-200",
            {
              "bg-(--foreground) text-(--background)": methodIndex == index,
            }
          )}
        >
          {opt.icon}
          <span> {opt.label}</span>
        </button>
      ))}
    </div>
  );
}

export type PaymentMethod = "CardOnline" | "Cash" | "Card";

function AddressForm({
  address,
  isInEditMode,
  onCommit,
}: {
  address: UserAddress;
  isInEditMode: boolean;
  onCommit: () => void;
}) {
  const { register, handleSubmit } = useForm<UserAddress>();
  const { t } = useTranslation();
  const editAddress = useEditAddress();
  const addAddress = useAddAddress();

  const onSubmit: SubmitHandler<UserAddress> = (data) => {
    if (isInEditMode) {
      editAddress.mutate({
        address: {
          ...data,
          id: address.id,
        },
      });
    } else {
      addAddress.mutate({
        address: data,
      });
    }
    onCommit();
    address = defaultAddress();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="grid gap-y-5 gap-x-5"
        style={{
          gridTemplate: `
                                                    'a1 a1 a1 a1'
                                                    'a2 a2 a2 a2'
                                                    'a3 a4 a5 a6'
                                                    `,
        }}
      >
        <div className="" style={{ gridArea: "a1" }}>
          <div className="text-(--foreground) font-[Montserrat]">
            <label className="block text-sm font-semibold">
              {t("profile.modals.add_edit.city_input.label")}
            </label>
            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
              <input
                key={address.floor}
                id="city"
                type="text"
                {...register("settlement")}
                placeholder={t(
                  "profile.modals.add_edit.city_input.placeholder"
                )}
                className="w-full outline-none p-3"
                defaultValue={address.settlement}
              />
            </div>
          </div>
        </div>
        <div className="" style={{ gridArea: "a2" }}>
          <div className="text-(--foreground) font-[Montserrat]">
            <label className="block text-sm font-semibold">
              {t("profile.modals.add_edit.street_input.label")}
            </label>
            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
              <input
                id="username"
                type="text"
                {...register("street")}
                placeholder={t(
                  "profile.modals.add_edit.street_input.placeholder"
                )}
                className="w-full outline-none p-3"
                defaultValue={address.street}
              />
            </div>
          </div>
        </div>
        <div className="" style={{ gridArea: "a3" }}>
          <div className="text-(--foreground) font-[Montserrat]">
            <label className="block text-sm font-semibold">
              {t("profile.modals.add_edit.building_input.label")}
            </label>
            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
              <input
                id="username"
                type="text"
                {...register("house")}
                placeholder={t(
                  "profile.modals.add_edit.building_input.placeholder"
                )}
                className="w-full outline-none p-3"
                defaultValue={address.house}
              />
            </div>
          </div>
        </div>
        <div className="" style={{ gridArea: "a4" }}>
          <div className="text-(--foreground) font-[Montserrat]">
            <label className="block text-sm font-semibold">
              {t("profile.modals.add_edit.floor_input.label")}
            </label>
            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
              <input
                id="username"
                type="text"
                {...register("floor")}
                placeholder={t(
                  "profile.modals.add_edit.floor_input.placeholder"
                )}
                className="w-full outline-none p-3"
                defaultValue={address.floor}
              />
            </div>
          </div>
        </div>
        <div className="" style={{ gridArea: "a5" }}>
          <div className="text-(--foreground) font-[Montserrat]">
            <label className="block text-sm font-semibold">
              {t("profile.modals.add_edit.entrance_input.label")}
            </label>
            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
              <input
                id="username"
                type="text"
                {...register("entrance")}
                placeholder={t(
                  "profile.modals.add_edit.entrance_input.placeholder"
                )}
                className="w-full outline-none p-3"
                defaultValue={address.entrance}
              />
            </div>
          </div>
        </div>
        <div className="" style={{ gridArea: "a6" }}>
          <div className="text-(--foreground) font-[Montserrat]">
            <label className="block text-sm font-semibold">
              {t("profile.modals.add_edit.apartment_input.label")}
            </label>
            <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
              <input
                id="username"
                type="text"
                {...register("apartment")}
                placeholder={t(
                  "profile.modals.add_edit.apartment_input.placeholder"
                )}
                className="w-full outline-none p-3"
                defaultValue={address.apartment}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="font-[Montserrat] font-semibold text-2xl mt-9 h-[51px] w-[33%] block cursor-pointer border-[3px] border-(--foreground) rounded-xl text-lg flex items-center justify-center bg-(--background) text-(--background) bg-(--foreground)"
        >
          {t("profile.modals.add_edit.submit_btn_text")}
        </button>
      </div>
    </form>
  );
}
