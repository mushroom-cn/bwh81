import { UnixTimestamp } from '../interface';

/* eslint-disable @typescript-eslint/ban-types */
export type StartReturn = void;
export type StopReturn = void;
export type RestartReturn = void;
export type KillReturn = void;
export type GetServiceInfoReturn = {
  /**
   * @description Hostname of the VPS
   */
  hostname: string;
  /**
   * @description IP address of the physical node
   */
  node_ip: string;
  /**
   * @description Internal nickname of the physical node
   */
  node_alias: string;
  /**
   * @description Physical location (country, state)
   */
  node_location: string;
  /**
   * @description Whether IPv6 is supported at the current location
   */
  location_ipv6_ready: string;
  /**
   * @description Name of plan
   */
  plan: string;
  /**
   * @description Disk quota (bytes)
   */
  plan_disk: number;
  /**
   * @description RAM (bytes)
   */
  plan_ram: number;
  /**
   * @description SWAP (bytes)
   */
  plan_swap: number;
  /**
   * @description Operating system
   */
  os: string;
  /**
   * @description Primary e-mail address of the account
   */
  email: string;
  /**
   * @description Allowed monthly data transfer (bytes). Needs to be multiplied by monthly_data_multiplier - see below.
   */
  plan_monthly_data: [];
  /**
   * @description Data transfer used in the current billing month. Needs to be multiplied by monthly_data_multiplier - see below.
   */
  data_counter: [];
  /**
   * @description Some locations offer more expensive bandwidth; this variable contains the bandwidth accounting coefficient.
   */
  monthly_data_multiplier: [];
  /**
   * @description Date and time of transfer counter reset (UNIX timestamp)
   */
  data_next_reset: UnixTimestamp;
  /**
   * @description IPv4 and IPv6 addresses assigned to VPS (Array)
   */
  ip_addresses: string[];
  /**
   * @description Private IPv4 addresses assigned to VPS (Array)
   */
  private_ip_addresses: string[];
  /**
   * @description Information on IP address nullrouting during (D)DoS attacks (Array). Sample output when IP is under attack:
   */
  ip_nullroutes: string[];
  /**
   * @description  Mounted image #1
   */
  iso1: string;
  /**
   * @description Mounted image #2 (currently unsupported)
   */
  iso2: string;
  /**
   * @description  Array of ISO images available for use
   */
  available_isos: [];
  /**
   * @description Maximum number of IPv6 addresses allowed by plan
   */
  plan_max_ipv6s: number;
  /**
   * @description  Whether or not rDNS records can be set via API
   */
  rdns_api_available: boolean;
  /**
   * @description Whether or not Private Network features are available on this plan
   */
  plan_private_network_available: boolean;
  /**
   * @description  Whether or not Private Network features are available at this location
   */
  location_private_network_available: boolean;
  /**
   * @description  rDNS records (Array of two-dimensional arrays: ip=>value)
   */
  ptr: [];
  /**
   * @description Whether VPS is suspended
   */
  suspended: boolean;
  /**
   * @description Whether there is an active policy violation that needs attention (see getPolicyViolations)
   */
  policy_violation: boolean;
  /**
   * @description  Number of times service was suspended in current calendar year
   */
  suspension_count: number;
  /**
   * @description  Total abuse points accumulated in current calendar year
   */
  total_abuse_points: number;
  /**
   * @description  Maximum abuse points allowed by plan in a calendar year
   */
  max_abuse_points: number;
};
export type GetLiveServiceInfoOVZHypervisorReturn = {
  /**
   * @description  array containing OpenVZ beancounters, system load average, number of processes, open files, sockets, memory usage etc
   */
  vz_status: string;
  /**
   * @description array containing OpenVZ disk size, inodes and usage info
   */
  vz_quota: [];
  /**
   * @description   0 = CPU is not throttled, 1 = CPU is throttled due to high usage. Throttling resets automatically every 2 hours.
   */
  is_cpu_throttled: number;
  /**
   * @description SSH port of the VPS
   */
  ssh_port: number;
};
export type GetLiveServiceInfoKVMHypervisorReturn = {
  /**
   * @description Starting, Running or Stopped
   */
  ve_status: string;
  /**
   * @description MAC address of primary network interface
   */
  ve_mac1: string;
  /**
   * @description Occupied (mapped) disk space in bytes
   */
  ve_used_disk_space_b: string;
  /**
   * @description Actual size of disk image in GB
   */
  ve_disk_quota_gb: number;
  /**
   * @description  0 = CPU is not throttled, 1 = CPU is throttled due to high usage. Throttling resets automatically every 2 hours.
   */
  is_cpu_throttled: number;
  /**
   * @description 0 = Disk I/O is not throttled, 1 = Disk I/O is throttled due to high usage. Throttling resets automatically every 15-180 minutes depending on sustained storage I/O utilization.
   */
  is_disk_throttled: number;
  /**
   * @description SSH port of the VPS (returned only if VPS is running)
   */
  ssh_port: number;
  /**
   * @description  Result of "hostname" command executed inside VPS
   */
  live_hostname: string;
  /**
   * @description Raw load average string
   */
  load_average: string;
  /**
   * @description Amount of available RAM in KB
   */
  mem_available_kb: number;
  /**
   * @description Total amount of Swap in KB
   */
  swap_total_kb: number;
  /**
   * @description Amount of available Swap in KB
   */
  swap_available_kb: number;
  /**
   * @description base64 encoded png screenshot of the VGA console
   */
  screendump_png_base64: string;
};
export type GetAvailableOSReturn = {
  /**
   * @description Currently installed Operating System
   */
  installed: [];
  /**
   * @description Array of available OS
   */
  templates: [];
};
export type ReinstallOSReturn = {
  /**
   * @description  New root password
   */
  rootPassword: string;
  /**
   * @description SSH port
   */
  sshPort: number;
  /**
   * @description SSH keys uploaded to /root/.ssh/authorized_keys
   */
  sshKeys: string;
  /**
   * @description  SSH keys (shortened for visual presentation)
   */
  sshKeysBrief: string;
  /**
   * @description E-mail address where notification will be sent when complete
   */
  notificationEmail: string;
};
export type UpdateSshKeysReturn = {};
export type GetSshKeysReturn = {
  /**
   * @description Per-VM SSH Keys stored in Hypervisor Vault
   */
  ssh_keys_veid: string;
  /**
   * @description Per-Account SSH keys stored in Billing Portal
   */
  ssh_keys_user: string;
  /**
   * @description SSH Keys which will be actually used during a reinstallOS call (Per-VM Keys will always override Per-Account keys)
   */
  ssh_keys_preferred: string;
  /**
   * @description Visually shortened keys
   */
  shortened_ssh_keys_veid: string;
  /**
   * @description  Visually shortened keys
   */
  shortened_ssh_keys_user: string;
  /**
   * @description Visually shortened keys
   * @type {string}
   */
  shortened_ssh_keys_preferred: string;
};
export type ResetRootPasswordReturn = {
  /**
   * @description New root password
   */
  password: string;
};
export type GetUsageGraphsReturn = {};
export type GetRawUsageStatsReturn = [];
export type GetAuditLogReturn = [];
export type SetHostnameReturn = {};
export type SetPTRReturn = {};
export type IsoMountReturn = {};
export type IsoUnmountReturn = {};
export type BasicShellCdReturn = {
  /**
   * @description Result of the "pwd" command after the change.
   */
  pwd: string;
};
export type BasicShellExecReturn = {
  /**
   * @description  Exit status code of the executed command
   */
  error: string;
  /**
   * @description  Console output of the executed command
   */
  message: string;
};
export type ShellScriptExecReturn = {
  /**
   * @description Name of the output log file.
   */
  log: string;
};
export type SnapshotCreateReturn = {
  /**
   * @description  E-mail address on file where notification will be sent once task is completed.
   */
  notificationEmail: string;
};
export type ISnapshot = {
  fileName: string;
  os: string;
  description: string;
  size: number;
  md5: string;
  sticky: string;
  purgesIn: string;
  downloadLink: string;
};
export type SnapshotListReturn = {
  /**
   * @description  Array of snapshots (fileName, os, description, size, md5, sticky, purgesIn, downloadLink).
   */
  snapshots: ISnapshot[];
};
export type SnapshotDeleteReturn = {};
export type SnapshotRestoreReturn = {};
export type SnapshotToggleStickyReturn = {};
export type SnapshotExportReturn = {};
export type SnapshotImportReturn = {};
export type IBackup = {
  backupToken: string;
  size: number;
  os: string;
  md5: string;
  timestamp: UnixTimestamp;
};
export type BackupListReturn = {
  /**
   * @description Array of backups (backupToken, size, os, md5, timestamp).
   */
  backups: IBackup[];
};
export type BackupCopyToSnapshotReturn = {};
export type Ipv6AddReturn = {
  /**
   * @description Newly assigned IPv6 address
   */
  ip: string;
};
export type Ipv6DeleteReturn = {};
export type MigrateGetLocationsReturn = {
  /**
   * @description ID of current location
   */
  currentLocation: string;
  /**
   * @description IDs of locations available for migration into
   */
  locations: string[];
  /**
   * @description  Friendly descriptions of available locations
   */
  descriptions: string;
  /**
   * @description Some locations may offer more expensive bandwidth where monthly allowance will be lower. This array contains monthly data transfer allowance multipliers for each location.
   */
  dataTransferMultipliers: string[];
};
export type MigrateStartReturn = {
  /**
   * @description  E-mail address on file where notification will be sent once task is completed.
   */
  notificationEmail: string;
  /**
   * @description Array of new IP addresses assigned to the VPS.
   */
  newIps: string[];
};
export type CloneFromExternalServerReturn = {};
export type GetSuspensionDetailsReturn = {
  /**
   * @description Number of times service was suspended in current calendar year
   */
  suspension_count: number;
  /**
   * @description Total abuse points accumulated in current calendar year
   */
  total_abuse_points: number;
  /**
   * @description Maximum abuse points allowed by plan in a calendar year
   */
  max_abuse_points: number;
  /**
   * @description array of all outstanding issues along with supporing evidence of abuse. See example below.
   */
  suspensions: [];
  /**
   * @description Full text of the complaint or more details about the issue
   */
  evidence: string;
};
export type GetPolicyViolationsReturn = {
  /**
   * @description Total abuse points accumulated in current calendar year
   */
  total_abuse_points: number;
  /**
   * @description Maximum abuse points allowed by plan in a calendar year
   */
  max_abuse_points: number;
  /**
   * @description array of all outstanding issues along with supporing evidence of abuse. See example below.
   */
  policy_violations: [];
};
export type UnsuspendReturn = {};
export type ResolvePolicyViolationReturn = {};
export type GetRateLimitStatusReturn = {
  /**
   * @description  Number of "points" available to use in the current 15-minute interval
   */
  remaining_points_15min: number;
  /**
   * @description Number of "points" available to use in the current 24-hour interval
   */
  remaining_points_24h: number;
};
export type PrivateIpGetAvailableIpsReturn = {
  /**
   * @description Array of available private IP addresses.
   */
  available_ips: string[];
};
export type PrivateIpAssignReturn = {
  /**
   * @description Array of successfully assigned private IP addresses
   */
  assigned_ips: string[];
};
export type PrivateIpDeleteReturn = {};
