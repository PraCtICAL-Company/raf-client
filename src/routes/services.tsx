import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useServices, useShopItemRecommendation, type Service, type ShopItem } from '../queries/queryHooks';
import { ArchiveBoxIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, PhoneIcon, UserIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { cartAtom } from '../state/atoms';

export const Route = createFileRoute('/services')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page ?? 1),
    }
  }
})

Modal.setAppElement('#root')

const modalStyles: Modal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .4)",
    backdropFilter: "blur(20px)"
  },
  content: {
    top: '50%',
    left: '50%',
    width: '50vw',
    height: 'fit-content',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--background)',
    borderRadius: '1.5rem',
    padding: '2rem',
    overflow: "hidden"
  },
};

function RouteComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { page } = Route.useSearch();
  const { data, isLoading } = useServices(page);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<Service>();
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState<boolean>(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState<boolean>(false);

  const goToPage = (newPage: number) => {
    navigate({
      search: {
        // @ts-ignore
        page: newPage
      },
      replace: false,
    });
  };

  const handleCommit = (): void => {
    console.log(name);
    console.log(phone);
    console.log(service);
  }

  return (
    <div className="">
      {
        service && (
          <div className="">
            <Modal
              isOpen={aboutModalIsOpen}
              closeTimeoutMS={200}
              style={modalStyles}
              onRequestClose={() => setAboutModalIsOpen(false)}
            >
              <button onClick={() => setAboutModalIsOpen(false)} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                <XMarkIcon className='h-full size-7' />
              </button>
              <h1 className="text-4xl font-[Montserrat] font-semibold text-left mb-[2rem]">
                {
                  service!.name
                }
              </h1>
              <div className="flex">
                <div className="flex-1">
                  <div className="h-[150px] w-[150px] bg-cover bg-center rounded-3xl" style={{ backgroundImage: `url("../../src/assets/${service!.imageUrl}")` }}></div>
                </div>
                <div className="flex-2 font-[Montserrat] text-lg">
                  {
                    service!.description
                  }
                </div>
              </div>
              <div className="flex items-center justify-end font-[Montserrat] mt-[1rem]">
                <button onClick={() => setOrderModalIsOpen(true)} className="px-9 py-2 cursor-pointer rounded-xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold">
                  {t("services.info_modal.button_text")}
                </button>
              </div>
            </Modal>
            <Modal
              isOpen={orderModalIsOpen}
              closeTimeoutMS={200}
              style={modalStyles}
              onRequestClose={() => setOrderModalIsOpen(false)}
            >
              <div className=""></div>
              <button onClick={() => setOrderModalIsOpen(false)} className="absolute right-[2rem] top-[2rem] cursor-pointer">
                <XMarkIcon className='h-full size-7' />
              </button>
              <h1 className="text-4xl font-[Montserrat] font-semibold text-left mb-[1rem]">
                {
                  service!.name
                }
              </h1>
              <div className="mb-[2rem] font-[Montserrat] font-medium">
                {
                  service!.description
                }
              </div>
              <div className="flex">
                <div className="flex-1 flex items-center justify-start">
                  <img src="../../src/assets/svg/frame-wrench.svg" className=" h-[200px]" />
                </div>
                <div className="flex-1">
                  <div className="grid gap-y-4">
                    <div className='text-(--foreground) font-[Montserrat]'>
                      <label className="block text-sm font-semibold">{t("services.order_modal.name_input.label")}</label>
                      <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                        <div className="mr-3 ml-3">
                          <UserIcon className='h-full size-6' />
                        </div>
                        <input onChange={(e) => setName(e.target.value)} id="username" type="text" name="username" placeholder={t("services.order_modal.name_input.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                      </div>
                    </div>
                    <div className='text-(--foreground) font-[Montserrat]'>
                      <label className="block text-sm font-semibold">{t("services.order_modal.phone_input.label")}</label>
                      <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-[#E5E0D2]">
                        <div className="mr-3 ml-3">
                          <PhoneIcon className='h-full size-6' />
                        </div>
                        <input onChange={(e) => setPhone(e.target.value)} id="username" type="text" name="username" placeholder={t("services.order_modal.phone_input.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button onClick={() => handleCommit()} className="w-fit font-[Montserrat] px-9 py-2 cursor-pointer rounded-xl text-lg flex items-center justify-center bg-(--foreground) text-(--background) font-semibold">
                        {t("services.order_modal.button_text")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )
      }

      <div className="flex justify-center font-[Montserrat]">
        <div className="w-6xl p-(--default-padding) pt-(--navbar-height) mt-(--default-padding) pb-(--default-padding)">
          <h1 className='text-5xl text-center mb-[1em] font-semibold'>{t("services.page_title")}</h1>
          <div className="grid gap-y-(--default-padding)">
            {
              isLoading ?
                <div className="">Loading...</div>
                :
                <div className="grid gap-y-9">
                  <div className="flex flex-wrap justify-center gap-y-[5rem]">
                    {
                      data!.items!.map(service => (
                        <div onClick={() => { setService(service); setAboutModalIsOpen(true) }} className="flex justify-center items-center cursor-pointer" style={{ width: "calc(100% / 3)" }}>
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
                  <div className="">
                    <h1 className='font-[Montserrat] text-4xl font-semibold text-center my-[3rem]'>{t("services.recommendation_title")}</h1>
                    <RecommendationComponent />
                  </div>
                </div>

            }
          </div>
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

function RecommendationComponent() {
  const { data, isLoading } = useShopItemRecommendation();
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (item: ShopItem): void => {
    let copy = cart;

    for (let i = 0; i < copy.items.length; i++) {
      if (copy.items[i].itemType.id == item.id) {
        copy.items[i].itemCount += 1;
        return;
      }
    }

    copy.items.push({ itemCount: 1, itemType: item })
    setCart(copy);
  }

  return (
    <div className="">
      {
        isLoading ?
          <div className="">Loading...</div>
          :
          <div className="flex gap-x-(--default-padding)">
            <div className="flex-1 flex items-center justify-start">
              <div className="w-[200px] h-[200px] bg-center bg-cover rounded-4xl" style={{ backgroundImage: `url("../../src/assets/${data!.imgUrl}")` }}></div>
            </div>
            <div className="flex-3">
              <h2 className='font-semibold text-xl mb-3'>
                {
                  data!.title
                }
              </h2>
              <article className='font-normal text-lg'>
                {
                  data!.description
                }
              </article>
            </div>
            <div className="flex-2 flex items-center justify-end">
              <div className="flex flex-col justify-center items-center gap-y-4">
                {
                  data!.inStock ?
                    <div className="flex gap-x-2 items-center">
                      <ArchiveBoxIcon className='size-4' />
                      <span>In stock</span>
                    </div>
                    :
                    <div className="flex gap-x-2 items-center">
                      <ClockIcon className='size-4' />
                      <span className='font-normal'>Out of stock</span>
                    </div>
                }
                <span className='font-semibold'>
                  {
                    data!.hotPrice ?
                      <div className="text-center">
                        <div className='text-xl line-through decoration-[2px]'>{data!.hotPrice.oldPrice}€</div>
                        <div className='text-3xl flex gap-x-3 underline decoration-[2px] items-center'>
                          <img src="../../src/assets/svg/icons/hot-price.svg" className='w-[30px]' />
                          {data!.hotPrice.newPrice}€
                        </div>
                      </div>
                      :
                      <div className="text-3xl">{data!.priceInEuro}€</div>

                  }
                </span>
                <button onClick={() => addToCart(data!)} className='bg-(--foreground) text-(--background) font-semibold text-xl rounded-xl px-6 py-2 cursor-pointer'>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
      }
    </div>


  );
}