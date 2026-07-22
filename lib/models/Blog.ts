import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML from Tiptap editor
  category: string;
  author: string;
  coverImage: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Modeling", "Coordination", "OpenBIM", "Revit", "General"],
      default: "General",
    },
    author: { type: String, required: true, trim: true },
    coverImage: { type: String, default: "" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug before saving
BlogSchema.pre("validate", function (next: any) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title) + "-" + Date.now();
  }
  next();
});

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
