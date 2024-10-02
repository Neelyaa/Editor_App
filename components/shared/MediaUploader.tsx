"use client"

import { useToast } from '@/hooks/use-toast'
import { dataUrl, getImageSize } from '@/lib/utils'
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import React from 'react'

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>
    publicId: string;
    image: any;
    type: string;
}

const MediaUploader = ({
    onValueChange,
    setImage,
    image,
    publicId,
    type
}: MediaUploaderProps) => {

    const { toast } = useToast();

    const onUploadSuccessHandler = (result: any) => {

        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
        }))

        onValueChange(result?.info?.public_id)

        toast({
            title: 'Image téléchargée avec succès',
            description: '1 crédit à été déduit de votre solde',
            duration: 5000,
            className: 'success-toast',
        })
    }

    const onUploadErrorHandler = () => {
        toast({
            title: 'Oops une erreur s\'est produite',
            description: 'Essayez de nouveau',
            duration: 5000,
            className: 'error-toast',
        })
    }

    return (

        <CldUploadWidget
            uploadPreset="nn_editor"
            options={{
                multiple: false,
                resourceType: "image",
                language: "fr",
                text: {
                    fr: {
                        "or": "Ou",
                        "back": "Retour",
                        "advanced": "Avancé",
                        "close": "Fermer",
                        "no_results": "Aucun resultats",
                        "search_placeholder": "Rechercher un document",
                        "about_uw": "À propos du widget",
                        "search": {
                            "placeholder": "Rechercher...",
                            "reset": "Reinitialiser recherche"
                        },
                        "notifications": {
                            "general_error": "Une erreur est survenue.",
                            "general_prompt": "Êtes-vous sûr?",
                            "limit_reached": "Aucun autre fichier ne peut être sélectionné.",
                            "invalid_add_url": "L'URL doit être valide.",
                            "invalid_public_id": "L'ID ne peut contenir :\\,,&,#,%,<,>.",
                            "no_new_files": "Le fichier a déjà été téléchargé.",
                            "image_purchased": "Image achetée",
                            "video_purchased": "Vidéo achetée",
                            "purchase_failed": "L'achat a échoué. Essayez à nouveau.",
                            "service_logged_out": "Le service a été déconnecté suite à une erreur",
                            "great": "Bien",
                            "image_acquired": "Image acquise",
                            "video_acquired": "Video acquise",
                            "acquisition_failed": "L'acquisition a échoué. Please try again."
                        },
                        "menu": {
                            "files": "Mes documents",
                            "web": "Adresse web",
                        },
                        "local": {
                            "browse": "Parcourir",
                            "dd_title_single": "Faites glisser et déposez une image ici",
                            "dd_title_multi": "Faites glisser et déposez une image ici",
                            "drop_title_single": "Déposer un fichier à télécharger",
                            "drop_title_multiple": "Déposer un fichier à télécharger"
                        },
                        "actions": {
                            "upload": "Télécharger",
                            "next": "Suivant",
                            "clear_all": "Restaurer",
                            "log_out": "Déconnection"
                        },
                        "queue": {
                            "done": "Terminé",
                        },
                        "camera": {
                            "capture": "Capture",
                            "cancel": "Annuler",
                            "take_pic": "Prendre une photo et la télécharger",
                            "explanation": "Assurez-vous que votre caméra est connectée et que votre navigateur autorise la capture de la caméra. Lorsque vous êtes prêt, cliquez sur Capturer",
                            "camera_error": "Impossible d'accéder à la caméra",
                            "retry": "Échec, aucun accès à la caméra",
                            "file_name": "Camera_{{time}}"
                        },
                        "url": {
                            "inner_title": "URL du fichier à télécharger:",
                            "input_placeholder": "http://site.exemple/images/une-image.jpg"
                        },
                        "google_drive": {
                            "no_auth_title": "Télécharger des fichiers depuis votre compte Google Drive.",
                            "no_auth_action": "Se connecter à Google Drive",
                        },
                        "dropbox": {
                            "no_auth_title": "Télécharger des fichiers depuis votre compte Dropbox.",
                            "no_auth_action": "Se connecter à Dropbox",
                            "no_photos": "Aucunes photos",
                            "no_files": "Aucun fichier",
                            "root_crumb": "Racine",
                        },
                        "shutterstock": {
                            "no_auth_title": "Télécharger des fichiers depuis votre compte Shutterstock.",
                            "toggle_filters_button": "Filtres",
                            "no_auth_action": "Se connecter à Shutterstock",
                            "authenticating": "Authentification...",
                            "statement": "Shutterstock propose des images, des photos, des vecteurs, des illustrations, des vidéos et de la musique de la meilleure qualité et libres de droits pour presque toutes les applications.",
                            "reg_link_text": "Cliquer ici pour créer un compte Shutterstock",
                            "next_btn": "Suivant",
                        },
                        "getty": {
                            "no_auth_title": "Télécharger des fichiers depuis votre compte Getty Images.",
                            "no_auth_action": "Se connecter à Getty Images",
                            "no_auth_statement": "Trouvez l'image libre de droits parfaite pour votre prochain projet parmi la meilleure photothèque au monde de photos créatives, d'illustrations d'art vectoriel et de stock.",
                            "reg_link_text": "Cliquer ici pour créer un compte Getty Images",
                            "select": "Selectionner",
                        },
                        "istock": {
                            "no_auth_title": "Télécharger des fichiers depuis iStock.",
                            "no_auth_action": "Se connecter à iStock",
                            "no_auth_statement": "iStock est l'un des principaux marchés de contenu boursier au monde, proposant des millions d'images premium triées sur le volet à des prix ridiculement bas que vous ne pouvez obtenir que chez nous!",
                            "reg_link_text": "Cliquer ici pour créer un compte iStock",
                            "select": "Selectionner",
                        },
                        "unsplash": {
                            "no_auth_title": "Accédez à des millions d'images sur Unsplash.",
                            "no_auth_action": "Se connecter à Unsplash",
                            "no_auth_statement": "De belles images et photos gratuites que vous pouvez télécharger et utiliser pour n’importe quel projet. Mieux que n’importe quelle photo libre de droits.",
                            "select": "Selectionner",
                            "popular_categories": "Catégories populaire",
                            "editorial": "Editoriel",
                            "summary": {
                                "description": "Description",
                                "permission": "Permission",
                                "free_to_use": "Gratuit",
                                "published_at": "Publié le",
                                "location": "Localisation",
                                "credit": "Credit",
                                "format": "Selectionner une dimmension",
                                "size": {
                                    "small": "Petit",
                                    "medium": "Moyen",
                                    "large": "Grand",
                                    "original_size": "Taille originale"
                                }
                            },
                        },

                    }
                }
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className='flex flex-col gap-4'>
                    <h3 className='h3-bold text-dark-600'>
                        Image originale :
                    </h3>

                    {publicId ? (
                        <>
                            <div className="cursor-pointer overflow-hidden rounded-[10px]">
                                <CldImage
                                    width={getImageSize(type, image, "width")}
                                    height={getImageSize(type, image, "height")}
                                    src={publicId}
                                    alt='image'
                                    sizes={"(max-width: 767px) 100vw, 50vw"}
                                    placeholder={dataUrl as PlaceholderValue}
                                    className='media-uploader_cldImage'
                                />
                            </div>
                        </>
                    ) : (
                        <div
                            className='media-uploader_cta'
                            onClick={() => open()}
                        >
                            <div className="media-uploader_cta-image">
                                <Image
                                    src="/assets/icons/add.svg"
                                    alt="Ajouter une image"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <p className='p-14-medium'>Télécharger une image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader
