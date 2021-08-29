import styles from './index.less';
import { Row, Col, Select } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const { Option } = Select;

export default function IndexPage() {
  return (
    <PageContainer header={{ title: 'LA County COVID Information by City' }}>
      <Row gutter={16}>
        <Col>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
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
