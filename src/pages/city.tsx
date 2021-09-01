import { useModel, useRequest } from "umi";
import { Alert } from "antd";
import format from "date-fns/format";
import { Record } from "@/api";
import CityDashboard, { CityInfo } from "@/components/city-dashboard";
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

  return <CityDashboard cityInfo={cityInfo} />;
}
