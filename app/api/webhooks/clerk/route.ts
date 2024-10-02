import { clerkClient } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  // Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Ajoutez le WEBHOOK_SECRET du dashboard CLerk au fichier .env ou .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Erreur de webhook:', err)
    return new Response('Erreur', {
      status: 400,
    })
  }

  // Do something with the payload
  const { id } = evt.data
  const eventType = evt.type

  // CREATE
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      photo: image_url,
    };

    const newUser = await createUser(user);

    // Set public metadata
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "Le profil à bien était crée", user: newUser });
  }

  // UPDATE
  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username!,
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: "Utilisateur mis à jour", user: updatedUser });
  }

  // DELETE
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser(id!);

    return NextResponse.json({ message: "Utilisateur supprimé", user: deletedUser });
  }

  console.log(`Webhook avec un ID de ${id} et un type de ${eventType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}