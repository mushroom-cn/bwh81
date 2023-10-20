import { ConfigProvider, Watermark } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useObservable, useSetState } from 'react-use';
import AppLayout from './Layout';
import { ThemeContext } from './common';
import style from './index.scss';
import { IMenuTheme } from './interface';
import './plugins';
import { DEFAULT_THEME_IDS, getDefaultTheme, themeRegistor$ } from './registor';

export function App() {
  const { t } = useTranslation();
  const themeRegistor = useObservable(themeRegistor$, {});
  const [{ theme }, setState] = useSetState<{ theme: IMenuTheme }>({
    theme: DEFAULT_THEME_IDS.default,
  });
  return (
    <ConfigProvider
      theme={{
        algorithm: themeRegistor[theme]?.config ?? getDefaultTheme(),
      }}
    >
      <ThemeContext.Provider value={{ theme }}>
        <Watermark
          className={classNames(style.w100, style.h100)}
          content={t('控制台')}
        >
          <AppLayout
            theme={theme}
            onThemeChange={(theme) => {
              setState({ theme });
            }}
          ></AppLayout>
        </Watermark>
      </ThemeContext.Provider>
    </ConfigProvider>
  );
}
