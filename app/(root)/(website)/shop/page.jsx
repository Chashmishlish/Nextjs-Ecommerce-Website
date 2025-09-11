'use client'
import React, { useState } from 'react'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import useWindowSize from '@/hooks/useWindowSize'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import ProductBox from '@/components/Application/Website/ProductBox'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Button } from '@/components/ui/button'

const breadcrumb = {
  title: 'Shop',
  links: [
    { label: 'Shop', href: WEBSITE_SHOP }
  ]
}

