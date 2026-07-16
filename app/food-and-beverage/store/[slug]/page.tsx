import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailContent from "./ProductDetailContent";
import { getStoreProduct } from "../storeContent";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getStoreProduct("it", slug);

  if (!product) {
    return {
      title: "Prodotto | Two Lions",
    };
  }

  return {
    title: `${product.name} | Two Lions`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getStoreProduct("it", slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent slug={slug} />;
}
