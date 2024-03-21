import { defaultShop } from "./shop";
import { defaultServices } from "./services";
import { defaultProfessional } from "./professionals";

export const BARBER_SHOP_DATA = [
  {
    title: "shop",
    items: defaultShop,
  },
  {
    title: "professionals",
    items: defaultProfessional,
  },
  {
    title: "services",
    items: defaultServices,
  },
  {
    title: "appointments",
    items: {},
  },
];
