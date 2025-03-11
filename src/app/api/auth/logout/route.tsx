import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { googleLogout } from "@react-oauth/google";

// Xóa JWT bằng cách đặt token thành "" và expires: new Date(0), khiến nó hết hạn ngay lập tức.
// httpOnly: true và secure: true giúp cookie chỉ được xóa qua HTTPS.
export async function POST() {
    (await cookies()).set("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0), // Xóa cookie ngay lập tức
        path: "/",
    });

    // Logout khỏi Google
    // googleLogout();

    return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
