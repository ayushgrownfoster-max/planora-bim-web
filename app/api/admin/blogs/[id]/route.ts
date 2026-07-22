import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

// PUT /api/admin/blogs/[id] — update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/admin/blogs/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
