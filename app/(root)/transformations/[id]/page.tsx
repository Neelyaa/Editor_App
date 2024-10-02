import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"

import Header from "@/components/shared/Header"
import TransformedImage from "@/components/shared/TransformedImage"
import { Button } from "@/components/ui/button"
import { getImageById } from "@/lib/actions/image.actions"
import { getImageSize } from "@/lib/utils"
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation"


const ImageDetails = async ({ params: { id } }: SearchParamProps) => {

  const { userId } = auth();

  const image = await getImageById(id);

  const transformationTranslations = {
    restore: "Restaurer",
    fill: "Remplissage",
    remove: "Retrait d'objets",
    recolor: "Recoloration",
    removeBackground: "Retrait d'arrière plan",
  };

  const translatedTransformation =
  transformationTranslations[
    image.transformationType as keyof typeof transformationTranslations
  ] || image.transformationType;

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation :</p>
          <p className="text-purple-400">
            {translatedTransformation}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Titre :</p>
              <p className="capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Couleur:</p>
              <p className="capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Dimmension:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/*MEDIA UPLOADER*/}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Originale :</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button">
              <Link href={`/transformations/${image._id}/update`}>
                Modifier l&apos;image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  )
}

export default ImageDetails
