import Image from "next/image"

import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,

} from "@/components/ui/alert-dialog";
import { AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const InsufficientCreditsModal = () => {

    const router = useRouter();

    return (
        <AlertDialog defaultOpen>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex-between">
                        <p className="p-16-semibold text-dark-400">Crédits insuffisant</p>
                        <AlertDialogCancel
                            className="border-0 p-0 hover:bg-transparent"
                            onClick={() => router.push("/profile")}
                        >
                            <Image
                                src="/assets/icons/close.svg"
                                alt="crédits"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                        </AlertDialogCancel>
                    </div>

                    <Image
                        src="/assets/images/stacked-coins.png"
                        alt="credits"
                        width={462}
                        height={122}
                    />

                    <AlertDialogTitle className="p-24-bold text-dark-600">
                        Oops... Il semblerait que vous n'avez plus de crédits!
                    </AlertDialogTitle>

                    <AlertDialogDescription className="p-16-regular py-3">
                        Ne vous inquiétez pas, vous pouvez continuer à profiter de nos services en obtenant
                        plus de crédits.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="button w-full bg-purple-100 text-dark-400"
                        onClick={() => router.push("/profile")}
                    >
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="button w-full bg-purple-gradient bg-cover"
                        onClick={() => router.push("/credits")}
                    >
                        Continuer
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default InsufficientCreditsModal
