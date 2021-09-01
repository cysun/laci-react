import { Spin } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

export default function PageLoading({ title }: { title: string }) {
  return (
    <PageContainer header={{ title }}>
      <Spin />
    </PageContainer>
  );
}
