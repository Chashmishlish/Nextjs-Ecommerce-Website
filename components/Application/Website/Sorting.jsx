import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CiFilter } from "react-icons/ci";
import { sortings } from '@/lib/utils'
import { Button } from '@/components/ui/button';

const Sorting = ({ limit, setLimit, sorting, setSorting,  mobileFilterOpen, setMobileFilterOpen }) => {
    return (
        // <div className="flex justify-between items-center flex-wrap gap-2 p-4 bg-pink/50">
        <div className="flex justify-between items-center flex-wrap gap-2 p-4 bg-pink-50">
            <Button type="button" variant='outline' onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className=" lg:hidden hover:bg-primary hover:text-white hover:border-primary">
                <CiFilter />
                Filter
            </Button>

            <ul className='flex items-center gap-2'>
                <li className='font-semibold'>Show</li>
                {[9, 12, 18, 24].map(limitNumber => (
                    <li key={limitNumber}>
                        <button
                            type='button' onClick={() => setLimit(limitNumber)}
                            className={`${limitNumber === limit ? 'w-8 h-8 flex justify-center items-center rounded-full bg-primary text-white text-sm' : ''}`}
                        >
                            {limitNumber}
                        </button>
                    </li>
                ))}
            </ul>

         