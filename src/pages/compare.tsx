import { useModel } from "umi";
import { Typography, Row, Col, Select } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { City, CityInfo } from "@/types";

const { Option } = Select;
const { Paragraph } = Typography;

export default function ComparePage() {
  const { initialState } = useModel("@@initialState");

  return (
    <PageContainer header={{ title: "Compare Cities" }}>
      <Paragraph>
        Compare up to 5 cities on 7-day averages of new cases and deaths per 10k
        population.
      </Paragraph>
      <Row>
        <Col span={24}>
          <Select
            showSearch
            allowClear
            mode="multiple"
            placeholder="Select cities to compare"
            optionFilterProp="children"
            style={{ width: "100%" }}
          >
            {initialState?.cities.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </PageContainer>
  );
}
