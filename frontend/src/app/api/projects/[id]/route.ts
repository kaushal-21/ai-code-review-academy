
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/server-auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUser(request);

    if (!userId) {
      return NextResponse.json(
        { status: "error", message: "Please log in first." },
        { status: 401 }
      );
    }

    if (!BACKEND_URL || !INTERNAL_API_SECRET) {
      return NextResponse.json(
        { status: "error", message: "Server configuration is missing." },
        { status: 500 }
      );
    }

    const { id } = await context.params;

    const backendResponse = await fetch(
      `${BACKEND_URL}/api/projects/${encodeURIComponent(id)}`,
      {
        headers: {
          "x-internal-api-secret": INTERNAL_API_SECRET,
          "x-authenticated-user-id": userId,
        },
        cache: "no-store",
      }
    );

    const result = await backendResponse.json();

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error("Single project API error:", error);

    return NextResponse.json(
      { status: "error", message: "Could not retrieve project." },
      { status: 500 }
    );
  }
}
