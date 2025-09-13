import {
  ArchiveBoxIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  useBrands,
  useSearchRecommendations,
  useShopSearch,
  type Brand,
} from "../api/queries";
import { useState, type ChangeEvent } from "react";
import { getTrackBackground, Range } from "react-range";
import Select, { type MultiValue } from "react-select";
import clsx from "clsx";
import { Pager } from "./services";
import { useAtom } from "jotai";
import { cartAtom } from "../state/atoms";
import type { ShopItem } from "../types";
import { addToCart } from "../functions/cart";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      textQuery: search.textQuery,
      sortBy: search.sortBy ?? "ByStock",
      page: Number(search.page ?? 1),
      minPrice: Number(search.minPrice ?? MIN_PRICE),
      maxPrice: Number(search.maxPrice ?? MAX_PRICE),
      hotPrice: Boolean(search.hotPrice ?? false),
      brands: Array.isArray(search.brands)
        ? // @ts-ignore
        search.brands.map(String)
        : search.brands
          ? search.brands
          : [],
      showInStock: Boolean(search.showInStock ?? false),
      showOutOfStock: Boolean(search.showOutOfStock ?? false),
    } as ShopSearchFilters;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchFilters = Route.useSearch();
  const [queryText, setQueryText] = useState<string>(searchFilters.textQuery);
  const [sortType, setSortType] = useState<SortType>(searchFilters.sortBy);
  // const { isLoading, data } = useSearchRecommendations();

  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

  const SORT_TYPES = [
    { label: t("shop.control_panel.sort_types.by_name"), value: "ByName" },
    {
      label: t("shop.control_panel.sort_types.by_name_desc"),
      value: "ByNameDescending",
    },
    { label: t("shop.control_panel.sort_types.by_price"), value: "ByPrice" },
    {
      label: t("shop.control_panel.sort_types.by_price_desc"),
      value: "ByPriceDescending",
    },
    { label: t("shop.control_panel.sort_types.by_stock"), value: "ByStock" },
  ];

  const search = (newFilters: ShopSearchFilters, page: number = 1) => {
    const updatedFilters = {
      ...newFilters,
      textQuery: queryText,
      sortBy: sortType,
      page: page,
    };

    navigate({
      search: updatedFilters as any,
      replace: true,
    });
  };

  return (
    <div className="flex justify-center  font-[Montserrat] min-h-[100vh]">
      <div className="w-[88rem] p-[2rem] lg:p-(--default-padding) lg:pt-(--navbar-height) lg:mt-(--default-padding) pb-(--default-padding)">
        <h1 className="text-5xl mt-[1rem] lg:mt-[0] text-center mb-[1em] font-semibold">
          {t("shop.page_title")}
        </h1>
        <div className="grid gap-y-(--default-padding)">
          <div className="">
            <div className="text-(--foreground) font-[Montserrat]">
              <div className="mt-2 text-(--foreground) h-[51px] flex border-(--foreground) border-[2px] rounded-xl bg-(--input-bg)">
                <div className="mr-3 ml-3">
                  <MagnifyingGlassIcon className="h-full size-6" />
                </div>
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      search(searchFilters);
                    }
                  }}
                  onChange={(e) => setQueryText(e.target.value)}
                  value={queryText}
                  name="username"
                  placeholder={t("shop.search_bar.placeholder")}
                  className="w-full outline-none pr-3 pb-3 pt-3"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div
              className={clsx({
                "flex-1": filtersOpen,
                hidden: !filtersOpen,
              })}
            >
              <FilterComponent
                onFilterApply={(f) => search(f)}
                initialFilters={searchFilters}
              />
            </div>
            <div
              className={clsx({
                "flex-3": filtersOpen,
                "w-full": !filtersOpen,
              })}
            >
              <div className="flex flex-col md:flex-row gap-x-4 justify-end cursor-pointer items-center py-6">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex gap-x-2 items-center font-semibold cursor-pointer"
                >
                  {filtersOpen
                    ? t("shop.control_panel.filter_toggle_btn.hide")
                    : t("shop.control_panel.filter_toggle_btn.show")}
                  <FunnelIcon className="size-4" />
                </button>
                <Select
                  options={SORT_TYPES}
                  defaultValue={SORT_TYPES.filter(
                    (tuple) => tuple.value == sortType
                  ).at(0)}
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
                      cursor: "pointer",
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
                      fontWeight: "600",
                    }),
                    valueContainer: (provided, state) => ({
                      ...provided,
                      paddingLeft: "3px",
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      paddingLeft: "5px",
                    }),
                    indicatorSeparator: (provided, state) => ({}),
                  }}
                />
              </div>
              <ShopItemList
                filtersOpen={filtersOpen}
                filters={searchFilters}
                onPageChange={(page) => search(searchFilters, page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterComponent({
  onFilterApply,
  initialFilters,
}: {
  onFilterApply: (newFilters: ShopSearchFilters) => void;
  initialFilters: ShopSearchFilters;
}) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ShopSearchFilters>(initialFilters);
  const [values, setValues] = useState([
    initialFilters.minPrice,
    initialFilters.maxPrice,
  ]);

  const applyFilters = (): void => {
    onFilterApply({ ...filters });
  };

  const setPriceValues = (newValues: number[]): void => {
    setValues(newValues);
    setFilters((prev) => ({
      ...prev,
      minPrice: newValues[0],
      maxPrice: newValues[1],
    }));
  };

  const handlePriceInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = Number(e.target.value);
    const newValues = [...values];
    newValues[index] = Math.min(Math.max(newVal, 0), MAX_PRICE);
    setValues(newValues);

    setFilters((prev) => ({
      ...prev,
      [index === 0 ? "minPrice" : "maxPrice"]: newVal,
    }));
  };

  const handleCheckboxChange = (
    field: keyof ShopSearchFilters,
    value: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-y-4">
      <div className="flex flex-col items-center">
        <h3 className="block w-full font-semibold text-lg">
          {t("shop.filters.price.title")}
        </h3>
        <div className="">
          <div className="flex gap-x-2">
            <div className="text-(--foreground) font-[Montserrat]">
              <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-lg bg-(--input-bg)">
                <input
                  type="number"
                  onChange={(e) => handlePriceInputChange(0, e)}
                  value={values[0]}
                  className="w-full outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className="text-(--foreground) font-[Montserrat]">
              <div className="mt-2 text-(--foreground) flex border-(--foreground) border-[2px] rounded-lg bg-(--input-bg)">
                <input
                  type="number"
                  onChange={(e) => handlePriceInputChange(1, e)}
                  value={values[1]}
                  className="w-full outline-none px-3 py-2"
                />
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
          onChange={setPriceValues}
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
              className="h-5 w-5 rounded-full flex items-center justify-center cursor-grab border-(--foreground) bg-(--background) border-[4px]"
            />
          )}
        />
      </div>
      <div className="">
        <CustomCheckbox
          labelText={t("shop.filters.stock.in_stock_title")}
          onChange={(val) => handleCheckboxChange("showInStock", val)}
          isChecked={filters.showInStock}
        />
        <CustomCheckbox
          labelText={t("shop.filters.stock.out_of_stock_title")}
          onChange={(val) => handleCheckboxChange("showOutOfStock", val)}
          isChecked={filters.showOutOfStock}
        />
      </div>
      <button
        onClick={applyFilters}
        className="bg-(--foreground) text-(--background) font-semibold rounded-xl h-[51px] cursor-pointer"
      >
        {t("shop.filters.apply_button.text")}
      </button>
    </div>
  );
}
export type ShopSearchFilters = {
  textQuery: string;
  page: number;
  minPrice: number;
  maxPrice: number;
  hotPrice: boolean;
  brands: string[];
  showInStock: boolean;
  showOutOfStock: boolean;
  sortBy: SortType;
};

