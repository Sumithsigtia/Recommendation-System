import mongoose from "mongoose";


const previousInvestmentsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  fromYear: { type: Date, required: true },
  toYear: { type: Date, required: true },
  amount: { type: Number, required: true },
  currencyCode: { type: String, required: true }
});

const educationSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  specialization: { type: String, required: true },
  degree: { type: String, required: true },
  fromYear: { type: Date, required: true },
  toYear: { type: Date, required: true }
});

const previousExperienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  fromYear: { type: Date, required: true },
  toYear: { type: Date, required: true }
});

const investorSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: Number, required: true },
  imgUrl: { type: String, default: null },
  bio: { type: String, required: true },
  tagLine: { type: String },
  position: { type: String, required: true },
  totalExperience: { type: Number, required: true },
  previousInvestments: [previousInvestmentsSchema],
  openToInvest: { type: Boolean, required: true },
  minInvest: { type: Number, required: true },
  maxInvest: { type: Number, required: true },
  sweetSpot: { type: Number, required: true },
  currency: { type: String, required: true },
  permissions: { type: [String], required: true },
  education: [educationSchema],
  previousExperience: [previousExperienceSchema],
  role: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  industry: { type: [String], required: true },
  portfolioLink: { type: String },
  investmentLocation: { type: [String], required: true },
  investmentStage: { type: String, required: true },
  pitchesLiked: { type: [mongoose.Schema.Types.ObjectId], ref: 'Pitch' },
  linkedInLink: { type: String },
  googleCalendar: { type: Boolean, default: false },
  googleRefreshToken: { type: String, default: null },
  googleAccessToken: { type: String, default: null },
  tags: { type: [String], required: true },
  valuationInterestedIn: { type: Number, required: true },
  typeOfInvestment: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Investor", investorSchema);
