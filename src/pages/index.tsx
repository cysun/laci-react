import { useModel, Redirect, history } from "umi";
import { Select } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import Cookies from "js-cookie";

const { Option } = Select;

export default function IndexPage() {
  const { initialState } = useModel("@@initialState");

  function selectCity(cityId: number) {
    Cookies.set("laci-city-id", cityId.toString(), { expires: 14 });
    history.push(`/cities/${cityId}`);
  }

  return (
    <PageContainer header={{ title: "LA COVID Information by City" }}>
      <Select
        showSearch
        placeholder="Select a city"
        optionFilterProp="children"
        style={{ width: 400 }}
        onChange={selectCity}
      >
        {initialState?.cities.map((c) => (
          <Option key={c.id} value={c.id}>
            {c.name}
          </Option>
        ))}
      </Select>
    </PageContainer>
  );
}
