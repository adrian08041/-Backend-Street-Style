import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schema";
import { get } from "http";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { getAllProducts } from "../services/product";
import { fa } from "zod/v4/locales/index.cjs";

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

