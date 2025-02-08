import fs from "fs";
import { parseString } from "xml2js";
import { CreditReport } from "../models/creditReport.model.js";

export const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Read and parse the uploaded XML file
    fs.readFile(req.file.path, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading file" });
        }

        parseString(data, async (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error parsing XML" });
            }

            try {
                // Extract data from parsed XML
                const applicantDetails = result.INProfileResponse.Current_Application[0].Current_Application_Details[0].Current_Applicant_Details[0];
                const creditSummary = result.INProfileResponse.CAIS_Account[0].CAIS_Summary[0];
                const creditAccounts = result.INProfileResponse.CAIS_Account[0].CAIS_Account_DETAILS;

                // Format data for MongoDB
                const newCreditReport = new CreditReport({
                    basicDetails: {
                        name: `${applicantDetails.First_Name[0]} ${applicantDetails.Last_Name[0]}`,
                        mobilePhone: applicantDetails.MobilePhoneNumber[0],
                        pan: creditAccounts[0].CAIS_Holder_ID_Details[0].Income_TAX_PAN[0],
                        creditScore: parseInt(result.INProfileResponse.SCORE[0].BureauScore[0])
                    },
                    reportSummary: {
                        totalAccounts: parseInt(creditSummary.Credit_Account[0].CreditAccountTotal[0]),
                        activeAccounts: parseInt(creditSummary.Credit_Account[0].CreditAccountActive[0]),
                        closedAccounts: parseInt(creditSummary.Credit_Account[0].CreditAccountClosed[0]),
                        currentBalance: parseInt(creditSummary.Total_Outstanding_Balance[0].Outstanding_Balance_All[0]),
                        securedAmount: parseInt(creditSummary.Total_Outstanding_Balance[0].Outstanding_Balance_Secured[0]),
                        unsecuredAmount: parseInt(creditSummary.Total_Outstanding_Balance[0].Outstanding_Balance_UnSecured[0]),
                        last7DaysCreditEnquiries: parseInt(result.INProfileResponse.TotalCAPS_Summary[0].TotalCAPSLast7Days[0])
                    },
                    creditAccounts: creditAccounts.map((account) => ({
                        creditCardBank: account.Subscriber_Name[0],
                        accountNumber: account.Account_Number[0],
                        amountOverdue: parseInt(account.Amount_Past_Due[0] || 0),
                        currentBalance: parseInt(account.Current_Balance[0] || 0),
                        openDate: account.Open_Date[0] ? new Date(account.Open_Date[0]) : null
                    })),
                    addresses: [{
                        firstLine: creditAccounts[0].CAIS_Holder_Address_Details[0].First_Line_Of_Address_non_normalized[0],
                        secondLine: creditAccounts[0].CAIS_Holder_Address_Details[0].Second_Line_Of_Address_non_normalized[0],
                        thirdLine: creditAccounts[0].CAIS_Holder_Address_Details[0].Third_Line_Of_Address_non_normalized[0],
                        state: creditAccounts[0].CAIS_Holder_Address_Details[0].State_non_normalized[0],
                        zipCode: creditAccounts[0].CAIS_Holder_Address_Details[0].ZIP_Postal_Code_non_normalized[0],
                        countryCode: creditAccounts[0].CAIS_Holder_Address_Details[0].CountryCode_non_normalized[0]
                    }]
                });

                // Save to MongoDB
                await newCreditReport.save();
                res.status(201).json({ message: "File processed and saved successfully", documentId: newCreditReport._id });

            } catch (error) {
                console.error("Error processing XML data:", error);
                res.status(500).json({ error: "Failed to extract and save data" });
            }
        });
    });
};


export const getCreditReport = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "userId required" });
    }

    try {
        const data = await CreditReport.findById(userId);
        if (!data) {
            return res.status(404).json({ error: "Credit report not found" });
        }
        return res.json(data);  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error, please try again later" });
    }
};

