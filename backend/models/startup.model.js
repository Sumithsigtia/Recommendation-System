import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
  revenue: { type: Number },
  date: { type: Date }
});

const askSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currencyCode: { type: String, required: true }
});

const startupSchema = new mongoose.Schema({
  legalName: { type: String, required: true },
  city: { type: String, default: "to be added" },
  description: { type: String },
  pan: { type: String, default: "to be added" },
  foundingDate: { type: Date, default: null },
  dipp: { type: String, default: "to be added" },
  registrationStatus: { type: String, default: "to be added" },
  cllpin: { type: String, default: "to be added" },
  address: { type: String, default: "to be added" },
  valuationStatus: { type: String, default: "to be added" },
  fundingStatus: { type: String, default: "Not Funded" },
  incubationStatus: { type: String, default: "Not Incubated" },
  revenues: [revenueSchema],
  emails: { type: [String], default: [] },
  phones: { type: [String], default: [] },
  sectors: { type: [String], default: [] },
  ask: askSchema
});

export default mongoose.model("Startup", startupSchema);
