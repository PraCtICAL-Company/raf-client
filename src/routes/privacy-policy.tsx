import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai';
import { localeAtom } from '../state/atoms';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/privacy-policy')({
    component: PrivacyPolicy,
});

function PrivacyPolicy() {
    const { t } = useTranslation();
    const [locale] = useAtom(localeAtom);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/locales/${locale}/privacy-policy.txt`)
            .then(response => response.text())
            .then(_text => {
                setText(_text);
                setLoading(false);
            })
            .catch(err => {
                setText(err)
                setLoading(false);
            })
    });

    return (
        <div className="flex justify-center font-[Montserrat] font-semibold">
            <div className="w-[88rem] p-[2rem] lg:p-(--default-padding) lg:pt-(--navbar-height) lg:mt-(--default-padding) pb-(--default-padding)">
                <h1 className='mt-[1rem] lg:mt-[0] text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center mb-[1rem]'>{t("privacy_policy.page_title")}</h1>
                <article>
                    {
                        loading ?
                            <div className="">Loading...</div>
                            :
                            <div className="" dangerouslySetInnerHTML={{ __html: text }}>

                            </div>
                    }
                </article>
            </div>

        </div>

    );
}