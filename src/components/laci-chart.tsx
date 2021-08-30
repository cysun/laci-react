import { Row, Col, Select } from "antd";
import City from "../types/city";

const { Option } = Select;

// The way to specify the types of the destructured properties is rather
// counter-intuitive. This is because of the current limitation in TypeScript
// syntax. See https://github.com/microsoft/TypeScript/issues/29526 for
// more details.
export default function LaciChart({
  cities,
  defaultCityId,
}: {
  cities: City[];
  defaultCityId: number | undefined;
}) {
  return (
    <Row gutter={16}>
      <Col span="6">
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select a city"
          optionFilterProp="children"
          defaultValue={defaultCityId}
        >
          {cities.map((c: City) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Select showSearch style={{ width: 200 }} placeholder="Select a person">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Col>
    </Row>
  );
}
