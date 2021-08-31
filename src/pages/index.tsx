import { useModel, history } from "umi";
import { Select } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

const { Option } = Select;

export default function IndexPage() {
  const { initialState } = useModel("@@initialState");

  function selectCity(cityId: number) {
    history.push(`cities/${cityId}`);
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