export type SortType =
  | "ByName"
  | "ByNameDescending"
  | "ByPrice"
  | "byPriceDescending"
  | "ByStock";

export const defaultShopSearchFilters: ShopSearchFilters = {
  textQuery: "",
  page: 1,
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  hotPrice: false,
  brands: ["123", "222"],
  showInStock: true,
  showOutOfStock: true,
  sortBy: "ByStock",
};

export default function CustomCheckbox({
  onChange,
  labelText,
  isChecked,
}: {
  onChange: (checked: boolean) => void;
  labelText: string;
  isChecked: boolean;
}) {
  const [checked, setChecked] = useState(isChecked);

  const change = (e: ChangeEvent): void => {
    // @ts-ignore
    setChecked(e.target.checked);
    // @ts-ignore
    onChange(e.target.checked);
  };

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
          <div className="w-3 h-3 bg-(--foreground) rounded-xs"></div>
        )}
      </span>

      <span>{labelText}</span>
    </label>
  );
}

function ShopItemList({
  filters,
  filtersOpen,
  onPageChange,
}: {
  filters: ShopSearchFilters;
  filtersOpen: boolean;
  onPageChange: (page: number) => void;
}) {
  const { t } = useTranslation();
  const { data, isLoading } = useShopSearch(filters);
  const [cart, setCart] = useAtom(cartAtom);

  const addItemToCart = (item: ShopItem): void => {
    let copy = { ...cart };

    addToCart(copy, item)

    setCart(copy);
  };

  return (
    <div
      className={clsx({
        "md:pl-[4rem]": filtersOpen,
      })}
    >
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-y-(--default-padding)">
            {data!.items.map((item) => (
              <div
                className={clsx({
                  "opacity-50 pointer-events-none": !item.inStock,
                })}
              >
                <div className="flex flex-col sm:flex-row gap-x-(--default-padding)">
                  <div className="flex-1 flex items-center justify-center sm:justify-start">
                    <div
                      className="w-[250px] h-[250px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] bg-center bg-cover rounded-2xl md:rounded-4xl"
                      style={{
                        backgroundImage: `url("${item.imgUrl}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                  <div className="flex-3 pt-[2rem] sm:pt-[0] flex flex-col items-center sm:block">
                    <h2 className="block font-semibold text-xl mb-3 max-w-[200px] sm:max-w-auto">
                      {item.title}
                    </h2>
                    <article className="block font-normal text-lg max-w-[200px] sm:max-w-auto mb-[2rem] sm:mb-[0]">
                      {item.description}
                    </article>
                  </div>
                  <div className="flex-2 flex items-center justify-center sm:justify-end">
                    <div className="flex flex-col justify-center items-center gap-y-4">
                      {item.inStock ? (
                        <div className="flex gap-x-2 items-center">
                          <ArchiveBoxIcon className="size-4" />
                          <span>{t("shop.list_item.stock.in_stock")}</span>
                        </div>
                      ) : (
                        <div className="flex gap-x-2 items-center">
                          <ClockIcon className="size-4" />
                          <span className="font-normal">
                            {t("shop.list_item.stock.out_of_stock")}
                          </span>
                        </div>
                      )}
                      <span className="font-semibold">
                        {item.hotPrice ? (
                          <div className="text-center">
                            <div className="text-xl line-through decoration-[2px]">
                              {item.hotPrice.oldPrice}€
                            </div>
                            <div className="text-3xl flex gap-x-3 underline decoration-[2px] items-center">
                              <img
                                src="../../src/assets/svg/icons/hot-price.svg"
                                className="w-[30px]"
                              />
                              {item.hotPrice.newPrice}€
                            </div>
                          </div>
                        ) : (
                          <div className="text-3xl">{item.priceInEuro}€</div>
                        )}
                      </span>
                      <button
                        onClick={() => addItemToCart(item)}
                        className="hidden sm:block bg-(--foreground) text-(--background) font-semibold text-xl rounded-xl px-6 py-2 cursor-pointer"
                      >
                        {t("shop.list_item.add_to_cart_btn_text")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="sm:hidden pt-[2rem] flex justify-center">
                  <button
                    onClick={() => addItemToCart(item)}
                    className="bg-(--foreground) text-(--background) font-semibold text-xl rounded-xl px-6 py-3 cursor-pointer w-full max-w-[250px]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-(--default-padding)">
            <Pager
              totalPages={data!.totalPages}
              currentPage={filters.page}
              onChange={(page) => onPageChange(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
