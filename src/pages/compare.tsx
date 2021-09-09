import { useState, useEffect } from "react";
import { useModel, request } from "umi";
import { Typography, Row, Col, Select, Table, message } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import Cookies from "js-cookie";
import { City, CityInfo, ChartRecord, DateRange } from "@/types";
import CityChart from "@/components/city-chart";

const { Option } = Select;
const { Paragraph, Text } = Typography;

export default function ComparePage() {
  const { initialState } = useModel("@@initialState");
  const [cityInfos, setCityInfos] = useState<CityInfo[]>([]);

  let addCity = (id: number, clearBeforeAdd = false) => {
    if (!clearBeforeAdd && cityInfos.length >= 5) {
      message.warning("Comparison limit reached.");
      return;
    }

    let city = initialState?.cities.find((c) => c.id == id) || ({} as City);
    request(`/cities/${id}/records`).then((res) => {
      let cityInfo = new CityInfo(city, res.data);
      0;
      if (clearBeforeAdd) setCityInfos([cityInfo]);
      else setCityInfos([...cityInfos, cityInfo]);
    });
  };

  useEffect(() => {
    let cityId = Cookies.get("laci-city-id");
    if (cityId) addCity(+cityId, true);
  }, []);

  let cases: ChartRecord[] = [];
  let deaths: ChartRecord[] = [];
  let dateRange: DateRange = {} as DateRange;
  let colors = ["blue", "green", "orange", "black", "Red"];

  if (cityInfos.length > 0) {
    dateRange = {
      start: cityInfos[0].data[0].date,
      end: cityInfos[0].data[cityInfos[0].data.length - 1].date,
    };
    cityInfos.forEach((cityInfo) => {
      cases = [
        ...cases,
        ...cityInfo.dataPer10k.map((d) => ({
          date: d.date.toDate(),
          label: d.label,
          value: d.cases7Avg,
          type: cityInfo.name,
        })),
      ];
    });
    cityInfos.forEach((cityInfo) => {
      deaths = [
        ...deaths,
        ...cityInfo.dataPer10k.map((d) => ({
          date: d.date.toDate(),
          label: d.label,
          value: d.deaths7Avg,
          type: cityInfo.name,
        })),
      ];
    });
  }

  return (
    <PageContainer header={{ title: "Compare Cities" }}>
      <Paragraph>
        Compare up to 5 cities on tests, cases and deaths{" "}
        <Text underline>per 10k population</Text>.
      </Paragraph>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            showSearch
            allowClear
            mode="multiple"
            placeholder="Select cities to compare"
            optionFilterProp="children"
            style={{ width: "100%" }}
            value={cityInfos.map((c) => c.id)}
            onClear={() => setCityInfos([])}
            onSelect={(value) => addCity(value)}
            onDeselect={(value) =>
              setCityInfos(cityInfos.filter((c) => c.id != value))
            }
          >
            {initialState?.cities.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Col>
        {cityInfos.length > 0 && (
          <>
            <Col span={24}>
              <Table
                dataSource={cityInfos}
                columns={[
                  { title: "Name", dataIndex: "name", key: "name" },
                  {
                    title: "Population",
                    dataIndex: "population",
                    key: "population",
                  },
                  { title: "Tests", dataIndex: "testsPer10k", key: "tests" },
                  { title: "Cases", dataIndex: "casesPer10k", key: "cases" },
                  { title: "Deaths", dataIndex: "deathsPer10k", key: "deaths" },
                ]}
                style={{ width: "100%" }}
                pagination={false}
              />
            </Col>
            <Col xs={24} lg={12}>
              <CityChart
                title="New Cases (7-day Avg)"
                records={cases}
                dateRange={dateRange}
                colors={colors}
              />
            </Col>
            <Col xs={24} lg={12}>
              <CityChart
                title="New Deaths (7-day Avg)"
                records={deaths}
                dateRange={dateRange}
                colors={colors}
              />
            </Col>
          </>
        )}
      </Row>
    </PageContainer>
  );
}
