import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next"
import { NavbarScheduleComponent } from "./navbar";

export default function MobileFooter() {
    const { t } = useTranslation();

    return (
        <div
            className="w-full bg-(--foreground) grid pb-(--mobile-navbar-height)"
            style={{ height: "calc(var(--mobile-navbar-height) + var(--mobile-footer-height))" }}>
            {/* <div className="flex">
                <div className="flex gap-x-4">
                    <img src="../../src/assets/svg/socials/instagram.svg" alt="" className="w-[20px]" />
                    <img src="../../src/assets/svg/socials/tiktok.svg" alt="" className="w-[20px]" />
                    <img src="../../src/assets/svg/socials/youtube.svg" alt="" className="w-[20px]" />
                    <img src="../../src/assets/svg/socials/facebook.svg" alt="" className="w-[20px]" />
                </div>
                <div className="ml-[3em] flex gap-x-9 items-center font-[Montserrat] text-(--background) font-semibold text-xs">
                    <Link to="/">{t("footer.socials.text1")}</Link>
                    <Link to="/privacy-policy">{t("footer.socials.text2")}</Link>
                </div>
            </div>
            <NavbarScheduleComponent />
            <div className="text-[0.625rem] leading-[1.2em] font-semibold font-[Montserrat] text-(--background)">
                <div className="">{t("footer.address.row1")}</div>
                <div className="">{t("footer.address.row2")}</div>
                <div className="">{t("footer.address.row3")}</div>
            </div> */}
            <div className="flex p-[1.5rem] pb-[0] text-(--background)  justify-between">
                <div className="font-[Montserrat] text-[0.625rem] leading-[1.2em] font-semibold ">
                    <NavbarScheduleComponent />
                </div>
                <div className="text-[0.625rem] leading-[1.2em] font-semibold text-center font-[Montserrat] text-(--background)">
                    <div className="">{t("footer.address.row1")}</div>
                    <div className="">{t("footer.address.row2")}</div>
                    <div className="">{t("footer.address.row3")}</div>
                </div>
            </div>
            <div className="flex gap-x-9 px-[1.5rem] items-center font-[Montserrat] text-(--background) font-semibold text-xs">
                <Link to="/">{t("footer.socials.text1")}</Link>
                <Link to="/privacy-policy">{t("footer.socials.text2")}</Link>
            </div>
            <div className="flex gap-x-4 justify-around items-center">
                <a className="h-fit" href="https://google.com">
                    <img src="../../src/assets/svg/socials/instagram.svg" alt="" className="w-[25px]" />
                </a>
                <a className="h-fit" href="https://google.com">
                    <img src="../../src/assets/svg/socials/tiktok.svg" alt="" className="w-[25px]" />
                </a>
                <a className="h-fit" href="https://google.com">

                    <img src="../../src/assets/svg/socials/youtube.svg" alt="" className="w-[25px]" />
                </a>
                <a className="h-fit" href="https://google.com">
                    <img src="../../src/assets/svg/socials/facebook.svg" alt="" className="w-[25px]" />
                </a>
            </div>
        </div>
    )
}