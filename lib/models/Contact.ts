import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  org: string;
  projectType: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    org: { type: String, trim: true, default: "" },
    projectType: {
      type: String,
      required: true,
      enum: ["BIM Coordination", "LOD 500 Modeling", "Digital Twin Setup", "Custom Revit API"],
      default: "BIM Coordination",
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
