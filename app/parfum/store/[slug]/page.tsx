import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOpenCartProductBySlug, getOpenCartProducts } from "@/lib/opencart";
import ProductDetailContent from "./ProductDetailContent";
import { getStoreProduct, storePageContent } from "../storeContent";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const live = await getOpenCartProducts({ category: "parfum" });
  const staticSlugs = storePageContent.it.products.map((product) => ({
    slug: product.slug,
  }));
  if (live && live.length > 0) {
    const liveSlugs = live.map((p) => ({ slug: p.slug }));
    const allSlugs = Array.from(
      new Set([...staticSlugs.map((s) => s.slug), ...liveSlugs.map((s) => s.slug)])
    );
    return allSlugs.map((slug) => ({ slug }));
  }
  return staticSlugs;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const liveProduct = await getOpenCartProductBySlug(slug, "it");
  const product = liveProduct || getStoreProduct("it", slug);

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
  const liveProduct = await getOpenCartProductBySlug(slug, "it");
  const product = liveProduct || getStoreProduct("it", slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent slug={slug} initialProduct={product} />;
}
