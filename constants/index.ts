export const navLinks = [
    {
        label: "Accueil",
        route: "/",
        icon: "/assets/icons/home.svg",
    },
    {
        label: "Restauration d'image",
        route: "/transformations/add/restore",
        icon: "/assets/icons/image.svg",
    },
    {
        label: "Remplissage",
        route: "/transformations/add/fill",
        icon: "/assets/icons/stars.svg",
    },
    {
        label: "Retrait d'objets",
        route: "/transformations/add/remove",
        icon: "/assets/icons/scan.svg",
    },
    {
        label: "Recoloration",
        route: "/transformations/add/recolor",
        icon: "/assets/icons/filter.svg",
    },
    {
        label: "Retrait d'arrière-plan",
        route: "/transformations/add/removeBackground",
        icon: "/assets/icons/camera.svg",
    },
    {
        label: "Profile",
        route: "/profile",
        icon: "/assets/icons/profile.svg",
    },
    {
        label: "Acheter des crédits",
        route: "/credits",
        icon: "/assets/icons/bag.svg",
    },
];

export const plans = [
    {
        _id: 1,
        name: "Gratuit",
        icon: "/assets/icons/free-plan.svg",
        price: 0,
        credits: 20,
        inclusions: [
            {
                label: "20 crédits gratuit",
                isIncluded: true,
            },
            {
                label: "Accès aux services de base",
                isIncluded: true,
            },
            {
                label: "Assistance client prioritaire",
                isIncluded: false,
            },
            {
                label: "Mises à jour prioritaires",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 2,
        name: "Pack Pro",
        icon: "/assets/icons/free-plan.svg",
        price: 40,
        credits: 120,
        inclusions: [
            {
                label: "120 crédits",
                isIncluded: true,
            },
            {
                label: "Accès complet aux services",
                isIncluded: true,
            },
            {
                label: "Assistance client prioritaire",
                isIncluded: true,
            },
            {
                label: "Mises à jour prioritaires",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 3,
        name: "Pack Premium",
        icon: "/assets/icons/free-plan.svg",
        price: 199,
        credits: 2000,
        inclusions: [
            {
                label: "2000 crédits",
                isIncluded: true,
            },
            {
                label: "Accès complet aux services",
                isIncluded: true,
            },
            {
                label: "Assistance client prioritaire",
                isIncluded: true,
            },
            {
                label: "Mises à jour prioritaires",
                isIncluded: true,
            },
        ],
    },
];

export const transformationsTypes = {
    restore: {
        type: "restore",
        title: "Restauration d'image",
        subTitle: "Affiner les images en supprimant le bruit et les imperfections",
        config: { restore: true },
        icon: "image.svg",
    },
    removeBackground: {
        type: "removeBackground",
        title: "Retrait d'arrière-plan",
        subTitle: "Supprimer l'arrière-plan de l'image à l'aide de l'IA",
        config: { removeBackground: true },
        icon: "camera.svg",
    },
    fill: {
        type: "fill",
        title: "Remplissage",
        subTitle: "Améliorer les dimensions d'une image à l'aide de l'IA",
        config: { fillBackground: true },
        icon: "stars.svg",
    },
    remove: {
        type: "remove",
        title: "Retrait d'objets",
        subTitle: "Identifier et éliminer des objets présent sur l'image",
        config: {
            remove: { prompt: "", removeShadow: true, multiple: true },
        },
        icon: "scan.svg",
    },
    recolor: {
        type: "recolor",
        title: "Recoloration",
        subTitle: "Identifier et recolorer les objets à partir de l'image",
        config: {
            recolor: { prompt: "", to: "", multiple: true },
        },
        icon: "filter.svg"
    },
};

export const aspectRatioOptions = {
    "1:1": {
        aspectRatio: "1:1",
        label: "Carré (1:1)",
        width: 1000,
        height: 1000,
    },
    "3:4": {
        aspectRatio: "4:3",
        label: "Portrait standard (4:3)",
        width: 1000,
        height: 1334,
    },
    "9:16": {
        aspectRatio: "16:9",
        label: "Portrait mobile (9:16)",
        width: 1000,
        height: 1778,
    },
};

export const defaultValues = {
    title: "",
    aspectRation: "",
    color: "",
    prompt: "",
    publicId: "",
};

export const creditFee = -1;