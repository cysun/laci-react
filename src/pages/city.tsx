import { useModel, useRequest } from "umi";
import { Alert } from "antd";
import isSameDay from "date-fns/isSameDay";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { Record } from "@/api";
import CityDashboard, {
  CityInfo,
  ChartDataEntry,
} from "@/components/city-dashboard";
import PageLoading from "@/components/page-loading";

export default function CityPage(props: any) {
  const { initialState } = useModel("@@initialState");
  let cityId: number = props.match.params.id;
  let city = initialState?.cities.find((c) => c.id == cityId);

  const { data, error, loading } = useRequest(`/cities/${cityId}/records`);

  if (error)
    return <Alert message="Failed to load data" type="error" showIcon />;

  if (loading) return <PageLoading title={city?.name} />;

  let cityInfo: CityInfo = { ...city };
  let records: Record[] = data;
  let lastRecord = records[records.length - 1];
  cityInfo.lastUpdated = new Date(lastRecord.date);
  cityInfo.tests = lastRecord.tests;
  cityInfo.cases = lastRecord.cases;
  cityInfo.deaths = lastRecord.deaths;

  cityInfo.chartData = eachDayOfInterval({
    start: new Date(records[1].date),
    end: cityInfo.lastUpdated,
  }).map((d) => ({
    date: d,
    label: d.toLocaleDateString(),
    newTests: null,
    newCases: null,
    newDeaths: null,
  }));

  let prevIndex = 0;
  let currentIndex = 1;
  cityInfo.chartData.forEach((entry) => {
    if (isSameDay(entry.date, new Date(records[currentIndex].date))) {
      entry.newTests = records[currentIndex].tests - records[prevIndex].tests;
      entry.newCases = records[currentIndex].cases - records[prevIndex].cases;
      entry.newDeaths =
        records[currentIndex].deaths - records[prevIndex].deaths;
      prevIndex = currentIndex++;
    }
  });

  return <CityDashboard cityInfo={cityInfo} />;
}
