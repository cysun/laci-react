import { history } from "umi";
import { Row, Col, Card, Select, Tag, Statistic } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { Line, LineConfig } from "@ant-design/charts";
import { City } from "@/api";
import Cookies from "js-cookie";

const { Option } = Select;

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
  tests?: number;
  tests7Avg?: number;
  cases?: number;
  cases7Avg?: number;
  deaths?: number;
  deaths7Avg?: number;
}

export default function CityDashboard({
  cityInfo,
  cities,
}: {
  cityInfo: CityInfo;
  cities: City[];
}) {
  let cases = cityInfo.chartData?.flatMap((d) => [
    { label: d.label, value: d.cases, type: "Cases" },
    { label: d.label, value: d.cases7Avg, type: "Cases (7-day Average)" },
  ]);
  let deaths = cityInfo.chartData?.flatMap((d) => [
    { label: d.label, value: d.deaths, type: "Deaths" },
    { label: d.label, value: d.deaths7Avg, type: "Deaths (7-day Average)" },
  ]);

  let config: LineConfig = {
    xField: "label",
    yField: "value",
    seriesField: "type",
    color: ["yellow", "blue"],
  };

  return (
    <PageContainer
      header={{ title: cityInfo.name }}
      tags={[
        <Tag color="green">{cityInfo.lastUpdated?.toLocaleDateString()}</Tag>,
      ]}
      extra={[
        <Select
          showSearch
          placeholder="Select a city"
          optionFilterProp="children"
          style={{ width: 300 }}
          onChange={(value) => {
            Cookies.set("laci-city-id", value.toString(), { expires: 14 });
            history.push(`/cities/${value}`);
          }}
          defaultValue={cityInfo.id}
        >
          {cities.map((c) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Population" value={cityInfo.population} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic title="Tests" value={cityInfo.tests} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Cases"
              value={cityInfo.cases}
              valueStyle={{ color: "orange" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Deaths"
              value={cityInfo.deaths}
              valueStyle={{ color: "red" }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="New Cases">
            <Line data={cases} {...config} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="New Deaths">
            <Line data={deaths} {...config} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
