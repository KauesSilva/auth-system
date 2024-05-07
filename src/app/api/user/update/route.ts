import prismadb from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing data", { status: 500 });
    }

    const body = await req.json();
    const { name, email, password } = body;

    const userOldData = await prismadb.user.findUnique({
      where: {
        id,
      },
    });

    if (!userOldData) {
      return new NextResponse("User not found", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userNewData = {
      name: name || userOldData.name,
      email: email || userOldData.email,
      hashedPassword: hashedPassword || userOldData.hashedPassword,
    };

    await prismadb.user.update({
      where: {
        id,
      },
      data: userNewData,
    });

    return new NextResponse("Successfully updated", { status: 200 });
  } catch (err: any) {
    console.log(`UPDATE_ERR: ${err}`);
    return new NextResponse(err, { status: 500 });
  }
}
