import { NextApiRequest } from "next/types";
import { authorizeWithToken } from "../auth.middleware";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) =>
  authorizeWithToken(req, async () => {
    const userId = req.data.userId;
    console.log("here...");
    try {
      const usersRef = collection(db, "users");
      const userDocs = await getDocs(usersRef);
      const usersData = userDocs.docs.map((user) => user.data);
      return NextResponse.json(
        { message: "Success", data: usersData },
        { status: 200 }
      );
      //   const userDocs = await getDocs(doc(db,"users"));
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 401 }
      );
    }
  });
