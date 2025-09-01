import { createFileRoute } from '@tanstack/react-router'
import homepageVideo from '../assets/video/homepage_video5.mp4'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { t } = useTranslation();

    return (
        <div>
            <video src={homepageVideo} muted className="w-full"></video>
        </div>
    )
}