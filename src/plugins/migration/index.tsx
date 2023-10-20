import React from 'react';
import i18n from '../../i18n';
import { registe } from '../../registor';

const Lazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "migration" */
      /* webpackMode: "lazy" */
      './Migration'
    ),
);

registe({
  id: 'migration',
  Component: Lazy,
  label: i18n.t('迁移'),
  icon: '',
  path: 'migration',
  children: [
    {
      id: 'migrateToAnotherDC',
      Component: Lazy,
      label: i18n.t('迁移到其他中心'),
      icon: '',
      path: 'index',
    },
  ],
  order: 2,
});
