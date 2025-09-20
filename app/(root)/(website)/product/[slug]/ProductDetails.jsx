'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { WEBSITE_CART, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import imgPlaceholder from '@/public/assests/images/img-placeholder.webp'
import Image from "next/image";
import { IoStar } from "react-icons/io5"
import { decode, encode } from "entities";
import { HiMinus, HiPlus } from "react-icons/hi";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart } from "@/store/reducer/cartReducer";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import loadingSvg from '@/public/assests/images/loading.svg'
import ProductReview from "@/components/Application/Website/ProductReview";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {

    const dispatch = useDispatch()
    const cartStore = useSelector(store => store.cartStore)
    // console.log(cartStore);

    const [activeThumb, setActiveThumb] = useState()
    const [qty, setQty] = useState(1)
    const [isAddedIntoCart, setIsAddedIntoCart] = useState(false)
    const [isProductLoading, setIsProductLoading] = useState(false)
    useEffect(() => {
        setActiveThumb(variant?.media[0]?.secure_url)
    }, [variant])

    useEffect(() => {
        if (cartStore.count > 0) {
            const existingProduct = cartStore.products.findIndex(
                (cartProduct) =>
                    cartProduct.productId === product._id && cartProduct.variantId === variant._id
            )

            if (existingProduct >= 0) {
                setIsAddedIntoCart(true)
            } else {
                setIsAddedIntoCart(false)
            }
        }

        setIsProductLoading(false)
    }, [cartStore, product, variant])

    const handleThumb = (thumbUrl) => {
        setActiveThumb(thumbUrl)
    }

    const handleQty = (actionType) => {
        if (actionType === 'inc') {
            setQty(prev => prev + 1)
        } else {
            if (qty !== 1) {
                setQty(prev => prev - 1)
            }
        }
    }

    const handleAddToCart = () => {
        const cartProduct = {
            productId: product._id,
            variantId: variant._id,
            name: product.name,
            url: product.slug,
            size: variant.size,
            color: variant.color,
            mrp: variant.mrp,
            sellingPrice: variant.sellingPrice,
            media: variant?.media?.secure_url,
            // media: activeThumb || variant?.media?.[0]?.secure_url,
            qty: qty
        }

        dispatch(addIntoCart(cartProduct))
        setIsAddedIntoCart(true)
        showToast('success', 'Product added into cart.')
    }


    return (
        <div className="lg:px-32 px-4">

            {isProductLoading && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
                    <Image src={loadingSvg} width={80} height={80} alt='loading'
                    />
                </div>
            )}


            <div className="my-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>{product?.name}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
                {/* LEFT IMAGE SECTION */}
                <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
                    <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
                        <Image
                            src={activeThumb || imgPlaceholder.src}
                            width={650}
                            height={650}
                            alt='product'
                            className='border rounded max-w-full'
                        />
                    </div>
                    <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px]">
                        {variant?.media?.map((thumb) => (
                            <Image
                                key={thumb._id}
                                src={thumb?.secure_url || imgPlaceholder.src}
                                width={100}
                                height={100}
                                alt="product thumbnail"
                                className={`md:max-w-full max-w-16 rounded cursor-pointer ${thumb.secure_url === activeThumb ? 'border-2 border-primary' : 'border'}`}
                                onClick={() => handleThumb(thumb.secure_url)}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT PRODUCT DETAILS SECTION */}
                <div className="md:w-1/2 md:mt-0 mt-5">
                    <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

                    {/* STARS */}
                    <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <IoStar key={i} />
                        ))}
                        <span className="text-sm ps-2">({reviewCount} Reviews)</span>
                    </div>

                    {/* PRICE SECTION */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-semibold">
                            {variant.sellingPrice.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                        </span>
                        <span className="text-sm line-through text-gray-500">
                            {variant.mrp.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                        </span>
                        <span className="bg-red-500 text-white rounded px-3 py-1">
                            -{variant.discountPercentage}%
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="line-clamp-3 mb-5" dangerouslySetInnerHTML={{ __html: decode(product.description) }}></div>

                    {/* COLOR OPTIONS */}
                    <div className="mt-5">
                        <p className="mb-2">
                            <span className="font-semibold">Color:</span> {variant?.color}
                        </p>
                        {/* CHANGED: gap-5 -> gap-3, flex-wrap added so buttons wrap instead of being in one line */}
                        <div className="flex flex-wrap gap-3">
                            {colors.map((color) => (
                                <Link
                                    onClick={() => setIsProductLoading(true)}
                                    href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${color}&size=${variant.size}`}
                                    key={color}
                                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${color === variant.color ? 'bg-primary text-white' : ''}`}
                                >
                                    {color}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* SIZE OPTIONS */}
                    <div className="mt-5">
                        <p className="mb-2">
                            <span className="font-semibold">Size:</span> {variant?.size}
                        </p>
                        {/* CHANGED: gap-5 -> gap-3, flex-wrap added */}
                        <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                                <Link
                                    onClick={() => setIsProductLoading(true)}
                                    href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${variant.color}&size=${size}`}
                                    key={size}
                                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${size === variant.size ? 'bg-primary text-white' : ''}`}
                                >
                                    {size}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* <div className="mt-5">
  <p className="font-bold mb-2">Quantity</p>
  <div className="flex items-center h-10 border w-fit rounded-full">
    <button type="button" className="h-full w-10 flex justify-center items-center" 
    onClick={() => handleQty('desc')}>
      <HiMinus />
    </button>
    <input type="text" value={qty} className="w-14 text-center border-none outline-none" readOnly />
    <button type="button" className="h-full w-10 flex justify-center items-center"
    onClick={() => handleQty('inc')}>
      <HiPlus />
    </button>
  </div>
</div> */}

                    <div className="mt-5">
                        <p className="font-bold mb-2">Quantity</p>
                        <div className="flex items-center h-10 border w-fit rounded-full">
                            {/* Minus Button */}
                            <button
                                type="button"
                                className="h-full w-10 flex justify-center items-center text-gray-600 
                 hover:text-primary active:text-primary transition-colors"
                                onClick={() => handleQty('desc')}
                            >
                                <HiMinus />
                            </button>

                            {/* Quantity Input */}
                            <input
                                type="text"
                                value={qty}
                                className="w-14 text-center border-none outline-none"
                                readOnly
                            />

                            {/* Plus Button */}
                            <button
                                type="button"
                                className="h-full w-10 flex justify-center items-center text-gray-600 
                 hover:text-primary active:text-primary transition-colors"
                                onClick={() => handleQty('inc')}
                            >
                                <HiPlus />
                            </button>
                        </div>
                    </div>

                    <div className="mt-5">
                        {!isAddedIntoCart ? (
                            <ButtonLoading
                                type="button"
                                text="Add To Cart"
                                className="w-full rounded-full py-6 text-md cursor-pointer"
                                onClick={handleAddToCart}
                            />
                        ) : (
                            <Button
                                type="button"
                                asChild
                                className="w-full rounded-full py-6 text-md cursor-pointer"
                            >
                                <Link href={WEBSITE_CART}> Go To Cart</Link>
                            </Button>
                        )}
                    </div>




                </div>
            </div>

            <div className="mb-10">
  <div className="shadow rounded border ">
    <div className="p-3 bg-pink-50 border-b">
      <h2 className="font-semibold text-2xl">Product Description</h2>
    </div>
    <div className="p-3">
      <div dangerouslySetInnerHTML={{ __html: encode(product.description) }}></div>
    </div>
  </div>
</div>

{/* <ProductReview/> */}
<ProductReview productId={product._id} />


        </div>
    );
};

