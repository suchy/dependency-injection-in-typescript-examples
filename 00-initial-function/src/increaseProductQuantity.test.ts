import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { increaseProductQuantity } from "./increaseProductQuantity";

vi.mock("./repository", () => ({
  fetchProduct: vi.fn(() =>
    Promise.resolve({
      name: "Storm Trooper figure",
      productId: "product-uuid",
      quantity: 1,
    })
  ),
  saveProduct: vi.fn(() => Promise.resolve()),
}));

describe("increaseProductQuantity", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return product with updated quantity", async () => {
    const updatedProduct = await increaseProductQuantity("product-uuid", 3);

    expect(updatedProduct).toStrictEqual({
      name: "Storm Trooper figure",
      productId: "product-uuid",
      quantity: 4,
    });
  });

  it("should throw an error if quantity is lower or equal 0", async () => {
    expect(() => increaseProductQuantity("product-uuid", 0)).rejects.toThrow();
    expect(() => increaseProductQuantity("product-uuid", -1)).rejects.toThrow();
  });

  it("should throw an error if product was not found", async () => {
    vi.clearAllMocks();

    vi.mock("./repository", () => ({
      fetchProduct: vi.fn(() => Promise.resolve()),
      saveProduct: vi.fn(() => Promise.resolve()),
    }));

    expect(() =>
      increaseProductQuantity("not-found-product-uuid", 3)
    ).toThrowError("Product not-found-product-uuid not found.");
  });
});
