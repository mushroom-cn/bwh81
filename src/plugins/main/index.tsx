import { lazy } from 'react';
import i18n from '../../i18n';
import { registe } from '../../registor';

registe({
  id: 'main',
  Component: lazy(
    () =>
      import(
        /* webpackChunkName: "main-functions" */
        /* webpackMode: "lazy" */
        './MainFunctions'
      ),
  ),
  label: i18n.t('操作'),
  icon: '',
  path: 'main',
  order: 1,
  children: [
    {
      id: 'index',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './VMStatus'
          ),
      ),
      label: i18n.t('VM状态'),
      icon: '',
      path: 'index',
    },
    {
      id: 'privateNetwork',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './PrivateNetwork'
          ),
      ),
      label: i18n.t('私有网络'),
      icon: '',
      path: 'private-network',
    },
    {
      id: 'Detailedstatistics',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './DetailedStatistics'
          ),
      ),
      label: i18n.t('使用量分析'),
      icon: '',
      path: 'detailedStatistics',
    },
    {
      id: 'rootShellBasic',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './RootShellBasic'
          ),
      ),
      label: i18n.t('Shell - Basic'),
      icon: '',
      path: 'shell/basic',
    },
    {
      id: 'rootShellAdvanced',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './RootShellAdvanced'
          ),
      ),
      label: i18n.t('Root shell - advanced'),
      icon: '',
      path: 'shell/advanced',
    },
    {
      id: 'rootShellInteractive',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './RootShellInteractive'
          ),
      ),
      label: i18n.t('Root shell - interactive'),
      icon: '',
      path: 'shell/interactive',
    },
    {
      id: 'installOS',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './InstallOS'
          ),
      ),
      label: i18n.t('重装系统'),
      icon: '',
      path: 'install/os',
    },
    {
      id: 'twoFactorAuthentication',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './TwoFactorAuthentication'
          ),
      ),
      label: i18n.t('双因子认证'),
      icon: '',
      path: 'two-factor-authentication',
    },
    {
      id: 'resetPassword',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './ResetPassword'
          ),
      ),
      label: i18n.t('重置密码'),
      icon: '',
      path: 'reset-password',
    },
    {
      id: 'resetKiwiVMPassword',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './ResetKiwiVMPassword'
          ),
      ),
      label: i18n.t('重置KiwiVM密码'),
      icon: '',
      path: 'reset-kiwi-vm-password',
    },
    {
      id: 'ssh-key',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './PublicSSHKey'
          ),
      ),
      label: i18n.t('SSH 密钥'),
      icon: '',
      path: 'ssh-key',
    },
    {
      id: 'sessions',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './Sessions'
          ),
      ),
      label: i18n.t('Session管理'),
      icon: '',
      path: 'sessions',
    },
    {
      id: 'auditlog',
      Component: lazy(
        () =>
          import(
            /* webpackChunkName: "main-functions" */
            /* webpackMode: "lazy" */
            './AuditLog'
          ),
      ),
      label: i18n.t('审计'),
      icon: '',
      path: 'auditlog',
    },
  ],
});
