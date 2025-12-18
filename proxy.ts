import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth) => {
  const { userId, orgId } = await auth();
  if (userId && !orgId) {
    try {
      const client = await clerkClient();
      // get all organizations that the specific user has
      const { data: organization } =
        await client.users.getOrganizationMembershipList({ userId });

      if (organization && organization.length) {
        return NextResponse.next();
      }

      // get the userId info to build the org name
      const user = await client.users.getUser(userId);

      const orgName = user.fullName
        ? `${user.fullName}'s Organization`
        : user.firstName
        ? `${user.firstName}'s Organization`
        : user.username
        ? `${user.username}'s Organization`
        : user.primaryEmailAddress?.emailAddress
        ? `${user.primaryEmailAddress?.emailAddress}'s Organization`
        : "My Organization";

      // create the organization
      await client.organizations.createOrganization({
        name: orgName,
        createdBy: userId,
      });
      console.log("Auto-created organization: ", orgName)
      // Authought the organization was created, this doesn't show in the ui, I must use the clerk components to show it
    } catch (error) {
      console.error("Error auto-creating organization: ", error)
    }
  }

  // As I am customizing the clerkMiddleware function, I must declare its following if it doesn't fit in my condition
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
