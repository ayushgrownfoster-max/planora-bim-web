import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

// GET /api/blogs — public endpoint returning only published posts
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({ published: true })
      .select("title slug excerpt category author coverImage createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Public blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
