import {
  DefaultFooter,
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <div></div>,
    footerRender: () => (
      <DefaultFooter copyright="2021 Chengyu Sun" links={false} />
    ),
    ...initialState?.settings,
  };
};
