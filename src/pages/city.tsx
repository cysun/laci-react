import { useEffect, useState } from "react";
import { useModel, history } from "umi";
import { Descriptions } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import format from "date-fns/format";
import { Record, getRecords } from "@/api";

export interface CityInfo {
  id: number;
  name: string;
  population: number;
  lastUpdated?: Date;
  tests?: number;
  cases?: number;
  deaths?: number;
}

export default function CityPage(props: any) {
  const { initialState } = useModel("@@initialState");
  let cityId: number = props.match.params.id;
  let city = initialState?.cities.find((c) => c.id == cityId);

  const [cityInfo, setCityInfo] = useState<CityInfo>({ ...city });

  useEffect(() => {
    getRecords(cityId).then((res) => {
      let records: Record[] = res.data;
      let lastRecord = records[records.length - 1];
      console.log(records);
      let newCityInfo = { ...cityInfo };
      newCityInfo.lastUpdated = new Date(lastRecord.date);
      console.log(typeof newCityInfo.lastUpdated);
      newCityInfo.tests = lastRecord.tests;
      newCityInfo.cases = lastRecord.cases;
      newCityInfo.deaths = lastRecord.deaths;
      setCityInfo(newCityInfo);
    });
  }, []);
  return (
    <PageContainer header={{ title: cityInfo.name }}>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Last Updated">
          {cityInfo.lastUpdated?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Population">
          {cityInfo.population.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Test">
          {cityInfo.tests?.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Cases">
          {cityInfo.cases?.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Deaths">
          {cityInfo.deaths?.toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </PageContainer>
  );
}
