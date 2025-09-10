import { createFileRoute } from '@tanstack/react-router'
import { useWorkers } from '../api/queries';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/info')({
  component: InfoComponent,
})

function InfoComponent() {
  const { t } = useTranslation();
  const { data, isLoading } = useWorkers();

  return (
    <div className="flex justify-center font-[Montserrat] font-semibold">
      <div className="lg:mt-(--default-padding) p-[2rem] lg:p-(--default-padding)">
        <h1 className='text-5xl text-center mb-[1em] pt-[1rem] lg:pt-[0]'>{t("about.page_title")}</h1>
        <article className='text-justify'>
          <p className='pb-(--default-padding)'>
            {t("about.paragraph1")}
          </p>
          <p>
            <img src="../../src/assets/svg/info/_1.svg" className='hidden lg:block float-right pl-6' alt="" />
            {t("about.paragraph2")}</p>
          <p>
            <img src="../../src/assets/svg/info/_2.svg" className='hidden lg:block float-left pr-6' alt="" />
            {t("about.paragraph3")}</p>
        </article>
        <div className="w-full flex justify-center mt-(--default-padding)">
          {
            isLoading ?
              <div className="">Loading...</div>
              :
              <div className="flex justify-center flex-col md:flex-row gap-(--default-padding)">
                {
                  data!.map(worker => (
                    <div className="w-[200px]">
                      <div className="w-full h-[200px] bg-red-900 rounded-4xl bg-center bg-cover relative" style={{ backgroundImage: `url(../../src/assets/${worker.imageUrl})` }}>

                      </div>
                      <div className='text-(--foreground) text-sm text-center mt-[1rem]'>
                        {worker.description}
                      </div>
                    </div>

                  ))
                }
              </div>
          }

        </div>
      </div>

    </div>
  );
}
