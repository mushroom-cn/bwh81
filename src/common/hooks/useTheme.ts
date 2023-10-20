import { createContext } from 'react';

export function useTheme() {}
type IThemeContext = {
  theme: string;
};
export const ThemeContext = createContext<IThemeContext>({ theme: 'light' });
