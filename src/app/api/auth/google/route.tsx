import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
    try {
        const { credential } = await req.json();
        if (!credential) {
            return NextResponse.json({ error: "Missing credential" }, { status: 400 });
        }

        // Gọi API của Google để lấy thông tin user từ access_token
        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: { Authorization: `Bearer ${credential}` },
        });

        if (!googleRes.ok) {
            return NextResponse.json({ error: "Invalid Google token" }, { status: 400 });
        }

        const decoded = await googleRes.json(); // Lấy thông tin user từ Google
        const { sub, email, name, picture } = decoded;

        // Kiểm tra user đã tồn tại chưa
        let user = await prisma.user.findUnique({
            where: { googleId: sub },
        });

        if (!user) {
            // Nếu chưa có, tạo mới
            user = await prisma.user.create({
                data: {
                    googleId: sub,
                    email,
                    name,
                    picture,
                    role: "user",
                },
            });
        }

        // Tạo JWT
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });

        // Lưu vào cookie
        (await
            // Lưu vào cookie
            cookies()).set("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 });

        return NextResponse.json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
