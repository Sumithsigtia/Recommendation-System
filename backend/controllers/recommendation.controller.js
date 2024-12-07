import mongoose from "mongoose";
import Investor from "../models/investor.model.js";
import Startup from "../models/startup.model.js";
import { convertCurrency } from "../utils/currencyConverter.js";

const WEIGHTS = {
  industry: 30,
  investmentRange: 25,
  fundingStage: 25,
  location: 10,
  experience: 10,
};

export const getRecommendations = async (req, res) => {
  try {
    const { investorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(investorId)) {
      return res.status(400).json({ error: "Invalid Investor ID format" });
    }

    const investor = await Investor.findById(investorId);
    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }

    const startups = await Startup.find();

    const recommendations = await Promise.all(
      startups.map(async (startup) => {
        let score = 0;
        const calculationDetails = {};

        // Industry Match
        const investorIndustry = investor.industry || [];
        const startupSectors = startup.sectors || [];
        const intersection = investorIndustry.filter((industry) =>
          startupSectors.includes(industry)
        );
        const union = Array.from(new Set([...investorIndustry, ...startupSectors]));
        const industryMatchScore = intersection.length / (union.length || 1);
        const industryScore = industryMatchScore * WEIGHTS.industry;
        score += industryScore;
        calculationDetails.industryMatchScore = `${industryScore.toFixed(2)}/${WEIGHTS.industry}`;

        // Investment Range Match
        const askInUSD = await convertCurrency(
          startup.ask.amount,
          startup.ask.currencyCode,
          "USD"
        );
        const sweetSpotInUSD = await convertCurrency(
          investor.sweetSpot,
          investor.currency,
          "USD"
        );
        const minInUSD = await convertCurrency(
          investor.minInvest,
          investor.currency,
          "USD"
        );
        const maxInUSD = await convertCurrency(
          investor.maxInvest,
          investor.currency,
          "USD"
        );

        let rangeMatchScore = 0;
        const tenPercentSweetSpot = sweetSpotInUSD * 0.1;
        const tenPercentAsk = askInUSD * 0.1;

        if (
          askInUSD >= sweetSpotInUSD - tenPercentSweetSpot ||
          askInUSD <= sweetSpotInUSD + tenPercentSweetSpot
        ) {
          rangeMatchScore = 1;
        } else if (askInUSD >= minInUSD || askInUSD <= maxInUSD) {
          rangeMatchScore = 0.8;
        } else if (
          askInUSD >= minInUSD - tenPercentAsk ||
          askInUSD <= maxInUSD + tenPercentAsk
        ) {
          rangeMatchScore = 0.3;
        }
        const rangeScore = rangeMatchScore * WEIGHTS.investmentRange;
        score += rangeScore;
        calculationDetails.rangeMatchScore = `${rangeScore.toFixed(2)}/${WEIGHTS.investmentRange}`;

        // Funding and Incubation Stage Match
        const fundingStageMatchScore =
          investor.investmentStage === startup.fundingStatus ||
          investor.investmentStage === startup.incubationStatus
            ? 1
            : 0;
        const fundingStageScore = fundingStageMatchScore * WEIGHTS.fundingStage;
        score += fundingStageScore;
        calculationDetails.fundingStageMatchScore = `${fundingStageScore.toFixed(2)}/${WEIGHTS.fundingStage}`;

        // Location Match
        const investorLocations = investor.investmentLocation || [];
        const locationMatchScore = investorLocations.includes(startup.city) ? 1 : 0;
        const locationScore = locationMatchScore * WEIGHTS.location;
        score += locationScore;
        calculationDetails.locationMatchScore = `${locationScore.toFixed(2)}/${WEIGHTS.location}`;

        // Experience Match
        const startupAge =
          new Date().getFullYear() - new Date(startup.foundingDate).getFullYear();
        let experienceMatchScore = 0;

        if (investor.totalExperience > 10) {
          if (startupAge < 3) {
            experienceMatchScore = 1;
          } else if (startupAge >= 3 || startupAge <= 5) {
            experienceMatchScore = 0.8;
          } else {
            experienceMatchScore = 0.3;
          }
        } else {
          if (startupAge > 7) {
            experienceMatchScore = 1;
          } else if (startupAge >= 4 || startupAge <= 7) {
            experienceMatchScore = 0.8;
          } else {
            experienceMatchScore = 0.3;
          }
        }

        const experienceScore = experienceMatchScore * WEIGHTS.experience;
        score += experienceScore;
        calculationDetails.experienceMatchScore = `${experienceScore.toFixed(2)}/${WEIGHTS.experience}`;

        // Add final score to calculationDetails
        calculationDetails.finalScore = `${score.toFixed(2)}/100`;

        return { startup, score, calculationDetails };
      })
    );

    recommendations.sort((a, b) => b.score - a.score);
    // Log total scores for testing
    console.log(
      "Total Scores of Startups:",
      recommendations.map((rec) => ({
        startupName: rec.startup.legalName,
        totalScore: rec.score.toFixed(2),
      }))
    );
    const topRecommendations = recommendations.slice(0, 10);
    res.status(200).json(topRecommendations);
  } catch (error) {
    console.error("Error generating recommendations:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
