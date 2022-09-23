import { MongoClient, Db, ObjectId } from "mongodb";
import { Product } from "./product";

const databaseUrl = "";
const databaseName = "";

export let db: Db;

async function getDatabase() {
  if (db) {
    return db;
  }

  const mongoClient = await MongoClient.connect(databaseUrl);

  db = mongoClient.db(databaseName);

  return db;
}

export async function fetchProduct(productId: string) {
  const db = await getDatabase();

  const productsColelction = db.collection("products");

  const productRecord = await productsColelction.findOne({
    _id: new ObjectId(productId),
  });

  if (!productRecord) {
    return;
  }

  const product = {
    name: productRecord.name,
    productId: productRecord.productId,
    quantity: productRecord.quantity,
  };

  return product;
}

export async function saveProduct(product: Product) {
  const db = await getDatabase();

  const productsColelction = db.collection("products");

  await productsColelction.insertOne(product);
}
