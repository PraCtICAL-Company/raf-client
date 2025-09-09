import { createFileRoute, Link } from '@tanstack/react-router'
import { useProjects } from '../queries/queryHooks';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();
  const { data, isLoading } = useProjects();

  if (isLoading) {
    return <div className="">Loading</div>
  }

  return (
    <div className="flex justify-center  font-[Montserrat]">
      <div className="w-[88rem] p-(--default-padding) pt-(--navbar-height) mt-(--default-padding) pb-(--default-padding)">
        <h1 className='text-5xl text-center mb-[1em] font-semibold'>{t("projects.page_title")}</h1>
        <div className="grid gap-y-(--default-padding)">
          {
            data!.map(project => (
              <Link to={project.clickUrl} className="w-full h-[350px] bg-(--foreground) overflow-hidden rounded-2xl relative">
                <img src={`../../src/assets/${project.imageUrl}`} alt="" className='absolute bottom-[0]' />
                <div className="absolute top-[2rem] right-[2rem] text-5xl text-(--background) font-semibold w-[50%] text-right">
                  {project.text}
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}
