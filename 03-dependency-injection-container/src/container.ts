import { AwilixContainer, createContainer, asFunction, asValue } from "awilix";
import { IncreaseProductQuantityFactory } from "./increaseProductQuantity/IncreaseProductQuantityFactory";
import { ServerFactory } from "./server";
import { fetchProduct, saveProduct } from "./repository";

let container: AwilixContainer;

export function getContainer() {
  if (container) {
    return container;
  }

  const dependencies = {
    fetchProduct: asValue(fetchProduct),
    saveProduct: asValue(saveProduct),
    increaseProductQuantity: asFunction(IncreaseProductQuantityFactory),
    server: asFunction(ServerFactory),
  };

  container = createContainer();

  container.register(dependencies);

  return container;
}
