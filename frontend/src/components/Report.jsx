import { useEffect, useState, useContext } from "react";
import { getCreditReport } from "../services/credit-report-api";
import { IdContext } from "../context/documentId-context";
import CreditAccounts from "./ReportsComponent/CreditAccounts";
import BasicDetails from "./ReportsComponent/BasicDetails";
import ReportSummary from "./ReportsComponent/ReportSummary";
import Address from "./ReportsComponent/Address";

export default function Report() {
  const { id } = useContext(IdContext);
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        setError("No report found. Please upload a credit report first.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getCreditReport(id);
        setReport(data);
        setError(null);
      } catch (err) {
        setError("Failed to load report");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!report)
    return <div className="text-center py-8">No report data available</div>;

  const { basicDetails, reportSummary, creditAccounts, addresses } = report;

  return (
    <div className="space-y-8 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Credit Report</h2>

      {/* Basic Details & Report Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicDetails basicDetails={basicDetails} />
          <ReportSummary reportSummary={reportSummary} />
        </div>
      </div>

      {/* Credit Accounts */}
      <CreditAccounts creditAccounts={creditAccounts} />

      {/* Addresses */}
      <Address addresses={addresses} />
    </div>
  );
}
