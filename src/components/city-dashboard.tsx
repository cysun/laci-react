import { Descriptions } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { Line, LineConfig } from "@ant-design/charts";

export interface CityInfo {
  id?: number;
  name?: string;
  population?: number;
  lastUpdated?: Date;
  tests?: number;
  cases?: number;
  deaths?: number;
  chartData?: ChartDataEntry[];
}

export interface ChartDataEntry {
  date: Date;
  label: string;
  newTests: number;
  newCases: number;
  newDeaths: number;
}

export default function CityDashboard({ cityInfo }: { cityInfo: CityInfo }) {
  let lineConfig: LineConfig = {
    data: cityInfo.chartData,
    xField: "label",
    yField: "newDeaths",
    connectNulls: true,
  };

  return (
    <PageContainer header={{ title: cityInfo.name }}>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Last Updated">
          {cityInfo.lastUpdated?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Population">
          {cityInfo.population?.toLocaleString()}
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
      <Line {...lineConfig} />
    </PageContainer>
  );
}
