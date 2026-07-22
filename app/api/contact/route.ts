import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, org, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await Contact.create({
      name,
      email,
      org: org || "",
      projectType: projectType || "BIM Coordination",
      message,
      status: "new",
    });

    return NextResponse.json(
      { success: true, id: contact._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}
