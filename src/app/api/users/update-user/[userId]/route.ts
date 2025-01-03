import { db } from "@/utils/firebaseConfig";
import { pinata } from "@/utils/pinataConfig";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: any) => {
  const { userId } = await params;
  const data = await req.json();

  console.log(13241234, { data });

  const buffer = Buffer.from(data.imageUrl, "base64");

  const file = new File([buffer], "user-profile.jpg", {
    type: "image/jpeg",
    lastModified: Date.now(),
  });

  const uploadData = await pinata.upload.file(file);
  const url = await pinata.gateways.createSignedURL({
    cid: uploadData.cid,
    expires: 324646734687675,
  });

  try {
    await updateDoc(doc(db, "users", userId), {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      profileImage: url,
    });
    return NextResponse.json({
      message: "User data has been updated successfully",
    });
  } catch (err) {
    return NextResponse.json({
      message: "Something went wrong while updating the user info",
      error: err,
    });
  }
};
