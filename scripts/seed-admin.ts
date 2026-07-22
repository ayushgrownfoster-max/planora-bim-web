/**
 * Seed script — creates the initial admin user.
 * Run once: npx ts-node --project tsconfig.seed.json scripts/seed-admin.ts
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

// Read .env.local manually if MONGODB_URI is not in process.env
let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const match = line.trim().match(/^MONGODB_URI=(?:"([^"]+)"|'([^']+)'|([^#\s]+))/);
      if (match) {
        MONGODB_URI = match[1] || match[2] || match[3];
        break;
      }
    }
  }
}

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// ─── Inline Admin Schema (avoids TS path resolution issues) ───────────────────
const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

// ─── Seed ─────────────────────────────────────────────────────────────────────
const ADMIN_NAME = "Planora Admin";
const ADMIN_EMAIL = "admin@planora.com";
const ADMIN_PASSWORD = "Admin@1234"; // ← CHANGE THIS AFTER FIRST LOGIN

async function seed() {
  console.log("🔌  Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected.");

  const existing = await Admin.findOne({ email: ADMIN_EMAIL } as any);
  if (existing) {
    console.log(`ℹ️   Admin already exists: ${ADMIN_EMAIL}`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, passwordHash });

  console.log("✅  Admin user created!");
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log("⚠️   Please change the password after your first login.");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
}
);

