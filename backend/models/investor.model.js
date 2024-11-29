import mongoose from "mongoose";

const permissionEnum = [
  "ALL",
  "ADMINS",
  "USERS",
  "PITCH",
  "ANALYTICS",
  "TRANSACTIONS",
  "FOLLOWUP",
  "ARTICLE",
  "REPORT",
  "REQUEST",
  "DASHBOARD",
  "SETTLEMENTS",
  "UPLOAD",
  "SESSIONS"
];

const perviousInvestmentSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  fromYear: { type: Date, required: true },
  toYear: { type: Date },
  amount: { type: Number, required: true },
  currencyCode: { type: String, required: true },
});

const investorSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    imgUrl: { type: String },
    bio: { type: String },
    tagLine: { type: String },
    position: { type: String },
    totalExperience: { type: Number, min: 1, max: 50 },
    previousInvestments: [perviousInvestmentSchema],
    openToInvest: { type: Boolean, default: false },
    minInvest: { type: Number },
    maxInvest: { type: Number },
    sweetSpot: { type: Number },
    currency: { type: String },
    permissions: [{ type: String, enum: permissionEnum }],
  },
  { timestamps: true }
);

export default mongoose.model("Investor", investorSchema);
