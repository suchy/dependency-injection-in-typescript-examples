import type { Product } from "./product";

export async function increaseProductQuantity(
  fetchProduct: (productId: string) => Promise<Product | undefined>,
  saveProduct: (product: Product) => Promise<void>,
  productId: string,
  quantity: number
) {
  if (quantity <= 0) {
    throw new Error(`Quantity must be greater than 0.`);
  }

  const product = await fetchProduct(productId);

  if (!product) {
    throw new Error(`Product ${productId} not found.`);
  }

  const updatedQuantity = product.quantity + quantity;

  const updatedProduct = { ...product, quantity: updatedQuantity };

  await saveProduct(updatedProduct);

  return updatedProduct;
}
