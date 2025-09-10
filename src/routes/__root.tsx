import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/navbar'
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { localeAtom } from '../state/atoms';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer';
import MobileNavbar from '../components/mobile-navbar';

export const Route = createRootRoute({
    component: RootComponent
})

function RootComponent() {
    const [locale] = useAtom(localeAtom);
    const { i18n } = useTranslation();

    useEffect(() => {
        console.log(locale);

        i18n.changeLanguage(locale);
    }, []);

    return (
        <>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="block lg:hidden">
                <MobileNavbar />
            </div>

            <Outlet />

            {/* <Footer /> */}
        </>
    );
}
