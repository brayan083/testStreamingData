import { fetchReportById } from "@/lib/data";
import { ReportContent } from "../reports/report-content";


export async function ReportDataServer({ reportId }: { reportId: string }) {

    const response = await fetchReportById(reportId);
    console.log("response", response);

    const seccions = response.sections;
    console.log("seccions", seccions);

    return (
        <div>
            <ReportContent datos={seccions} />
        </div>
    )

}