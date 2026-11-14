
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/server-auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

export async function POST(request: Request) {
  try {
    // Verify that the user is logged in
    const userId = await getAuthenticatedUser(request);

    if (!userId) {
      return NextResponse.json(
        { status: "error", message: "Please log in first." },
        { status: 401 }
      );
    }

    // Check server configuration
    if (!BACKEND_URL || !INTERNAL_API_SECRET) {
      return NextResponse.json(
        { status: "error", message: "Server configuration is missing." },
        { status: 500 }
      );
    }

    // Read the project ID
    const body = await request.json();

    if (
      typeof body.projectId !== "string" ||
      !/^[0-9a-fA-F]{24}$/.test(body.projectId)
    ) {
      return NextResponse.json(
        { status: "error", message: "A valid project ID is required." },
        { status: 400 }
      );
    }

    // Forward the request securely to the backend
    const backendResponse = await fetch(
      `${BACKEND_URL}/api/reviews/analyze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-secret": INTERNAL_API_SECRET,
          "x-authenticated-user-id": userId,
        },
        body: JSON.stringify({ projectId: body.projectId }),
        cache: "no-store",
      }
    );

    const result = await backendResponse.json();

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error("Review API error:", error);

    return NextResponse.json(
      { status: "error", message: "Could not analyze the project." },
      { status: 500 }
    );
  }
}
