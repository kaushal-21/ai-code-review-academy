
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from frontend/.env.local");
}

const client = new MongoClient(mongoUri);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [
    process.env.BETTER_AUTH_URL!,
    ...(process.env.NODE_ENV === "development"
        ? ["http://localhost:3000"]
        : []),
  ],
});
