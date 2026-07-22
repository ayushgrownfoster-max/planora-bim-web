import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
    });

    const response = NextResponse.json({
      success: true,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
