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

  