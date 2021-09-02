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
  }));

  let fields = ["tests", "cases", "deaths"];

  let index = 1;
  let lastDataIndex = -1;
  for (let i = 0; i < cityInfo.chartData.length; ++i) {
    if (isSameDay(cityInfo.chartData[i].date, new Date(records[index].date))) {
      fields.forEach((field) => {
        let increment = records[index][field] - records[index - 1][field];
        increment = increment >= 0 ? increment : 0;
        if (i - lastDataIndex == 1) cityInfo.chartData[i][field] = increment;
        else {
          increment /= i - lastDataIndex;
          for (let j = lastDataIndex + 1; j <= i; ++j)
            cityInfo.chartData[j][field] = increment;
        }
      });
      ++index;
      lastDataIndex = i;
    }
  }

  for (let i = 0; i < cityInfo.chartData.length; ++i) {
    fields.forEach((field) => {
      let sum = 0;
      let count = 0;
      for (let j = i; j > i - 7 && j >= 0; --j) {
        sum += cityInfo.chartData[j][field];
        ++count;
      }
      cityInfo.chartData[i][`${field}7Avg`] = sum / count;
    });
  }

  return <CityDashboard cityInfo={cityInfo} cities={initialState?.cities} />;
}
