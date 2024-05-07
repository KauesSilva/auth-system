import prismadb from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing data", { status: 500 });
    }

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist?.id) {
      return new NextResponse("User already exist", { status: 500 });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await prismadb.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashPassword,
      },
    });

    return new NextResponse("Succefully registered", { status: 200 });
  } catch (err: any) {
    console.log(`CREATE_ERR: ${err}`);
    return new NextResponse(err, { status: 500 });
  }
}
