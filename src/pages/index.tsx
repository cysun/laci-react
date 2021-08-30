import { useModel } from "umi";
import { Row, Col, Select } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

const { Option } = Select;

export default function IndexPage() {
  const { cities } = useModel("cities");
  return (
    <PageContainer header={{ title: "LA County COVID Information by City" }}>
      <Row gutter={16}>
        <Col span="6">
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a city"
            optionFilterProp="children"
          >
            {cities.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
      </Row>
    </PageContainer>
  );
}
