import { EllipsisHorizontalIcon, HomeIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/20/solid';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { localeAtom, supportedLocalesAtom } from '../state/atoms';
import { useAtom } from 'jotai';
import { defaultShopSearchFilters } from '../routes/shop';

Modal.setAppElement('#root')

const modalStyles: Modal.Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        backdropFilter: "blur(20px)",
        zIndex: 99
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
        zIndex: "100"
    },
};

export default function MobileNavbar() {
    const { t, i18n } = useTranslation();
    const [supportedLocales] = useAtom(supportedLocalesAtom)
    const [supportedLocalesCursor, setSupportedLocalesCursor] = useState(0)
    const [localeIconPath, setLocaleIconPath] = useState("");
    const [locale, setLocale] = useAtom(localeAtom);
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

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
            <div className={clsx("fixed w-[100%] h-full z-[99] bottom-[0] right-[0] bg-(--foreground) transition-transform duration-200", {
                "translate-x-full": !sidebarIsOpen,
                "translate-x-[0]": sidebarIsOpen,
            })}>
                <div className="">
                    <div className="w-full flex justify-center py-7">
                        <img src="../../src/assets/svg/logo_mobile.svg" className='h-[70px]' alt="" />
                    </div>
                    <div className="font-[Montserrat] font-semibold text-2xl w-full" onClick={() => setSidebarIsOpen(false)}>
                        <Link to='/' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.home")}</Link>
                        <Link to='/services' search={{ page: 1 }} className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.services")}</Link>
                        <Link to='/shop' search={defaultShopSearchFilters} className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.shop")}</Link>
                        <Link to='/info' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.about")}</Link>
                        <Link to='/projects' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.links.projects")}</Link>
                        <Link to='/profile' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.popup_menu.login")}</Link>
                        <Link to='/profile' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.popup_menu.register")}</Link>
                        <Link to='/profile' className='block w-full text-(--background) text-right px-7 py-2'>{t("navbar.popup_menu.profile")}</Link>
                    </div>
                    <div className="font-[Montserrat] font-semibold text-2xl w-full mt-[5rem]">
                        <Link to='/privacy-policy' className='block w-full text-(--background) text-right px-7 py-2'>{t("footer.socials.text2")}</Link>
                        <Link to='/' className='block w-full text-(--background) text-right px-7 py-2'>{t("footer.socials.text1")}</Link>
                        <div className="flex justify-end px-7 py-2" onClick={() => handleLocaleChange()}>
                            <img className="w-[30px]" alt="Language icon" src={`../../src/assets/${localeIconPath}`} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed w-full z-[100] bg-(--foreground) bottom-[0] right-[0] py-5 flex justify-around">
                <Link to='/profile' className='flex flex-col items-center justify-center text-(--background)'>
                    <UserIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold text-sm'>Profile</span>
                </Link>
                <Link to='/profile' className='flex flex-col items-center justify-center text-(--background)'>
                    <ShoppingBagIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold text-sm'>Shop</span>
                </Link>

                <Link to='/profile' className='flex flex-col items-center justify-center text-(--background)'>
                    <HomeIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold text-sm'>Home</span>
                </Link>
                <Link to='/profile' className='flex flex-col  items-center justify-center text-(--background)'>
                    <ShoppingCartIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold text-sm'>Cart</span>
                </Link>
                <button onClick={() => setSidebarIsOpen(!sidebarIsOpen)} className='flex flex-col items-center justify-center text-(--background)'>
                    <EllipsisHorizontalIcon className='size-6 mb-1' />
                    <span className='font-[Montserrat] font-semibold text-sm'>Menu</span>
                </button>
            </div>
        </div>
    )
}