"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router])

    const redirectToCustomerPortal = async () => {
        setIsLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) {
                toast.error((error as Error).message);
            }
        }
        setIsLoading(false);
    }

    return (
        <div className="mb-7 px-6">{!subscription && (
            <div className="flex flex-col gap-y-4">
                <p>No active plan.</p>
                <Button onClick={subscribeModal.onOpen}
                    className="
                w-[300px]
                "
                >
                    Subscribe
                </Button>
            </div>
        )}
            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>You are currently on the <b>{subscription?.prices?.products?.name}</b></p>
                    <Button className="
                    w-[300px]
                    "
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                    >

                    </Button>
                </div>
            )}
        </div>
    )
}

export default AccountContent;