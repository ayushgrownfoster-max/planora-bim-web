import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

// GET /api/admin/blogs — list all blogs (published + drafts)
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Get blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST /api/admin/blogs — create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, coverImage, published } = body;

    if (!title || !excerpt || !content || !category || !author) {
      return NextResponse.json(
        { error: "title, excerpt, content, category, and author are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      category,
      author,
      coverImage: coverImage || "",
      published: published ?? false,
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
