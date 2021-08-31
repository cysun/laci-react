import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from "@ant-design/pro-layout";
import { Layout } from "antd";
import Cookies from "js-cookie";
import * as API from "./api";

const { Footer } = Layout;

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: false,
    footerRender: () => (
      <Footer style={{ textAlign: "center" }}>
        Copyright &copy; Chengyu Sun 2021.
        <br />
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </Footer>
    ),
    ...initialState?.settings,
  };
};

export async function getInitialState() {
  const cities: API.City[] = (await API.getCities()).data;
  let savedCityId = +(Cookies.get("laci-city-id") || "");
  return { cities, savedCityId };
}
