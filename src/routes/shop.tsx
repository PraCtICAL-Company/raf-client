import { ArchiveBoxIcon, ClockIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next';
import { useBrands, useSearchRecommendations, useShopSearch, type Brand, type ShopItem } from '../queries/queryHooks';
import { useState, type ChangeEvent } from 'react';
import { getTrackBackground, Range } from "react-range";
import Select, { type MultiValue } from 'react-select'
import clsx from 'clsx';
import { Pager } from './services';
import { useAtom } from 'jotai';
import { cartAtom } from '../state/atoms';

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

export const Route = createFileRoute('/shop')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      textQuery: search.textQuery,
      sortBy: search.sortBy ?? "ByStock",
      page: Number(search.page ?? 1),
      minPrice: Number(search.minPrice ?? MIN_PRICE),
      maxPrice: Number(search.maxPrice ?? MAX_PRICE),
      hotPrice: Boolean(search.hotPrice ?? false),
      brands: Array.isArray(search.brands) ?
        // @ts-ignore
        search.brands.map(String)
        :
        search.brands
          ? search.brands
          : [],
      showInStock: Boolean(search.showInStock ?? false),
      showOutOfStock: Boolean(search.showOutOfStock ?? false),
    } as ShopSearchFilters
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchFilters = Route.useSearch();
  const filterSave = searchFilters;
  const [queryText, setQueryText] = useState<string>(searchFilters.textQuery);
  const [sortType, setSortType] = useState<SortType>(searchFilters.sortBy);
  const { isLoading, data } = useSearchRecommendations();

  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

  const SORT_TYPES = [
    { label: "Sort by name", value: "ByName" },
    { label: "Sort by name descending", value: "ByNameDescending" },
    { label: "Cheap first", value: "ByPrice" },
    { label: "Expensive first", value: "ByPriceDescending" },
    { label: "In stock first", value: "ByStock" },
  ]

  const search = (newFilters: ShopSearchFilters, page: number = 1) => {
    newFilters.textQuery = queryText;
    newFilters.sortBy = sortType;
    newFilters.page = page;
    navigate({
      // @ts-ignore
      search: newFilters,
      replace: true,
    });
  };

  return (
    <div className="flex justify-center  font-[Montserrat]">
      <div className="w-[88rem] p-(--default-padding) pt-(--navbar-height) mt-(--default-padding) pb-(--default-padding)">
        <h1 className='text-5xl text-center mb-[1em] font-semibold'>Shop</h1>
        <div className="grid gap-y-(--default-padding)">
          <div className="">
            <div className='text-(--foreground) font-[Montserrat]'>
              <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-(--input-bg)">
                <div className="mr-3 ml-3">
                  <MagnifyingGlassIcon className='h-full size-6' />
                </div>
                <input id="username" type="text" onChange={(e) => setQueryText(e.target.value)} value={queryText} name="username" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none pr-3 pb-3 pt-3" />
              </div>
            </div>
            {
              isLoading ?
                <div className="">Loading</div>
                :
                <div className="flex flex-wrap pt-6 gap-2">
                  {
                    data!.map(rec => (
                      <div onClick={() => setQueryText(rec)} className=" cursor-pointer px-3 py-2 border-(--foreground) border-[2px] rounded-lg bg-(--input-bg) w-fit">{rec}</div>
                    ))
                  }
                </div>
            }
          </div>
          <div className="flex">
            <div className={clsx({
              "flex-1": filtersOpen,
              "hidden": !filtersOpen
            })}>
              <FilterComponent onFilterApply={(f) => search(f)} initialFilters={searchFilters} />
            </div>
            <div className={clsx({
              "flex-3": filtersOpen,
              "w-full": !filtersOpen
            })}>
              <div className="flex gap-x-4 justify-end cursor-pointer items-center">
                <button onClick={() => setFiltersOpen(!filtersOpen)} className='flex gap-x-2 items-center font-semibold cursor-pointer'>
                  {
                    filtersOpen ?
                      "Hide filters"
                      :
                      "Show filters"
                  }
                  <FunnelIcon className='size-4' />
                </button>
                <Select
                  options={SORT_TYPES}
                  defaultValue={SORT_TYPES.filter(tuple => tuple.value == sortType).at(0)}
                  onChange={(val) => setSortType(val!.value as SortType)}
                  styles={{
                    container: (provided, state) => ({
                      ...provided,
                    }),
                    dropdownIndicator: (provided, state) => ({
                      // ...provided,
                      // display: "flex",
                      // backgroundColor: "transparent",
                    }),
                    control: (provided, state) => ({
                      // ...provided,
                      display: "flex",
                      backgroundColor: "transparent",
                    }),
                    option: (provided, state) => ({
                      //...provided,
                      backgroundColor: "var(--background)",
                      fontWeight: "500",
                      padding: "5px 10px",
                      cursor: "pointer"
                    }),
                    menu: (provided, state) => ({
                      ...provided,
                      backgroundColor: "var(--background)",
                      minWidth: "200px",
                    }),
                    singleValue: (provided, state) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderRadius: "0.25rem",
                      fontWeight: "600"
                    }),
                    valueContainer: (provided, state) => ({
                      ...provided,
                      paddingLeft: "3px"
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      paddingLeft: "5px"
                    }),
                    indicatorSeparator: (provided, state) => ({

                    }),
                  }} />
              </div>
              <ShopItemList filtersOpen={filtersOpen} filters={searchFilters} onPageChange={(page) => search(searchFilters, page)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

function FilterComponent({ onFilterApply, initialFilters }:
  {
    onFilterApply: (newFilters: ShopSearchFilters) => void;
    initialFilters: ShopSearchFilters;
  }
) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ShopSearchFilters>(initialFilters)
  const [values, setValues] = useState([initialFilters.minPrice, initialFilters.maxPrice]);
  const { data, isLoading } = useBrands(initialFilters.brands);

  const applyFilters = (): void => {
    // ...
    onFilterApply(filters);
  }

  const setPriceValues = (values: number[]): void => {
    setValues(values);

    filters.minPrice = values[0];
    filters.maxPrice = values[1];
  }

  const handlePriceInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    const newValues = [...values];
    newValues[index] = Math.min(Math.max(newVal, 0), MAX_PRICE);
    setValues(newValues);

    if (index === 0) {
      filters.minPrice = newVal;
    } else {
      filters.maxPrice = newVal;
    }

  };

  const handleFilterChange = () => {
    const oldFilters = filters;
    setFilters(oldFilters);
  };

  const handleBrandChange = (newOptions: MultiValue<Brand>): void => {
    const oldFilters = filters;
    oldFilters.brands = newOptions.map(tuple => tuple.value);
    console.log(newOptions);

  }

  return (
    <div className="grid gap-y-4">
      <div className="flex flex-col items-center">
        <h3 className='block w-full font-semibold text-lg'>Cost, €</h3>
        <div className="">
          <div className="flex gap-x-2">
            <div className='text-(--foreground) font-[Montserrat]'>
              <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-lg bg-(--input-bg)">
                <input id="username" type="number" onChange={(e) => handlePriceInputChange(0, e)} value={values[0]} name="username" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none px-3 py-2" />
              </div>
            </div>
            <div className='text-(--foreground) font-[Montserrat]'>
              <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-lg bg-(--input-bg)">
                <input id="username" type="number" onChange={(e) => handlePriceInputChange(1, e)} value={values[1]} name="username" placeholder={t("homepage.contact_form.input2.placeholder")} className="w-full outline-none px-3 py-2" />
              </div>
            </div>
          </div>
        </div>
        <Range
          draggableTrack
          values={values}
          step={1}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onChange={(values) => {
            setPriceValues(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "calc(100% - 1rem)",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "var(--foreground)", "#ccc"],
                    min: MIN_PRICE,
                    max: MAX_PRICE,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className={`h-5 w-5 rounded-full flex items-center justify-center cursor-grab border-(--foreground) bg-(--background) border-[4px]`}
            >
              {/* <div className="absolute -bottom-6 text-sm text-gray-700">
                {values[index]}
              </div> */}
            </div>
          )}
        />
      </div>
      <CustomCheckbox labelText='Hot price' onChange={(val) => { filters.hotPrice = val; handleFilterChange() }} isChecked={filters.hotPrice} />
      <div className="">
        <h3 className='block w-full font-semibold text-lg mb-2'>Brands</h3>
        {
          isLoading ?
            <div className="">Loading...</div>
            :
            <div className="">
              <Select
                options={data?.options}
                defaultValue={data!.activeOptionIndexes.map(idx => data!.options[idx])}
                isMulti
                onChange={(opt) => handleBrandChange(opt)}
                styles={{
                  control: (provided, state) => ({
                    // ...provided,
                    display: "flex",
                    backgroundColor: "var(--background)",
                    border: "2px solid var(--foreground)",
                    borderRadius: "0.5rem",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: "var(--background)",
                    fontWeight: "600",
                    cursor: "pointer"
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    backgroundColor: "var(--background)",
                  }),
                  multiValue: (provided, state) => ({
                    ...provided,
                    backgroundColor: "var(--foreground)",
                    color: "#ffffff",
                    borderRadius: "0.25rem",
                  }),
                  multiValueLabel: (provided, state) => ({
                    ...provided,
                    color: "#ffffff"
                  }),
                  valueContainer: (provided, state) => ({
                    ...provided,
                    paddingLeft: "3px"
                  }),
                  placeholder: (provided, state) => ({
                    ...provided,
                    paddingLeft: "5px"
                  }),
                }} />
            </div>
        }


      </div>
      <div className="">
        <h3 className='block w-full font-semibold text-lg mb-2'>Stock</h3>
        <CustomCheckbox labelText='Show in stock' onChange={(val) => { filters.showInStock = val; handleFilterChange() }} isChecked={filters.showInStock} />
        <CustomCheckbox labelText='Show out of stock' onChange={(val) => { filters.showOutOfStock = val; handleFilterChange() }} isChecked={filters.showOutOfStock} />
      </div>
      <div className=""></div>
      <button onClick={applyFilters} className='bg-(--foreground) text-(--background) font-semibold rounded-xl h-[51px] cursor-pointer'>
        Apply
      </button>
    </div>
  );
}

