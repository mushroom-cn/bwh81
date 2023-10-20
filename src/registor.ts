import { theme } from 'antd';
import { BehaviorSubject, debounceTime } from 'rxjs';
import i18n from './i18n';
import { IPlugin, UniqueIdentifer } from './interface';

const _registor$ = new BehaviorSubject<IPlugin[]>([]);
export const pluginRegistor$ = _registor$
  .asObservable()
  .pipe(debounceTime(100));

export function registe(p: IPlugin) {
  _registor$.next(
    [..._registor$.value, p].sort((pre, next) => pre.order - next.order),
  );
}

export function unregiste(id: UniqueIdentifer) {
  _registor$.next(_registor$.value.filter(({ id: pId }) => pId !== id));
}

const _themeRegistor$ = new BehaviorSubject<
  Record<string, { config: typeof theme.defaultAlgorithm; label: string }>
>({});
export const themeRegistor$ = _themeRegistor$
  .asObservable()
  .pipe(debounceTime(100));

export function registeTheme(
  id: string,
  p: { config: typeof theme.defaultAlgorithm; label: string },
) {
  _themeRegistor$.next({
    ..._themeRegistor$.value,
    [id]: p,
  });
}

export function unregisteTheme(id: UniqueIdentifer) {
  const newTheme = _themeRegistor$.value;
  delete newTheme[id];
  _themeRegistor$.next({
    ...newTheme,
  });
}
export const DEFAULT_THEME_IDS = {
  light: 'light',
  dark: 'dark',
  compact: 'compact',
  default: 'light',
};

export function getDefaultTheme() {
  return theme.defaultAlgorithm;
}
export function getDefaultDarkTheme() {
  return theme.darkAlgorithm;
}

registeTheme(DEFAULT_THEME_IDS.default, {
  config: getDefaultTheme(),
  label: i18n.t('亮色主题'),
});
registeTheme(DEFAULT_THEME_IDS.dark, {
  config: getDefaultDarkTheme(),
  label: i18n.t('暗黑主题'),
});
registeTheme(DEFAULT_THEME_IDS.compact, {
  config: theme.compactAlgorithm,
  label: i18n.t('紧凑主题'),
});
