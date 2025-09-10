import { EllipsisHorizontalIcon, HomeIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { cartAtom, localeAtom, supportedLocalesAtom } from '../state/atoms';
import { useAtom } from 'jotai';
import { defaultShopSearchFilters } from '../routes/shop';
import { totalItems } from '../functions/cart';
import { LoginForm, RegisterForm } from './navbar';

Modal.setAppElement('#root')

const modalStyles: Modal.Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        backdropFilter: "blur(20px)",
        zIndex: "95"
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
        overflow: "hidden",
        zIndex: "96"
    },
};

export default function MobileNavbar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [cart] = useAtom(cartAtom);
    const { t, i18n } = useTranslation();
    const [supportedLocales] = useAtom(supportedLocalesAtom)
    const [supportedLocalesCursor, setSupportedLocalesCursor] = useState(0)
    const [localeIconPath, setLocaleIconPath] = useState("");
    const [locale, setLocale] = useAtom(localeAtom);
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

    const [loginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (window.location.pathname == '/') {
            window.addEventListener('scroll', () => {
                setIsAtTop(window.scrollY == 0);
            })
        } else {
            setIsAtTop(false);
        }
    });

    function handleLocaleChange() {
        const newCursor = supportedLocalesCursor + 1;

        setSupportedLocalesCursor(newCursor);

        const newLocale = supportedLocales[newCursor % supportedLocales.length];

        setLocale(newLocale.name)
        setLocaleIconPath(newLocale.iconFilename);
        i18n.changeLanguage(newLocale.name);
    }

    useEffect(() => {
        const tmp = supportedLocales.find(loc => loc.name === locale);

        if (!tmp) {
            setLocaleIconPath(supportedLocales[0].iconFilename);
            setSupportedLocalesCursor(0);
        }

        const index = supportedLocales.indexOf(tmp!);

        setLocaleIconPath(tmp!.iconFilename);
        setSupportedLocalesCursor(index);
    }, []);

    return (
        <div className="">
            <Modal
                isOpen={loginModalIsOpen}
                closeTimeoutMS={200}
                style={modalStyles}
                // className="modal-content"
                // overlayClassName="modal-overlay"
                onRequestClose={() => setLoginModalIsOpen(false)}
            >
                <button onClick={() => setLoginModalIsOpen(false)} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                    <XMarkIcon className='h-full size-7' />
                </button>
                <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[2rem]">
                    {t("navbar.modals.login.title")}
                </h1>
                <div className="flex">
                    <LoginForm onModalModeChange={() => { setLoginModalIsOpen(false); setRegisterModalIsOpen(true) }} />
                </div>
            </Modal>
            <Modal
                isOpen={registerModalIsOpen}
                closeTimeoutMS={200}
                style={modalStyles}
                onRequestClose={() => setRegisterModalIsOpen(false)}
            >
                <div className=""></div>
                <button onClick={() => setRegisterModalIsOpen(false)} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                    <XMarkIcon className='h-full size-7' />
                </button>
                <h1 className="text-4xl font-[Montserrat] font-semibold text-center mb-[1rem]">
                    {t("navbar.modals.register.title")}
                </h1>
                <div className="w-full">
                    <RegisterForm onModalModeChange={() => { setRegisterModalIsOpen(false); setLoginModalIsOpen(true) }} />
                </div>
            </Modal>
            <div className={clsx("fixed h-[100vh] bottom-[0] left-[0] z-[98] transition-transform duration-200 w-full", {
                "translate-x-full": !sidebarIsOpen,
                "translate-x-[0]": sidebarIsOpen,
            })}
                style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0, 0, 0, .4)" }}>
            </div>
            <div className={clsx("fixed w-[100%] max-w-[300px] h-full z-[99] bottom-[0] right-[0] bg-(--foreground) transition-transform duration-200", {
                "translate-x-full": !sidebarIsOpen,
                "translate-x-[0]": sidebarIsOpen,
            })}>
                <div className="scroll">
                    <div className="w-full flex justify-center py-7">
                        <img src="../../src/assets/svg/logo_mobile.svg" className='h-[60px]' alt="" />
                    </div>
                    <div className="font-[Montserrat] font-semibold text-2xl w-full" onClick={() => setSidebarIsOpen(false)}>
                        <Link to='/' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.home")}</Link>
                        <Link to='/services' search={{ page: 1 }} className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.services")}</Link>
                        <Link to='/shop' search={defaultShopSearchFilters} className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.shop")}</Link>
                        <Link to='/info' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.about")}</Link>
                        <Link to='/projects' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.projects")}</Link>
                        <button onClick={() => setLoginModalIsOpen(true)} className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.popup_menu.login")}</button>
                        <button onClick={() => setRegisterModalIsOpen(true)} className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.popup_menu.register")}</button>
                        <Link to='/cart' className='block w-full text-(--background) text-right px-7 py-2'>{t("cart.page_title")}</Link>
                    </div>
                    <div className="font-[Montserrat] font-semibold text-2xl w-full">
                        <Link to='/privacy-policy' className='block w-full text-(--background) text-right px-7 py-2'>{t("footer.socials.text2")}</Link>
                        <Link to='/' className='block w-full text-(--background) text-right px-7 py-2'>{t("footer.socials.text1")}</Link>
                        <div className="flex justify-end px-7 py-2" onClick={() => handleLocaleChange()}>
                            <img className="w-[30px]" alt="Language icon" src={`../../src/assets/${localeIconPath}`} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx("fixed w-full z-[100] bottom-[0] right-[0] py-5 flex justify-around transition-colors duration-300 text-sm", {
                "bg-(--foreground)": !isAtTop,
                "bg-transparent": isAtTop,
            })}>
                <Link to='/profile' className='flex flex-col items-center justify-center text-(--background)'>
                    <UserIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold'>Profile</span>
                </Link>
                <Link to='/shop' search={defaultShopSearchFilters} className='flex flex-col items-center justify-center text-(--background)'>
                    <ShoppingBagIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold'>Shop</span>
                </Link>

                <Link to='/' className='flex flex-col items-center justify-center text-(--background)'>
                    <HomeIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold'>Home</span>
                </Link>
                <Link to='/cart' className='relative flex flex-col  items-center justify-center text-(--background)'>
                    <ShoppingCartIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold'>Cart</span>
                    <div className="absolute right-[-5px] top-[-5px] bg-(--background) text-(--foreground) rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm font-[Montserrat] font-semibold">
                        {
                            totalItems(cart)
                        }
                    </div>
                </Link>
                <button onClick={() => setSidebarIsOpen(!sidebarIsOpen)} className='flex flex-col items-center justify-center text-(--background) cursor-pointer'>
                    <EllipsisHorizontalIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold text-sm'>Menu</span>
                </button>
            </div>
        </div>
    )
}