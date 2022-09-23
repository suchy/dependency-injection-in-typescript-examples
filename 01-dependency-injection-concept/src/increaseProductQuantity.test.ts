import { beforeEach, describe, expect, it, vi } from "vitest";

import { increaseProductQuantity } from "./increaseProductQuantity";
import { Product } from "./product";

describe("increaseProductQuantity", () => {
  let saveProduct: () => Promise<void>;

  let product: Product;

  beforeEach(() => {
    product = {
      name: "Storm Trooper figure",
      productId: "product-uuid",
      quantity: 1,
    };

    saveProduct = vi.fn(() => Promise.resolve());
  });

  it("should return product with updated quantity", async () => {
    const fetchProduct = vi.fn(() => Promise.resolve(product));

    const updatedProduct = await increaseProductQuantity(
      fetchProduct,
      saveProduct,
      "product-uuid",
      3
    );

    expect(updatedProduct).toStrictEqual({ ...product, quantity: 4 });
  });

  it("should throw an error if quantity is lower or equal 0", async () => {
    const fetchProduct = vi.fn(() => Promise.resolve(product));

    expect(() =>
      increaseProductQuantity(fetchProduct, saveProduct, "product-uuid", 0)
    ).rejects.toThrow();

    expect(() =>
      increaseProductQuantity(fetchProduct, saveProduct, "product-uuid", -1)
    ).rejects.toThrow();
  });

  it("should throw an error if product was not found", async () => {
    const fetchProduct = vi.fn(() => Promise.resolve(undefined));

    expect(() =>
      increaseProductQuantity(fetchProduct, saveProduct, "product-uuid", 3)
    ).rejects.toThrow();
  });
});
