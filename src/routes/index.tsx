import { createFileRoute, Link } from '@tanstack/react-router'
import homepageVideo from '../assets/video/homepage_video5.mp4'
import { useTranslation } from 'react-i18next'
import { AtSymbolIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/20/solid';
import type { FormEvent, MouseEvent } from 'react';

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { t } = useTranslation();

    return (
        <div className='flex items-center flex-col'>
            <div className="w-[100vw] absolute md:top-(--navbar-height) pt-6 flex justify-center">
                <span className='text-3xl text-(--background) font-[Montserrat] font-semibold'>
                    <div className="hidden md:visible">
                        {t("homepage.video.overlay_text")}
                    </div>
                    <div className="md:hidden visible flex w-full h-[100vh] items-center justify-center">
                        <img src="../../src/assets/svg/logo_mobile_light.svg" className='h-[70px] z-[90]' alt="" />
                    </div>
                </span>
            </div>
            <div className="overflow-hidden h-[100vh]">
                <video src={homepageVideo} autoPlay muted className="h-[100vh] w-[100vw] object-cover"></video>
            </div>
            <div className="max-w-[88rem]">
                <div className="p-[2rem] md:p-(--default-padding) font-[Montserrat] w-full">
                    <p className='text-xl md:text-2xl font-semibold color-(--foreground) w-full'>
                        {t("homepage.teaser.row1")}
                        <br />
                        {t("homepage.teaser.row2")}
                        <br />
                        {t("homepage.teaser.row3")}
                        <br />
                        {t("homepage.teaser.row4")}
                        <br />
                        {t("homepage.teaser.row5")}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-y-[5rem] md:grid-cols-3 lg:grid-cols-6 py-[2em]">
                    <div className="flex justify-center">
                        <img className='w-[100px]' src="../../src/assets/svg/volkswagen.svg" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <img className='w-[100px]' src="../../src/assets/svg/porsche.svg" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <img className='w-[100px]' src="../../src/assets/svg/seat.svg" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <img className='w-[100px]' src="../../src/assets/svg/skoda.svg" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <img className='w-[100px]' src="../../src/assets/svg/audi.svg" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <img className='w-[100px]' src="../../src/assets/svg/lamborghini.svg" alt="" />
                    </div>
                </div>
                <div className='p-[2rem] md:p-(--default-padding) font-[Montserrat]'>
                    <div className="overflow-hidden relative w-full h-[150px] md:h-[300px] lg:h-[400px] bg-(--foreground) rounded-3xl md:rounded-4xl">
                        <div className="absolute bottom-[0]">
                            <img className='h-[100px] md:h-[200px] lg:h-[300px]' src="../../src/assets/svg/wrench.svg" alt="" />
                        </div>
                        <div className="absolute top-[1.5rem] right-[1.5rem] md:top-[3rem] md:right-[3rem]">
                            <span className='text-2xl md:text-4xl lg:text-6xl text-(--background) font-semibold'>{t("homepage.service_panel.text")}</span>
                        </div>
                        <div className="absolute bottom-[1.5rem] right-[1.5rem] md:bottom-[3rem] md:right-[3rem]">
                            <Link to='/services' search={{ page: 1 }} className='p-[0.5em] text-lg md:text-2xl font-semibold bg-(--background) rounded-xl'>{t("homepage.service_panel.button_text")}</Link>
                        </div>
                    </div>
                </div>
                <div className='p-[2rem] md:p-(--default-padding) font-[Montserrat]'>
                    <div className="overflow-hidden relative w-full h-[150px] md:h-[300px] lg:h-[400px] bg-(--foreground) rounded-3xl md:rounded-4xl">
                        <div className="absolute bottom-[0]">
                            <img className='h-[100px] md:h-[200px] lg:h-[300px]' src="../../src/assets/svg/route.svg" alt="" />
                        </div>
                        <div className="absolute top-[1.5rem] right-[1.5rem] md:top-[3rem] md:right-[3rem]">
                            <span className='text-2xl md:text-4xl lg:text-6xl text-(--background) font-semibold'>{t("homepage.map_panel.text")}</span>
                        </div>
                        <div className="absolute bottom-[1.5rem] right-[1.5rem] md:bottom-[3rem] md:right-[3rem]">
                            <Link to='/' className='p-[0.5em] text-lg md:text-2xl font-semibold bg-(--background) rounded-xl'>{t("homepage.map_panel.button_text")}</Link>
                        </div>
                    </div>
                </div>
                <div className="p-[2rem] md:p-(--default-padding) flex justify-between">
                    <div className='hidden md:flex md:flex-1 items-center justify-start'>
                        <img src="../../src/assets/svg/contact.svg" className='w-[70%]' alt="" />
                    </div>
                    <div className="flex-1">
                        <ContactForm />
                    </div>
                </div>
            </div>

        </div>
    )
}

function ContactForm() {
    const { t } = useTranslation();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        // send to api later
        // ...
    }

    return (
        <form onSubmit={e => handleSubmit(e)} method="post" className='mb-[1rem]'>
            <h2 className='font-[Montserrat] font-semibold text-center text-3xl mb-[2rem]'>{t("homepage.contact_form.title")}</h2>
            <div className="grid gap-y-4">
                <div className='text-(--foreground) font-[Montserrat]'>
                    <label className="block text-sm font-semibold">{t("homepage.contact_form.name_input.label")}</label>
                    <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                        <div className="mr-3 ml-3">
                            <UserIcon className='h-full size-6' />
                        </div>
                        <input id="name" type="text" name="name" placeholder={t("homepage.contact_form.name_input.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                    </div>
                </div>
                <div className='text-(--foreground) font-[Montserrat]'>
                    <label className="block text-sm font-semibold">{t("homepage.contact_form.email_input.label")}</label>
                    <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                        <div className="mr-3 ml-3">
                            <AtSymbolIcon className='h-full size-6' />
                        </div>
                        <input id="email" type="text" name="email" placeholder={t("homepage.contact_form.email_input.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                    </div>
                </div>
                <div className='text-(--foreground) font-[Montserrat]'>
                    <label className="block text-sm font-semibold">{t("homepage.contact_form.message_input.label")}</label>
                    <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                        <div className="mr-3 ml-3 mt-3">
                            <EnvelopeIcon className=' size-6' />
                        </div>
                        <textarea id="message" name="message" placeholder={t("homepage.contact_form.message_input.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3 resize-none h-[10em]" />
                    </div>
                </div>
                <div className="flex justify-end font-[Montserrat] font-semibold">
                    <button type='submit' className='cursor-pointer w-full md:w-fit py-3 px-5 bg-(--foreground) text-(--background) rounded-lg'>{t("homepage.contact_form.submit_btn.text")}</button>
                </div>
            </div>
        </form>
    )
}