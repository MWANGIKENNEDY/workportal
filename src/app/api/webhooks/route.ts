import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

 console.log("🔑 Secret loaded?", process.env.CLERK_WEBHOOK_SIGNING_SECRET);


 console.log(req)

 try {

   const evt = await verifyWebhook(req);

   if (evt.type === "user.created") {
     const userData = evt.data;
     const email = userData.email_addresses?.[0]?.email_address;

     if (!email) {
       console.warn("No email provided in Clerk webhook, skipping creation.");
       return new Response("No email provided", { status: 400 });
     }

     // ✅ Check if user already exists by clerkId or email
     const existingUser = await prisma.user.findFirst({
       where: {
         OR: [
           { clerkId: userData.id },
           { email },
         ],
       },
     });

     if (!existingUser) {
       await prisma.user.create({
         data: {
           clerkId: userData.id,
           email,
           firstName: userData.first_name,
           lastName: userData.last_name,
           imageUrl: userData.image_url,
           provider: userData.external_accounts?.[0]?.provider,
         },
       });

       console.log(`✅ Created new user: ${email}`);
     } else {
       console.log(`⚠️ User already exists: ${email}`);
     }
   }

   return new Response("Webhook received", { status: 200 });
 } catch (err) {
   console.error("Error verifying webhook:", err);
   return new Response("Error verifying webhook", { status: 400 });
 }
}