export type ShopSearchFilters = {
  textQuery: string,
  page: number,
  minPrice: number,
  maxPrice: number,
  hotPrice: boolean,
  brands: string[]
  showInStock: boolean,
  showOutOfStock: boolean,
  sortBy: SortType
}

export type SortType =
  "ByName" | "ByNameDescending" |
  "ByPrice" | "byPriceDescending" |
  "ByStock"

export const defaultShopSearchFilters: ShopSearchFilters = {
  textQuery: "",
  page: 1,
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  hotPrice: false,
  brands: ["123", "222"],
  showInStock: true,
  showOutOfStock: true,
  sortBy: "ByStock"
}

export default function CustomCheckbox({ onChange, labelText, isChecked }:
  {
    onChange: (checked: boolean) => void;
    labelText: string;
    isChecked: boolean;
  }
) {
  const [checked, setChecked] = useState(isChecked);

  const change = (e: ChangeEvent): void => {
    // @ts-ignore
    setChecked(e.target.checked)
    // @ts-ignore
    onChange(e.target.checked);
  }

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={change}
        className="hidden"
      />
      <span
        className={`w-5 h-5 flex items-center justify-center border-[2px] border-(--foreground) rounded transition relative bg-(--input-bg)`}
      >
        {checked && (
          <div className="w-3 h-3 bg-(--foreground) rounded-xs">

          </div>
        )}
      </span>

      <span>{labelText}</span>
    </label>
  );
}