export default ProductDetails;



// // draft code
// 'use client'

// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import imgPlaceholder from '@/public/assests/images/img-placeholder.webp'
// import Image from "next/image";
// import { IoStar } from "react-icons/io5"
// import { decode } from "entities";

// const ProductPage = ({ product, variant, colors, sizes, reviewCount }) => {
//     const [activeThumb, setActiveThumb] = useState()

//     useEffect(() => {
//         setActiveThumb(variant?.media[0]?.secure_url)
//     }, [variant])

//     const handleThumb = (thumbUrl) => {
//         setActiveThumb(thumbUrl)
//     }
//     return (
//         <div className="lg:px-32 px-4">
//             <div className="my-10">
//                 <Breadcrumb>
//                     <BreadcrumbList>
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href="/">Home</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator />
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator />
//                         <BreadcrumbItem>
//                             <BreadcrumbLink asChild>
//                                 <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>{product?.name}</Link>
//                             </BreadcrumbLink>
//                         </BreadcrumbItem>
//                     </BreadcrumbList>
//                 </Breadcrumb>
//             </div>

//             <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
//                 <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
//                     <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
//                         <Image
//                             src={activeThumb || imgPlaceholder.src}
//                             width={650}
//                             height={650}
//                             alt='product'
//                             className='border rounded max-w-full'
//                         />
//                     </div>
//                     <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px]">
//                         {variant?.media?.map((thumb) => (
//                             <Image
//                                 key={thumb._id}
//                                 src={thumb?.secure_url || imgPlaceholder.src}
//                                 width={100}
//                                 height={100}
//                                 alt="product thumbnail"
//                                 className={`md:max-w-full max-w-16 rounded cursor-pointer ${thumb.secure_url === activeThumb ? 'border-2 border-primary' : 'border'}`}
//                                 onClick={() => handleThumb(thumb.secure_url)}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 <div className="md:w-1/2 md:mt-0 mt-5">
//                     <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
//                     <div className="flex items-center gap-1 mb-5">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                             <IoStar key={i} />
//                         ))}
//                         <span className="text-sm ps-2">({reviewCount} Reviews)</span>

//                         <div className="flex items-center gap-2 mb-3">
//                             <span className="text-xl font-semibold">
//                                 {variant.sellingPrice.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
//                             </span>
//                             <span className="text-sm line-through text-gray-500">
//                                 {variant.mrp.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
//                             </span>
//                             <span className="bg-red-500 text-white rounded px-2xl px-3 py-1 ">-
//                                 {variant.discountPercentage}%
//                             </span>
//                         </div>

//                         <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: decode(product.description) }}></div>

//                         <div className="mt-5">
//                             <p className="mb-2">
//                                 <span className="font-semibold">Color: {variant?.color}</span>
//                             </p>
//                             <div className="flex gap-5">
//                                 {colors.map((color) => (
//                                     <Link
//                                         href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${color}&size=${variant.size}`}
//                                         key={color}
//                                         className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${color === variant.color ? 'bg-primary text-white' : ''
//                                             }`}
//                                     >
//                                         {color}
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="mt-5">
//                             <p className="mb-2">
//                                 <span className="font-semibold">Size: {variant?.size}</span>
//                             </p>
//                             <div className="flex gap-5">
//                                 {sizes.map((size) => (
//                                     <Link
//                                         href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${variant.color}&size=${size}`}
//                                         key={size}
//                                         className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${size === variant.size ? 'bg-primary text-white' : ''
//                                             }`}
//                                     >
//                                         {size}
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };


// export default ProductPage;