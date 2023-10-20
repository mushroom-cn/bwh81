import {
  Flex,
  Layout,
  Menu,
  MenuTheme,
  Space,
  Spin,
  Typography,
  theme as antdTheme,
} from 'antd';
import { SubMenuType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import React, { Suspense } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import { useObservable } from 'react-use';
import { getLinkPath } from './common';
import { ThemeSelector } from './common/components/ThemeSelector';
import style from './index.scss';
import { IMenuTheme, IPlugin } from './interface';
import { pluginRegistor$ } from './registor';

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

function getMenus(plugins: IPlugin[], parent: IPlugin = null) {
  return plugins?.map((plugin) => {
    const { id, icon, label, children } = plugin;
    const menu: SubMenuType = {
      children: getMenus(children as IPlugin[], plugin),
      key: id,
      icon,
      label: parent ? (
        <Link to={getLinkPath([parent?.path, plugin.path])}> {label}</Link>
      ) : (
        label
      ),
    };
    return menu;
  });
}
type AppLayoutProps = {
  theme: IMenuTheme;
  onThemeChange: (theme: IMenuTheme) => void;
};
const AppLayout: React.FC<AppLayoutProps> = ({ theme, onThemeChange }) => {
  const { token } = antdTheme.useToken();
  const { colorBgContainer, colorTextHeading } = token;

  const plugins = useObservable(pluginRegistor$, []);
  const { t } = useTranslation();
  return (
    <Layout className={classNames(style.w100, style.h100)}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ flex: '1 1 auto' }}
        >
          <Title level={4} style={{ color: colorTextHeading }}>
            {' '}
            {t('控制台')}{' '}
          </Title>
          <ThemeSelector value={theme} onChange={onThemeChange} />
        </Flex>
      </Header>
      <Layout>
        <Sider width={200}>
          <Scrollbars autoHide hideTracksWhenNotNeeded>
            <Menu
              mode="inline"
              theme={theme as MenuTheme}
              style={{ height: '100%', borderRight: 0 }}
              items={getMenus(plugins)}
            />
          </Scrollbars>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Scrollbars autoHide hideTracksWhenNotNeeded>
            {/* <Breadcrumb2 /> */}
            <Content
              style={{
                padding: 24,
                margin: 0,
                background: colorBgContainer,
              }}
              className={classNames(style.w100, style.h100)}
            >
              <Routes>
                {plugins.map(({ id, path, children, Component, index }) => {
                  return (
                    <Route
                      key={id}
                      id={id}
                      path={path}
                      element={
                        <Suspense
                          fallback={
                            <Space
                              direction="vertical"
                              className={classNames(style.w100)}
                            >
                              <Spin>
                                <></>
                              </Spin>
                            </Space>
                          }
                        >
                          <Scrollbars autoHide hideTracksWhenNotNeeded>
                            <Component />
                          </Scrollbars>
                        </Suspense>
                      }
                      index={index}
                    >
                      {children.map(({ id, path, Component, index }) => {
                        return (
                          <Route
                            key={id}
                            id={id}
                            path={path}
                            element={
                              <Suspense
                                fallback={
                                  <Space
                                    direction="vertical"
                                    className={classNames(style.w100)}
                                  >
                                    <Spin>
                                      <></>
                                    </Spin>
                                  </Space>
                                }
                              >
                                <Component />
                              </Suspense>
                            }
                            index={index}
                          />
                        );
                      })}
                    </Route>
                  );
                })}
              </Routes>
            </Content>
          </Scrollbars>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
