import { createFileRoute, Link } from '@tanstack/react-router'
import homepageVideo from '../assets/video/homepage_video5.mp4'
import { useTranslation } from 'react-i18next'

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
            <div className="p-[3em] font-[Montserrat]">
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
            <div className='p-[3em] font-[Montserrat]'>
                <div className="overflow-hidden relative w-full h-[400px] bg-(--foreground) rounded-4xl">
                    <div className="absolute bottom-[0]">
                        <img className='h-[400px]' src="../../src/assets/svg/wrench.svg" alt="" />
                    </div>
                    <div className="absolute top-[4em] right-[3em]">
                        <span className='text-6xl text-(--background) font-semibold'>{t("homepage.panel1.text")}</span>
                    </div>
                    <div className="absolute bottom-[3em] right-[3em]">
                        <Link to='/' className='p-[0.5em] text-2xl font-semibold bg-(--background) rounded-xl'>{t("homepage.panel1.button_text")}</Link>
                    </div>
                </div>
            </div>
            <div className='p-[3em] font-[Montserrat]'>
                <div className="overflow-hidden relative w-full h-[400px] bg-(--foreground) rounded-4xl">
                    <div className="absolute top-[50%]" style={{ transform: "translateY(-50%)" }}>
                        <img className='h-[300px]' src="../../src/assets/svg/route.svg" alt="" />
                    </div>
                    <div className="absolute top-[4em] right-[3em]">
                        <span className='text-6xl text-(--background) font-semibold'>{t("homepage.panel2.text")}</span>
                    </div>
                    <div className="absolute bottom-[3em] right-[3em]">
                        <Link to='/' className='p-[0.5em] text-2xl font-semibold bg-(--background) rounded-xl'>{t("homepage.panel2.button_text")}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}