import prisma from '@/services/db/db'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: NextRequest) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error(
            'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env'
        )
    }

    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (error) {
        console.error('Error: Could not verify webhook:', error)
        return new Response('Error: Verification error', { status: 400 })
    }

    if (evt.type === 'user.created') {
        await prisma.user.create({
            data: {
                id: payload?.data?.id,
                email: payload?.data?.email_addresses?.[0].email_address,
            },
        })
    }

    return new Response('Success', { status: 200 })
}
