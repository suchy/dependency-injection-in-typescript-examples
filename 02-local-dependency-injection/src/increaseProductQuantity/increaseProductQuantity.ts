import { fetchProduct, saveProduct } from "../repository";
import { IncreaseProductQuantityFactory } from "./IncreaseProductQuantityFactory";

export const increaseProductQuantity = IncreaseProductQuantityFactory(
  fetchProduct,
  saveProduct
);
