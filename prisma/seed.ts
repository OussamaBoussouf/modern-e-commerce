import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const products = [
        {
            id: 'price_1RG0LkGCtVcxex4iWZxmoZSp',
            name: 'Marshall Major IV',
            rating: 3.9,
            price: 45.89,
            description: 'Retro aesthetics with long battery life.',
            stock: 2,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787179/Marshell-1_xev8o0.png',
            category: 'wireless',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787179/Marshell-2_rpyi6p.png',
                    },
                ],
            },
        },
        {
            id: 'price_1Qr1HxGCtVcxex4i2SvKQZ1Z',
            name: 'JBL Live 460NC',
            rating: 4,
            price: 20.99,
            description: 'Affordable with decent noise-canceling features.',
            stock: 5,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787163/Jbl_cpokgd.png',
            category: 'wireless',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787163/Jbl-1_ogkal4.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787164/Jbl-2_unslvb.png',
                    },
                ],
            },
        },
        {
            id: 'price_1Qr1JyGCtVcxex4id1De0nFN',
            name: 'Sony WH-1000XM5',
            rating: 4.5,
            price: 30.99,
            description:
                'Premium noise-canceling with excellent sound quality.',
            stock: 9,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787191/sony-1-WH-1000XM5_ldoxc7.png',
            category: 'wireless',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787191/Sony_WH-1000XM5_gewcm9.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787192/sony-2-WH-1000XM5_snfbfq.png',
                    },
                ],
            },
        },
        {
            id: 'price_1Qr1LgGCtVcxex4itaHGnMvo',
            name: 'Beyerdynamic DT 990 Pro',
            rating: 4.8,
            price: 45.99,
            description:
                'Studio headphones with a wide soundstage (open-back).',
            stock: 3,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787246/Beyerdynamic_DT_990_Pro_in2yrg.png',
            category: 'wired',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787246/Beyerdynamic_DT_990_Pro-1_zpzlku.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787247/Beyerdynamic_DT_990_Pro-3_zlawv7.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG0MiGCtVcxex4ieKWvtyiK',
            name: 'HyperX Cloud II Wired',
            rating: 4.9,
            price: 55.89,
            description: 'Durable and comfortable for long gaming sessions.',
            stock: 7,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787258/Hyper-X-Cloud2_whjus2.png',
            category: 'wired',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787258/Hyper-x-cloud2-1_ljqw6m.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787259/Hyper-x-cloud2-3_np2pfk.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG0evGCtVcxex4i065XZaVJ',
            name: 'Philips SHP9500',
            rating: 4.5,
            price: 43.89,
            description: 'Open-back headphones with excellent value for money.',
            stock: 12,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787280/Philips_SHP9500-3_vkajep.png',
            category: 'wired',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787279/Philips_SHP9500-2_swlx79.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787282/Philips_SHP9500_mtoxoy.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG0fmGCtVcxex4ikn0UQvac',
            name: 'Sennheiser IE 200',
            rating: 3.4,
            price: 30.79,
            description: 'Detailed sound and durable design.',
            stock: 6,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787293/Sennheiser_IE_300-2_azhjh5.png',
            category: 'wired',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787291/Sennheiser_IE_300-1_wormn8.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787290/Sennheiser_IE_300_ja482k.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG0gdGCtVcxex4i2Y4YTcNc',
            name: 'Shure SRH1540',
            rating: 3.9,
            price: 38.79,
            description:
                'High-end closed-back headphones for critical listening.',
            stock: 6,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787301/Shure_SRH1540-2_qpqhzs.png',
            category: 'wired',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787301/Shure_SRH1540-1_xaebnc.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787303/Shure_SRH1540_dwds86.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG0hMGCtVcxex4iDdud6oyT',
            name: 'Sony MDR-EX650AP',
            rating: 4.0,
            price: 22.99,
            description: 'High-quality sound and comfortable fit.',
            stock: 6,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787310/Sony_MDR-EX650AP_wdpu0a.png',
            category: 'wired',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787311/Sony_MDR-EX650AP-1_vwpcla.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787313/Sony_MDR-EX650AP-2_o70oyy.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG0i0GCtVcxex4iUCnPApaA',
            name: 'Apple AirPods Pro 2',
            rating: 4.2,
            price: 45.99,
            description:
                'Noise-canceling, spatial audio, and seamless Apple ecosystem integration.',
            stock: 3,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787328/airpods-pro-2_kp0xxd.png',
            category: 'earbuds',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787329/airPods-pro-2-1_vuvytx.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787331/airPods-pro-2-2_wonnne.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787332/airPods-pro-2-3_f54wyb.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG14QGCtVcxex4iu6Sf82Hw',
            name: 'Beats Fit Pro',
            rating: 4.5,
            price: 38.99,
            description:
                'Secure fit with rich bass and Apple ecosystem integration.',
            stock: 5,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787353/Beats_Fit_Pro-3_rpmhm3.png',
            category: 'earbuds',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787349/Beats_Fit_Pro_stecsm.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787350/Beats_Fit_Pro-2_drm5i4.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787349/Beats_Fit_Pro-1_cek8wy.png',
                    },
                ],
            },
        },
        {
            id: '',
            name: 'Jabra Elite 7 Pro',
            rating: 4.5,
            price: 25.99,
            description: 'Good for calls and workouts with a secure fit.',
            stock: 10,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787360/Jabra_Elite_7_Pro-1_jv0iru.png',
            category: 'earbuds',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787362/Jabra_Elite_7_Pro-2_v4uosr.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787359/Jabra_Elite_7_Pro_olk4ym.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG15DGCtVcxex4iIZEmgtfX',
            name: 'Realme Buds Air 3',
            rating: 4.7,
            price: 30.99,
            description: 'Affordable wireless earbuds with good ANC.',
            stock: 4,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787372/Realme_Buds_Air_3-3_gvpziw.png',
            category: 'earbuds',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787371/Realme_Buds_Air_3-2_lnqlpe.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787370/Realme_Buds_Air_3-1_kai6wy.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG16bGCtVcxex4ihDLfG9wZ',
            name: 'Redmi Buds 4 Pro',
            rating: 4.5,
            price: 28.89,
            description: 'Impressive audio quality for the price.',
            stock: 6,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787379/Redmi_Buds_4_Pro-1_su4xbl.jpg',
            category: 'earbuds',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787380/Redmi_Buds_4_Pro_v3yr3a.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787383/Redmi_Buds_4_Pro-2_fhbeyh.png',
                    },
                ],
            },
        },
        {
            id: 'price_1RG17dGCtVcxex4iPPgw3kMD',
            name: 'Samsung Galaxy Buds 4 Pro',
            rating: 4.5,
            price: 28.89,
            description: 'Impressive audio quality for the price.',
            stock: 6,
            image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787391/samsung-galaxy-buds-2-pro-4_cjz3ml.png',
            category: 'earbuds',
            subImages: {
                create: [
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787390/samsung-galaxy-buds-2-pro-3_jdc3x3.png',
                    },
                    {
                        image: 'https://res.cloudinary.com/dcdra4coh/image/upload/v1731787389/samsung-galaxy-buds-2-pro-2_nmzqrj.png',
                    },
                ],
            },
        },
    ]

    for (const product of products) {
        await prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                rating: product.rating,
                stock: product.stock,
                category: product.category,
                subImages: {
                    create: product.subImages.create,
                },
            },
        })
    }
    console.log('Seeded successfully')
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
