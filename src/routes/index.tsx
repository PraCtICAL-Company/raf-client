import { createFileRoute, Link } from '@tanstack/react-router'
import homepageVideo from '../assets/video/homepage_video5.mp4'
import { useTranslation } from 'react-i18next'
import { UserIcon } from '@heroicons/react/20/solid';

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="w-[100vw] absolute top-(--navbar-height) pt-6 flex justify-center">
                <span className='text-3xl text-(--background) font-[Montserrat] font-semibold'>
                    {t("video_overlay_text")}
                </span>
            </div>
            <video src={homepageVideo} autoPlay muted className="w-full"></video>
            <div className="p-(--default-padding) font-[Montserrat]">
                <p className='text-2xl font-semibold color-(--foreground)'>
                    {t("homepage.teaser_text1")}
                    <br />
                    {t("homepage.teaser_text2")}
                    <br />
                    {t("homepage.teaser_text3")}
                    <br />
                    {t("homepage.teaser_text4")}
                    <br />
                    {t("homepage.teaser_text5")}
                </p>
            </div>
            <div className="grid grid-cols-6 py-[2em]">
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
            <div className='p-(--default-padding) font-[Montserrat]'>
                <div className="overflow-hidden relative w-full h-[400px] bg-(--foreground) rounded-4xl">
                    <div className="absolute bottom-[0]">
                        <img className='h-[400px]' src="../../src/assets/svg/wrench.svg" alt="" />
                    </div>
                    <div className="absolute top-[4em] right-(--default-padding)">
                        <span className='text-6xl text-(--background) font-semibold'>{t("homepage.panel1.text")}</span>
                    </div>
                    <div className="absolute bottom-(--default-padding) right-(--default-padding)">
                        <Link to='/' className='p-[0.5em] text-2xl font-semibold bg-(--background) rounded-xl'>{t("homepage.panel1.button_text")}</Link>
                    </div>
                </div>
            </div>
            <div className='p-(--default-padding) font-[Montserrat]'>
                <div className="overflow-hidden relative w-full h-[400px] bg-(--foreground) rounded-4xl">
                    <div className="absolute top-[50%]" style={{ transform: "translateY(-50%)" }}>
                        <img className='h-[300px]' src="../../src/assets/svg/route.svg" alt="" />
                    </div>
                    <div className="absolute top-[4em] right-(--default-padding)">
                        <span className='text-6xl text-(--background) font-semibold'>{t("homepage.panel2.text")}</span>
                    </div>
                    <div className="absolute bottom-(--default-padding) right-(--default-padding)">
                        <Link to='/' className='p-[0.5em] text-2xl font-semibold bg-(--background) rounded-xl'>{t("homepage.panel2.button_text")}</Link>
                    </div>
                </div>
            </div>
            <div className="p-(--default-padding) flex justify-between">
                <img src="../../src/assets/svg/contact.svg" alt="" className='w-[40vw]' />
                <div className="w-[50%]">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

function ContactForm() {
    const { t } = useTranslation();

    return (
        <div className="grid gap-y-4">
            <div className='text-(--foreground) font-[Montserrat]'>
                <label className="block text-sm font-semibold">{t("homepage.contact_form.input1.label")}</label>
                <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                    <div className="mr-3 ml-3">
                        <UserIcon className='h-full size-6' />
                    </div>
                    <input id="price" type="text" name="price" placeholder={t("homepage.contact_form.input1.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                </div>
            </div>
            <div className='text-(--foreground) font-[Montserrat]'>
                <label className="block text-sm font-semibold">{t("homepage.contact_form.input2.label")}</label>
                <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                    <div className="mr-3 ml-3">
                        <UserIcon className='h-full size-6' />
                    </div>
                    <input id="price" type="text" name="price" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                </div>
            </div>
            <div className='text-(--foreground) font-[Montserrat]'>
                <label className="block text-sm font-semibold">{t("homepage.contact_form.input3.label")}</label>
                <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                    <div className="mr-3 ml-3 mt-3">
                        <UserIcon className=' size-6' />
                    </div>
                    <textarea id="price" name="price" placeholder={t("homepage.contact_form.input3.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3 resize-none h-[10em]" />
                </div>
            </div>
            <div className="flex justify-end font-[Montserrat] font-semibold">
                <button className='cursor-pointer py-3 px-5 bg-(--foreground) text-(--background) rounded-lg'>{t("homepage.contact_form.button.text")}</button>
            </div>
        </div>
    )
}