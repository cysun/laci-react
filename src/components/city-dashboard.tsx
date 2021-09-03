import { history } from "umi";
import { Row, Col, Card, Select, Tag, Statistic, DatePicker } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { Line, LineConfig } from "@ant-design/charts";
import Cookies from "js-cookie";
import { City } from "@/api";
import CityChart from "./city-chart";

const { Option } = Select;
const { RangePicker } = DatePicker;

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
    { date: d.date, label: d.label, value: d.cases, type: "Cases" },
    {
      date: d.date,
      label: d.label,
      value: d.cases7Avg,
      type: "Cases (7-day Average)",
    },
  ]);
  let deaths = cityInfo.chartData?.flatMap((d) => [
    { date: d.date, label: d.label, value: d.deaths, type: "Deaths" },
    {
      date: d.date,
      label: d.label,
      value: d.deaths7Avg,
      type: "Deaths (7-day Average)",
    },
  ]);
  let startDate = cityInfo.chartData[0].date;
  let endDate = cityInfo.chartData[cityInfo.chartData?.length - 1].date;

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
        <Col xs={24} lg={12}>
          <CityChart
            title="New Cases"
            data={cases}
            dateRange={{ startDate, endDate }}
          />
        </Col>
        <Col xs={24} lg={12}>
          <CityChart
            title="New Deaths"
            data={deaths}
            dateRange={{ startDate, endDate }}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
