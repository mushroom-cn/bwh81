import React from 'react';
import i18n from '../../i18n';
import { registe } from '../../registor';

const Lazy = React.lazy(
  () =>
    import(
      /* webpackChunkName: "extras" */
      /* webpackMode: "lazy" */
      './KiwiVMExtras'
    ),
);

registe({
  id: 'extras',
  Component: Lazy,
  label: i18n.t('其他'),
  icon: '',
  path: 'extras',
  children: [
    {
      id: 'api',
      Component: Lazy,
      label: i18n.t('API'),
      icon: '',
      path: 'api',
    },
    {
      id: 'snapshots',
      Component: Lazy,
      label: i18n.t('快照'),
      icon: '',
      path: 'snapshots',
    },
    {
      id: 'backups',
      Component: Lazy,
      label: i18n.t('备份'),
      icon: '',
      path: 'backups',
    },
    {
      id: 'openVPNServer',
      Component: Lazy,
      label: i18n.t('OpenVPN Server'),
      icon: '',
      path: 'OpenVPNServer',
    },
  ],
  order: 3,
});
