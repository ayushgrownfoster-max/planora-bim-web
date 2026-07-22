import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";

// DELETE /api/admin/contacts/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
