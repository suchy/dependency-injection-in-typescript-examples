import express from "express";
import bodyParser from "body-parser";
import { Product } from "./product";

interface ServerFactoryDependencies {
  increaseProductQuantity: (
    productId: string,
    quantity: number
  ) => Promise<Product>;
}

export function ServerFactory({
  increaseProductQuantity,
}: ServerFactoryDependencies) {
  return function () {
    const app = express();

    app.use(bodyParser.json());

    app.patch("/products/:productId", async (req, res) => {
      const { productId } = req.params;

      const { quantity } = req.body;

      const updatedProduct = await increaseProductQuantity(productId, quantity);

      res.json(updatedProduct).status(200);
    });

    app.listen(3000, () => {
      console.log("Example app listening on port 3000");
    });
  };
}
