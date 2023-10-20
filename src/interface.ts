import { MenuTheme } from 'antd';

export type UniqueIdentifer = string;
export type UnixTimestamp = number;
export interface IPlugin {
  id: UniqueIdentifer;
  label: string;
  icon: string;
  path: string;
  children: Omit<IPlugin, 'children' | 'order'>[];
  Component: React.ComponentType;
  index?: false;
  order: number;
}

export type IMenuTheme = MenuTheme | string;
