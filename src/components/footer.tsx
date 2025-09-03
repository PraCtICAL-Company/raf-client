import { useTranslation } from "react-i18next"

export default function Footer() {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-(--foreground) h-[60px] flex items-center justify-between px-[3em]">
            <div className="flex">
                <div className="flex gap-x-4">
                    <img src="../../src/assets/svg/socials/instagram.svg" alt="" className="w-[20px]" />
                    <img src="../../src/assets/svg/socials/tiktok.svg" alt="" className="w-[20px]" />
                    <img src="../../src/assets/svg/socials/youtube.svg" alt="" className="w-[20px]" />
                    <img src="../../src/assets/svg/socials/facebook.svg" alt="" className="w-[20px]" />
                </div>
                <div className="ml-[3em] flex gap-x-9 items-center font-[Montserrat] text-(--background) font-semibold text-xs">
                    <span>{t("footer.socials.text1")}</span>
                    <span>{t("footer.socials.text2")}</span>
                </div>
            </div>
            <div className="text-[0.625rem] leading-[1.2em] font-semibold font-[Montserrat] text-(--background)">
                <div className="">{t("footer.address.row1")}</div>
                <div className="">{t("footer.address.row2")}</div>
                <div className="">{t("footer.address.row3")}</div>
            </div>
        </div>
    )
}