function ShopItemList({ filters, filtersOpen, onPageChange }:
  {
    filters: ShopSearchFilters;
    filtersOpen: boolean;
    onPageChange: (page: number) => void;
  }
) {
  const { data, isLoading } = useShopSearch(filters);
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
    <div className={clsx({
      "pl-[4rem]": filtersOpen
    })}>
      {
        isLoading ?
          <div className="">Loading...</div>
          :
          <div className="">
            <div className="grid gap-y-(--default-padding)">
              {
                data!.items.map(item => (
                  <div className={clsx("flex gap-x-(--default-padding)", {
                    "opacity-50 pointer-events-none": !item.inStock
                  })}>
                    <div className="flex-1 flex items-center justify-start">
                      <div className="w-[200px] h-[200px] bg-center bg-cover rounded-4xl" style={{ backgroundImage: `url("../../src/assets/${item.imgUrl}")` }}></div>
                    </div>
                    <div className="flex-3">
                      <h2 className='font-semibold text-xl mb-3'>
                        {
                          item.title
                        }
                      </h2>
                      <article className='font-normal text-lg'>
                        {
                          item.description
                        }
                      </article>
                    </div>
                    <div className="flex-2 flex items-center justify-end">
                      <div className="flex flex-col justify-center items-center gap-y-4">
                        {
                          item.inStock ?
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
                            item.hotPrice ?
                              <div className="text-center">
                                <div className='text-xl line-through decoration-[2px]'>{item.hotPrice.oldPrice}€</div>
                                <div className='text-3xl flex gap-x-3 underline decoration-[2px] items-center'>
                                  <img src="../../src/assets/svg/icons/hot-price.svg" className='w-[30px]' />
                                  {item.hotPrice.newPrice}€
                                </div>
                              </div>
                              :
                              <div className="text-3xl">{item.priceInEuro}€</div>

                          }
                        </span>
                        <button onClick={() => addToCart(item)} className='bg-(--foreground) text-(--background) font-semibold text-xl rounded-xl px-6 py-2 cursor-pointer'>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="flex justify-center pt-(--default-padding)">
              <Pager totalPages={data!.totalPages} currentPage={filters.page} onChange={(page) => onPageChange(page)} />
            </div>

          </div>

      }
    </div>
  )
}