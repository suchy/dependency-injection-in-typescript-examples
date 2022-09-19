import { beforeEach, describe, expect, it, vi } from "vitest";

import { IncreaseProductQuantityFactory } from "./IncreaseProductQuantityFactory";
import { Product } from "../product";

describe("IncreaseProductQuantityFactory", () => {
  let fetchProduct: () => Promise<Product | undefined>;

  let saveProduct: () => Promise<void>;

  let product: Product;

  beforeEach(() => {
    product = {
      name: "Storm Trooper figure",
      productId: "product-uuid",
      quantity: 1,
    };

    fetchProduct = vi.fn(() => Promise.resolve(product));

    saveProduct = vi.fn(() => Promise.resolve());
  });

  it("should return increaseProductQuantity function", () => {
    const increaseProductQuantity = IncreaseProductQuantityFactory(
      fetchProduct,
      saveProduct
    );

    expect(typeof increaseProductQuantity).toBe("function");
  });

  describe("increaseProductQuantity", () => {
    it("should return product with updated quantity", async () => {
      const increaseProductQuantity = IncreaseProductQuantityFactory(
        fetchProduct,
        saveProduct
      );

      const updatedProduct = await increaseProductQuantity("product-uuid", 3);

      expect(updatedProduct).toStrictEqual({ ...product, quantity: 4 });
    });

    it("should throw an error if quantity is lower or equal 0", async () => {
      const increaseProductQuantity = IncreaseProductQuantityFactory(
        fetchProduct,
        saveProduct
      );

      expect(() =>
        increaseProductQuantity("product-uuid", 0)
      ).rejects.toThrow();

      expect(() =>
        increaseProductQuantity("product-uuid", -1)
      ).rejects.toThrow();
    });

    it("should throw an error if product was not found", async () => {
      fetchProduct = vi.fn(() => Promise.resolve(undefined));

      const increaseProductQuantity = IncreaseProductQuantityFactory(
        fetchProduct,
        saveProduct
      );

      expect(() =>
        increaseProductQuantity("product-uuid", 3)
      ).rejects.toThrow();
    });
  });
});
