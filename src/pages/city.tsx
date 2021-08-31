import { useEffect, useState } from "react";
import { useModel, history } from "umi";
import { Descriptions } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

export interface CityInfo {
  id: number;
  name: string;
  population: number;
  tests?: number;
  cases?: number;
  deaths?: number;
}

export default function CityPage(props: any) {
  const { initialState } = useModel("@@initialState");
  let cityId: number = props.match.params.id;
  let city = initialState?.cities.find((c) => c.id == cityId);

  const [cityInfo, setCityInfo] = useState({ ...city });
  return (
    <PageContainer header={{ title: cityInfo.name }}>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Population">
          {cityInfo.population}
        </Descriptions.Item>
      </Descriptions>
    </PageContainer>
  );
}
