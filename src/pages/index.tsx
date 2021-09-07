import { useModel, Redirect, history } from "umi";
import { Row, Col, Select } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import Cookies from "js-cookie";

const { Option } = Select;

export default function IndexPage() {
  const { initialState } = useModel("@@initialState");
  let savedCityId = Cookies.get("laci-city-id");

  function selectCity(cityId: number) {
    Cookies.set("laci-city-id", cityId.toString(), { expires: 14 });
    history.push(`/cities/${cityId}`);
  }

  if (savedCityId) return <Redirect to={`/cities/${savedCityId}`} />;
  else
    return (
      <PageContainer header={{ title: "LA COVID Information by City" }}>
        <Row>
          <Col xs={24} md={12} xl={8}>
            <Select
              showSearch
              placeholder="Select a city"
              optionFilterProp="children"
              style={{ width: "100%" }}
              onChange={selectCity}
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
