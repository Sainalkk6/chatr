import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWTCliams } from "@/types/auth";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_KEY ?? "secret";

export async function authorizeWithToken(
  req: NextApiRequest,
  next: () => void
) {
  const token = req.headers.authorization?.split(" ")[1] as string;

  // console.log(1234, { header: req.header.authorization });

  if (!token) {
    return NextResponse.json({ message: "Token is missing" }, { status: 400 });
  }

  try {
    const claims = jwt.verify(token, SECRET_KEY) as JWTCliams;
    req.data = { userId: claims.user_id };
    next();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid of expired token" },
      { status: 401 }
    );
  }
}
