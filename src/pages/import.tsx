import { useState } from "react";
import { Upload, Button, Space, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import DatePicker from "../components/DatePicker";
import settings from "../../settings.json";

export default function ImportPage() {
  const [dateStr, setDateStr] = useState("");
  const uploadProps: UploadProps = {
    name: "files",
    action: `${settings.apiBaseUrl}/records/${dateStr}`,
  };
  return (
    <PageContainer header={{ title: "Import Data" }}>
      <Space direction="vertical">
        <DatePicker
          onChange={(date, dateString) => {
            setDateStr(dateString);
          }}
        />
        {!!dateStr && (
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        )}
      </Space>
    </PageContainer>
  );
}
