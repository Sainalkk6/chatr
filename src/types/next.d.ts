import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    data: { userId: string };
    header: { authorization: string };
  }
}
