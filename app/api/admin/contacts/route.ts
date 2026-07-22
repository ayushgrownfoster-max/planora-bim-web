import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";

// GET /api/admin/contacts — list all contacts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { org: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// PATCH /api/admin/contacts — update contact status
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    await connectDB();

    const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ contact });
  } catch (error) {
    console.error("Update contact error:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
