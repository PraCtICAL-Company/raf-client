import { createFileRoute } from '@tanstack/react-router'
import { useProjects } from '../queries/queryHooks';

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useProjects();

  if (isLoading) {
    return <div className="">Loading</div>
  }

  return (
    <div className="pt-(--nabvar-height) flex justify-center  font-[Montserrat]">
      <div className="w-7xl pt-(--default-padding) pb-(--default-padding)">
        <h1 className='text-5xl text-center mb-[1em] font-semibold'>Projects</h1>
        <div className="grid gap-y-(--default-padding)">
          {
            data!.map(project => (
              <div className="w-full h-[400px] bg-(--foreground) overflow-hidden rounded-2xl relative">
                <img src={`../../src/assets/${project.imageUrl}`} alt="" className='absolute' />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
