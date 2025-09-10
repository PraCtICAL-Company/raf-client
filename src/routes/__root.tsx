import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/navbar'
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { errorAtom, localeAtom } from '../state/atoms';
import { useTranslation } from 'react-i18next';
import MobileNavbar from '../components/mobile-navbar';
import Footer from '../components/footer';
import MobileFooter from '../components/mobile-footer';

export const Route = createRootRoute({
    component: RootComponent
})

function RootComponent() {
    const [locale] = useAtom(localeAtom);
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, []);

    return (
        <>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="lg:hidden block">
                <MobileNavbar />
            </div>

            <Outlet />

            <div className="w-full">
                <div className="hidden lg:block">
                    <Footer />
                </div>
                <div className="lg:hidden block" >
                    <MobileFooter />
                </div>
            </div>

            <ErrorPopup />
        </>
    );
}

function ErrorPopup() {
    const [error, setError] = useAtom(errorAtom);

    return (
        <div className="">
            {
                error && (
                    <div className="fixed right-[2rem] bottom-[2rem] bg-(--accent) rounded-lg p-4 font-[Montserrat] fontnt-semibold text-xl z-[120]">
                        {error}
                    </div>
                )
            }
        </div>

    );
}