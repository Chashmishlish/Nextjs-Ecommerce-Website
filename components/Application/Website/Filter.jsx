'use client'
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from "@/components/ui/slider"
import ButtonLoading from '../ButtonLoading'
import { useRouter, useSearchParams } from 'next/navigation'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Filter = () => {
 const searchParams = useSearchParams()
  const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: 3000 })
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedColor, setSelectedColor] = useState([])
  const [selectedSize, setSelectedSize] = useState([])

  const { data: categoryData } = useFetch('/api/category/get-category')
  const { data: colorData } = useFetch('/api/product-variant/colors')
  const { data: sizeData } = useFetch('/api/product-variant/size')

  const urlSearchParams = new URLSearchParams(searchParams.toString())
  const router = useRouter()

  useEffect(() => {
    searchParams.get('category') ? setSelectedCategory(searchParams.get('category').split(',')) : setSelectedCategory([])

    searchParams.get('size') ? setSelectedSize(searchParams.get('size').split(',')) : setSelectedSize([])

    searchParams.get('color') ? setSelectedColor(searchParams.get('color').split(',')) : setSelectedColor([])
  }, [searchParams])


  const handlePriceChange = (value) => {
    setPriceFilter({ minPrice: value[0], maxPrice: value[1] })
  }

  const handleCategoryFilter = (categorySlug) => {
    let newSelectedCategory = [...selectedCategory];
    if (newSelectedCategory.includes(categorySlug)) {
      newSelectedCategory = newSelectedCategory.filter(cat => cat !== categorySlug);
    } else {
      newSelectedCategory.push(categorySlug);
    }

    setSelectedCategory(newSelectedCategory)

    newSelectedCategory.length > 0 ? urlSearchParams.set('category', newSelectedCategory.join(',')) : urlSearchParams.delete('category')

    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  }


  const handleColorFilter = (color) => {
    let newSelectedColor = [...selectedColor];
    if (newSelectedColor.includes(color)) {
      newSelectedColor = newSelectedColor.filter(cat => cat !== color);
    } else {
      newSelectedColor.push(color);
    }

    setSelectedColor(newSelectedColor)

    newSelectedColor.length > 0 ? urlSearchParams.set('color', newSelectedColor.join(',')) : urlSearchParams.delete('color')

    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)


  }

  const handleSizeFilter = (size) => {
    let newSelectedSize = [...selectedSize];
    if (newSelectedSize.includes(size)) {
      newSelectedSize = newSelectedSize.filter(cat => cat !== size);
    } else {
      newSelectedSize.push(size);
    }

    setSelectedSize(newSelectedSize)

    newSelectedSize.length > 0 ? urlSearchParams.set('size', newSelectedSize.join(',')) : urlSearchParams.delete('size')

    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  }

  const handlePriceFilter = () => {
    urlSearchParams.set('minPrice', priceFilter.minPrice)
    urlSearchParams.set('maxPrice', priceFilter.maxPrice)
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  }

  