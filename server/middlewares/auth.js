import { clerkClient } from "@clerk/express";

export const auth = async (req, resp, next) => {
  try {
    const { userId, has } = await req.auth();
    const hasPremiumPlan = await has({ plan: "premium" });

    const user = await clerkClient.users.getUser(userId);

    // ✅ Get current free_usage from Clerk
    let freeUsage = user.privateMetadata.free_usage;

    if (freeUsage === undefined || freeUsage === null) {
      // initialize only once
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      freeUsage = 0;
    }

    req.free_usage = freeUsage;
    req.plan = hasPremiumPlan ? "premium" : "free";

    next();
  } catch (error) {
    resp.json({ success: false, message: error.message });
  }
};
