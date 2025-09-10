import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { localeAtom } from '../state/atoms';
import { useTranslation } from 'react-i18next';
import MobileNavbar from '../components/mobile-navbar';
import clsx from 'clsx';
import Footer from '../components/footer';
import MobileFooter from '../components/mobile-footer';

export const Route = createRootRoute({
    component: RootComponent
})

function RootComponent() {
    const [locale] = useAtom(localeAtom);
    const { i18n } = useTranslation();
    const [atBottom, setAtBottom] = useState<boolean>(false);

    useEffect(() => {
        i18n.changeLanguage(locale);

        // window.addEventListener("scroll", () => {
        //     if (isAtBottom()) {
        //         console.log("At bottom");
        //         setAtBottom(true)
        //     } else {
        //         setAtBottom(false)
        //     }
        // });
    }, []);

    const isAtBottom = (): boolean => {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight - 90;
    }

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
        </>
    );
}
