import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuTheme } from 'antd';
import { useObservable } from 'react-use';
import { themeRegistor$ } from '../../registor';

type ThemeSelectorProps = {
  value: string;
  onChange: (theme: string) => void;
};
export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  const themeRegistor = useObservable(themeRegistor$, {});
  return (
    <Dropdown
      menu={{
        theme: value as MenuTheme,
        items: Object.entries(themeRegistor).map(([key, value]) => {
          return {
            key,
            label: value.label,
            value: key,
            onClick: () => onChange(key),
          };
        }),
      }}
      trigger={['click']}
    >
      <Button>
        {themeRegistor[value]?.label} <DownOutlined rev={undefined} />
      </Button>
    </Dropdown>
  );
}
