import { useModel } from "umi";
import { PageContainer } from "@ant-design/pro-layout";
import Cookies from "js-cookie";

import LaciChart from "../components/laci-chart";

export default function IndexPage() {
  const { cities } = useModel("cities");
  let defaultCityId = +(Cookies.get("laci-city-id") || "");
  return (
    <PageContainer header={{ title: "LA County COVID Information by City" }}>
      <LaciChart cities={cities} defaultCityId={defaultCityId || undefined} />
    </PageContainer>
  );
}
