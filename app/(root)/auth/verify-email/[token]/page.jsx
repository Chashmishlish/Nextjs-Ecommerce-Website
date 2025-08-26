'use client'
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
//import verifiedImg from "@public/assests/images/verified.gif"
//import verificationFailedImg from "@public/assests/images/verification-failed.gif"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const WEBSITE_HOME = "/";

const EmailVerification = ({ params }) => {
    const { token } = use(params)
    // const { token } = params;
    // const [isVerified, setIsVerified] = useState(false)
    const [isVerified, setIsVerified] = useState(null); // null = pending
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const verify = async () => {
        try {
            const { data: VerificationResponse }= await axios.post('/api/auth/verify-email', { token })
            
            if (VerificationResponse.success) {
                setIsVerified(true)
            } else {
                setIsVerified(false)
            }
         } catch (error) {
            setIsVerified(false)
        } finally {
            setLoading(false); // finally me loading false kar do
        }
    }

        verify()
    }, [ token ])

    // console.log( token )
    return(
        <Card className="w-[400px]">
            <CardContent>
                {loading ? (
                    <div className="text-center">
                    <p className="text-lg font-semibold text-gray-600 animate-pulse">
                    Verifying...
                    </p>
                    </div>
                ) : isVerified ? 
            <div>
                <div className="flex justify-center items-center">
                    {/* <Image src={verifiedImg.src} height={100} /> */}
                    <Image
                        src="/assests/images/verified.gif"
                        alt="Verification Successful"
                        width={300}
                        height={300}
                        className="h-[100px] w-auto"
                    />
            </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-green-500 my-5">Email Verification Success!</h1>
                    <Button asChild>
                        <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                    </Button>
                </div>
            </div>
                :
            <div>
                <div className="flex justify-center items-center">
                    <Image
                        src="/assests/images/verification-failed.gif"
                        alt="Verification Failed"
                        width={300}
                        height={300}
                    />

            </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 my-5">Email Verification Failed!</h1>
                    <Button asChild>
                        <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                    </Button>
                </div>
            </div>
            }
            </CardContent>
        </Card>
    )
}

export default EmailVerification

// ab jo token hai usko bhi verify krenge tow api me hai wo folder
//ye frontend ka folder hai