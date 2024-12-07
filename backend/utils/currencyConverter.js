import axios from "axios";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const ratesCache = new Map(); // Cache to store fetched rates

/**
 * Converts an amount from one currency to another.
 * 
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The currency code to convert from.
 * @param {string} toCurrency - The currency code to convert to (default: "USD").
 * @returns {Promise<number>} - The converted amount.
 */
export const convertCurrency = async (amount, fromCurrency, toCurrency = "USD") => {
  try {
    const cacheKey = `${fromCurrency}-${toCurrency}`;
    let exchangeRate;

    // Check if rates for the currency pair are cached
    if (ratesCache.has(cacheKey)) {
      exchangeRate = ratesCache.get(cacheKey);
    } else {
      // Fetch rates from API
      const response = await axios.get(`${BASE_URL}${fromCurrency}`);
      const rates = response.data.conversion_rates;

      // Cache the rates for later use
      Object.entries(rates).forEach(([currency, rate]) => {
        ratesCache.set(`${fromCurrency}-${currency}`, rate);
      });

      exchangeRate = rates[toCurrency];
    }

    if (!exchangeRate) {
      throw new Error(`Exchange rate from ${fromCurrency} to ${toCurrency} not found`);
    }

    return amount * exchangeRate; // Convert the amount
  } catch (error) {
    console.error("Currency conversion error:", error.message);
    throw new Error("Unable to convert currency at this time");
  }
};
