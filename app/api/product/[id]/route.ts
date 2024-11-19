import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, {params} : { params: { id: string } }){
    const productInfo = await prisma.product.findUnique({
        where: {
            id: params.id
        },
        include: {
            subImages: true
        }
    });
    return NextResponse.json(productInfo);
}