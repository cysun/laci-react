import { RequestConfig } from "umi";
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from "@ant-design/pro-layout";
import { Layout } from "antd";
import settings from "../settings.json";
import { City, getCities } from "./api";

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

export const request: RequestConfig = {
  prefix: settings.apiBaseUrl,
};

export async function getInitialState() {
  const cities: City[] = await getCities();
  return { cities };
}
