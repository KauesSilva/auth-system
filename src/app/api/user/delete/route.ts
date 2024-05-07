import prismadb from "@/libs/prismadb";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing data", { status: 500 });
    }

    await prismadb.user.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse("User deleted sucessfully", { status: 200 });
  } catch (err: any) {
    console.log(`DELETE_ERR: ${err}`);
    return new NextResponse(err, { status: 500 });
  }
}
