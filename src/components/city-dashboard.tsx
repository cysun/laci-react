import { history } from "umi";
import { Row, Col, Card, Select, Tag, Statistic } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import Cookies from "js-cookie";
import { ChartRecord, City, CityInfo, DateRange } from "@/types";
import CityChart from "./city-chart";

const { Option } = Select;

export default function CityDashboard({
  cityInfo,
  cities,
}: {
  cityInfo: CityInfo;
  cities: City[];
}) {
  let cases: ChartRecord[] = cityInfo.data.flatMap((d) => [
    {
      date: d.date.toDate(),
      label: d.label,
      value: d.cases,
      type: "Cases",
    },
    {
      date: d.date.toDate(),
      label: d.label,
      value: d.cases7Avg,
      type: "Cases (7-day Average)",
    },
  ]);
  let deaths: ChartRecord[] = cityInfo.data.flatMap((d) => [
    {
      date: d.date.toDate(),
      label: d.label,
      value: d.deaths,
      type: "Deaths",
    },
    {
      date: d.date.toDate(),
      label: d.label,
      value: d.deaths7Avg,
      type: "Deaths (7-day Average)",
    },
  ]);
  let dateRange: DateRange = {
    start: cityInfo.data[0].date,
    end: cityInfo.data[cityInfo.data.length - 1].date,
  };

  return (
    <PageContainer
      header={{ title: cityInfo.name }}
      tags={[<Tag color="green">{cityInfo.lastUpdated.format("l")}</Tag>]}
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
          <CityChart title="New Cases" records={cases} dateRange={dateRange} />
        </Col>
        <Col xs={24} lg={12}>
          <CityChart
            title="New Deaths"
            records={deaths}
            dateRange={dateRange}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
