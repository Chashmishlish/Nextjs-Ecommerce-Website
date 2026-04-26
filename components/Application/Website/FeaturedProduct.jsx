import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { MdOutlineDoubleArrow } from "react-icons/md";
import ProductBox from './ProductBox';
import { headers } from 'next/headers';
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute';

const FeaturedProduct = async () => {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') || 'http';
  const fallbackApiBaseUrl = host ? `${protocol}://${host}/api` : 'http://localhost:3000/api';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') || fallbackApiBaseUrl;
  let productData = null;

  try {
    const { data } = await axios.get(`${apiBaseUrl}/product/get-featured-product`);
    productData = data;
  } catch (error) {
    console.error("❌ FeaturedProduct fetch error:", error.message);
  }

  return (
    <section className="lg:px-32 px-4 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="sm:text-4xl text-2xl font-semibold uppercase"> Featured Products </h2>
        <Link
          href={WEBSITE_SHOP}
          className="flex items-center gap-2 underline underline-offset-4 hover:text-primary transition-colors"
        >
          View All
          <MdOutlineDoubleArrow size={18} />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2">
        {!productData?.success && (
          <div className="text-center py-5">Data not found.</div>
        )}

        {productData?.success &&
          productData.data.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
