'use client'
import { use, useEffect } from 'react'
import { useState } from "react"; // ADD THIS
import useFetch from '@/hooks/useFetch'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoutes'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import z from "zod";
import { useForm } from 'react-hook-form'
import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { showToast } from "@/lib/showToast";
import Image from 'next/image';
import imgPlaceholdern from '@/public/assests/images/img-placeholder.webp'
import axios from 'axios';

const breadCrumbData = [
    {
        href: ADMIN_DASHBOARD,
        label: 'Home'
    },
    {
        href: ADMIN_MEDIA_SHOW,
        label: 'Media'
    },
    {
        href: "",
        label: 'Edit Media'
    },

];

const EditMedia = ({ params }) => {
    const { id } = use(params);
    const { data: mediaData } = useFetch(`/api/media/get/${id}`)

    // Prevent error by checking before render
    // if (!mediaData) {
    //   return <div>Loading...</div>;
    // }
    // console.log(mediaData);

    const [loading, setLoading] = useState(false); // ADD THIS


    const formSchema = zSchema.pick({
        _id: true,
        alt: true,
        title: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: "",
            alt: "",
            title: ""
        },
    });

    useEffect(() => {
        if (mediaData && mediaData.success) {
            const data = mediaData.data
            form.reset({
                _id: data._id,
                alt: data.alt,
                title: data.title
            })
        }
    }, [mediaData])

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const { data: response } = await axios.put("/api/media/update", values);

            if (!response.success) {
                throw new Error(response.message);
            }
            showToast('success', response.message)
        } catch (error) {
            if (error.response?.status === 401 && error.response.data.message.includes("not verified")) {
                showToast("info", error.response.data.message);
            } else {
                showToast("error", getErrorMessage(error));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />

            <Card className="py-0 rounded shadow-sm">
                <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                    <h4 className='text-xl font-semibold'>Edit Media </h4>
                </CardHeader>
                <CardContent className='pb-5'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                <Image
                                    src={mediaData?.data?.secure_url || imgPlaceholdern}
                                    width={150}
                                    height={150}
                                    alt={mediaData?.alt || 'Image'}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter Title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="alt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alt</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter alt"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <ButtonLoading
                                    loading={loading}
                                    type="submit"
                                    text="Update Media"
                                    className="cursor-pointer"
                                />
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditMedia
