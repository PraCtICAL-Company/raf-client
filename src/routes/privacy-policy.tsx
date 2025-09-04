import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai';
import { localeAtom } from '../state/atoms';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePrivacyPolicy } from '../queries/queryHooks';

export const Route = createFileRoute('/privacy-policy')({
    component: PrivacyPolicy,
});

function PrivacyPolicy() {
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
            <div className="w-7xl pt-(--default-padding) pb-(--default-padding)">
                <h1 className='text-5xl text-center mb-[1em]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor est labore, voluptate eum dolorem et quo saepe placeat cumque rem earum blanditiis quae voluptas facilis doloremque excepturi laudantium natus alias?</h1>
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