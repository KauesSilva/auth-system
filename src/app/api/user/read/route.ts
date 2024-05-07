import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prismadb.user.findMany();
    if (!users) {
      return new NextResponse("No user exist", { status: 500 });
    }
    return NextResponse.json(users);
  } catch (err: any) {
    console.log(`READ_ERR: ${err}`);
    return new NextResponse(err, { status: 500 });
  }
}
