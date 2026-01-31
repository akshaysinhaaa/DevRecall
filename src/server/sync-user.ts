import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/server/db";

/**
 * Ensures the Clerk user exists in our User table and returns our User.id.
 * Use the returned id for UserToProject and any FK to User.
 */
export async function ensureUserInDb(clerkUserId: string): Promise<string> {
  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkUserId);
  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error("User has no email");
  }
  const user = await db.user.upsert({
    where: { email },
    update: {
      imageUrl: clerkUser.imageUrl,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
    create: {
      id: clerkUserId,
      email,
      imageUrl: clerkUser.imageUrl,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
  });
  return user.id;
}
