import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/navbar'
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { localeAtom } from '../state/atoms';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer';

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
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
