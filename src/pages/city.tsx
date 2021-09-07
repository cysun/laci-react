import { useModel, useRequest } from "umi";
import { Alert } from "antd";
import { City, CityInfo } from "@/types";
import CityDashboard from "@/components/city-dashboard";
import PageLoading from "@/components/page-loading";

export default function CityPage(props: any) {
  const { initialState } = useModel("@@initialState");
  let cityId: number = props.match.params.id;
  let city = initialState?.cities.find((c) => c.id == cityId) || ({} as City);

  const { data, error, loading } = useRequest(`/cities/${cityId}/records`, {
    refreshDeps: [cityId],
  });

  if (error)
    return <Alert message="Failed to load data" type="error" showIcon />;

  if (loading) return <PageLoading title={city.name} />;

  return (
    <CityDashboard
      cityInfo={new CityInfo(city, data)}
      cities={initialState?.cities || []}
    />
  );
}
