
import { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "crypto";

export function requireInternalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const expectedSecret = process.env.INTERNAL_API_SECRET;
  const providedSecret = req.get("x-internal-api-secret");
  const userId = req.get("x-authenticated-user-id");

  if (!expectedSecret) {
    res.status(500).json({
      status: "error",
      message: "Internal authentication is not configured.",
    });
    return;
  }

  if (!providedSecret || !userId) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized request.",
    });
    return;
  }

  const expectedBuffer = Buffer.from(expectedSecret);
  const providedBuffer = Buffer.from(providedSecret);

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized request.",
    });
    return;
  }

  res.locals.userId = userId;
  next();
}
