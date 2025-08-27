import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schema";

import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import {
  getAllProducts,
  getProduct,
  incrementProductView,
} from "../services/product";

import { getOneProductSchema } from "../schemas/get-one-product-schema";
import { get } from "http";
import { getCategory } from "../services/category";

export const getProducts: RequestHandler = async (req, res) => {
  const parseResult = getProductSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: "Parâmetros inválidos" });
    return;
  }

  const { metadata, orderBy, limit } = parseResult.data;
  const parsedLimite = limit ? parseInt(limit) : undefined;
  const parsedMetadata = metadata ? JSON.parse(metadata) : undefined;

  const products = await getAllProducts({
    metadata: parsedMetadata,
    order: orderBy,
    limit: parsedLimite,
  });

  const productsWithAbsoluteUrl = products.map((product) => ({
    ...product,
    image: product.images ? getAbsoluteImageUrl(product.images) : null,
    liked: false, // TODO: Once have like  funcionallity, fecth this.
  }));

  res.json({ error: null, products: productsWithAbsoluteUrl });
};

export const getOneProduct: RequestHandler = async (req, res) => {
  const paramsResult = getOneProductSchema.safeParse(req.params);
  if (!paramsResult.success) {
    res.status(400).json({ error: "Parâmetros inválidos" });
    return;
  }
  const { id } = paramsResult.data;

  // getting product

  const product = await getProduct(parseInt(id ? id : ""));
  if (!product) {
    res.json({ error: "Produto não encontrado" });
    return;
  }

  const productsWithAbsoluteImages = {
    ...product,
    images: product.images.map((img) => getAbsoluteImageUrl(img)),
  };

  // getting category

  const category = await getCategory(product.categoryId);

  // increment view count

  await incrementProductView(product.id);

  res.json({
    error: null,
    product: productsWithAbsoluteImages,
    category,
  });
};

