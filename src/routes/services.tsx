import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useServices } from '../queries/queryHooks';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export const Route = createFileRoute('/services')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page ?? 1),
    }
  }
})

function RouteComponent() {
  const navigate = useNavigate();
  const { page } = Route.useSearch();
  const { data, isLoading } = useServices(page);

  const goToPage = (newPage: number) => {
    navigate({
      search: {
        // @ts-ignore
        page: newPage
      },
      replace: false,
    });
  };


  return (
    <div className="flex justify-center  font-[Montserrat]">
      <div className="w-6xl p-(--default-padding) pt-(--navbar-height) mt-(--default-padding) pb-(--default-padding)">
        <h1 className='text-5xl text-center mb-[1em] font-semibold'>Services</h1>
        <div className="grid gap-y-(--default-padding)">
          {
            isLoading ?
              <div className="">Loading...</div>
              :
              <div className="grid gap-y-9">
                <div className="flex flex-wrap justify-center gap-y-[5rem]">
                  {
                    data!.items!.map(service => (
                      <div className="flex justify-center items-center" style={{ width: "calc(100% / 3)" }}>
                        <div className="">
                          <h2 className='font-semibold text-3xl text-center mb-[1.5rem]'>{service.name}</h2>
                          <div className="bg-center bg-cover h-[300px] w-[300px] rounded-2xl" style={{ backgroundImage: `url("../../src/assets/${service.imageUrl}")` }}>

                          </div>
                        </div>

                      </div>
                    ))
                  }
                </div>
                <div className="flex justify-center mt-[2.5rem]">
                  <Pager totalPages={data!.totalPages} currentPage={page} onChange={(page) => goToPage(page)} />
                </div>
              </div>

          }
        </div>
      </div>
    </div>
  );

}

export function Pager({ totalPages, currentPage, onChange }:
  {
    totalPages: number;
    currentPage: number;
    onChange: (page: number) => void;
  }
) {
  const [page, setPage] = useState<number>(currentPage);

  const goPrev = () => {
    const newPage = page - 1;
    if (newPage < 1) {
      return;
    }
    else {
      setPage(newPage);
      onChange(newPage);
    }
  }

  const goNext = () => {
    const newPage = page + 1;
    if (newPage > totalPages) {
      return;
    }
    else {
      setPage(newPage);
      onChange(newPage);
    }
  }

  const goFirst = () => {
    const newPage = 1;
    setPage(newPage);
    onChange(newPage);
  }

  const goLast = () => {
    const newPage = totalPages;
    setPage(newPage);
    onChange(newPage);
  }

  return (
    <div className="flex gap-x-1 items-center">
      <ChevronDoubleLeftIcon className='size-6 cursor-pointer' onClick={goFirst} />
      <ChevronLeftIcon className='size-6 cursor-pointer' onClick={goPrev} />
      <div className="font-semibold">
        {page} of {totalPages}
      </div>
      <ChevronRightIcon className='size-6 cursor-pointer' onClick={goNext} />
      <ChevronDoubleRightIcon className='size-6 cursor-pointer' onClick={goLast} />
    </div>
  );
}