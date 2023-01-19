import { instance } from "./config";

export const getProducts = () => {
  return instance.get(`product/index`);
};
