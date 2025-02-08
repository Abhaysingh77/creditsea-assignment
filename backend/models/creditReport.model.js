import mongoose from "mongoose";

const CreditReportSchema = new mongoose.Schema({
  basicDetails: {
    name: String,
    mobilePhone: String,
    pan: String,
    creditScore: Number,
    _id:false
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysCreditEnquiries: Number,
    _id:false
  },
  creditAccounts: [
    {
      creditCardBank: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
      openDate: String,
      _id:false,
    },
  ],
  addresses: [
    {
      firstLine: String,
      secondLine: String,
      thirdLine: String,
      state: String,
      zipCode: String,
      countryCode: String,
      _id:false
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const CreditReport = mongoose.model("CreditReport", CreditReportSchema);
