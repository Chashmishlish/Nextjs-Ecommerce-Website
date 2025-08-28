'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const WEBSITE_HOME = "/";

const EmailVerification = ({ params }) => {
  const { token } = params;
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post("/api/auth/verify-email", { token });
        setIsVerified(data.success);
      } catch (error) {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  return (
    <Card className="w-[400px]">
      <CardContent>
        {loading ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Verifying...
            </p>
          </div>
        ) : isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src="/assests/images/verified.gif"
                alt="Verification Successful"
                width={300}
                height={300}
                className="h-[100px] w-auto"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-500 my-5">
                Email Verification Success!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
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
              <h1 className="text-2xl font-bold text-red-500 my-5">
                Email Verification Failed!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Go Home</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
