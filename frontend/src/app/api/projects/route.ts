
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/server-auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

async function forwardRequest(
  method: "GET" | "POST",
  userId: string,
  body?: unknown
) {
  if (!BACKEND_URL || !INTERNAL_API_SECRET) {
    return NextResponse.json(
      { status: "error", message: "Server configuration is missing." },
      { status: 500 }
    );
  }

  const backendResponse = await fetch(`${BACKEND_URL}/api/projects`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-internal-api-secret": INTERNAL_API_SECRET,
      "x-authenticated-user-id": userId,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });

  const result = await backendResponse.json();

  return NextResponse.json(result, {
    status: backendResponse.status,
  });
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUser(request);

    if (!userId) {
      return NextResponse.json(
        { status: "error", message: "Please log in first." },
        { status: 401 }
      );
    }

    return await forwardRequest("GET", userId);
  } catch (error) {
    console.error("Projects GET error:", error);

    return NextResponse.json(
      { status: "error", message: "Could not retrieve projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUser(request);

    if (!userId) {
      return NextResponse.json(
        { status: "error", message: "Please log in first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    return await forwardRequest("POST", userId, body);
  } catch (error) {
    console.error("Projects POST error:", error);

    return NextResponse.json(
      { status: "error", message: "Could not save project." },
      { status: 500 }
    );
  }
}
