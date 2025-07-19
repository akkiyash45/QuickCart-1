import { Inngest } from "inngest";
import connectDB from "@config/db";
import User from "@/models/User";

export const inngest = new Inngest({
  id: "quickcart-app",
  name: "QuickCart",
});

export const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_address, image_url } = event.data;
    const userData = {
      id,
      name: `${first_name} ${last_name}`,
      email_address: email_address[0].email_address,
      image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

export const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id, first_name, last_name, email_address, image_url } = event.data;
    const userData = {
      name: `${first_name} ${last_name}`,
      email_address: email_address[0].email_address,
      image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData); // ✅ fix casing here too
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
