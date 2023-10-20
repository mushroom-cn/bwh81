import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import * as Types from './interface';
export class BwhInstance {
  #httpClient: AxiosInstance = null;
  constructor(config?: CreateAxiosDefaults<unknown>) {
    this.#httpClient = axios.create(config);
  }

  /**
   * @description Starts the VPS
   */
  start() {
    return this.#httpClient<void, Types.StartReturn>({
      method: 'get',
      url: '/start',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Stops the VPS
   */
  stop() {
    return this.#httpClient<void, Types.StopReturn>({
      method: 'get',
      url: '/stop',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Reboots the VPS
   */
  restart() {
    return this.#httpClient<void, Types.RestartReturn>({
      method: 'get',
      url: '/restart',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Allows to forcibly stop a VPS that is stuck and cannot be stopped by normal means. Please use this feature with great care as any unsaved data will be lost.
   */
  kill() {
    return this.#httpClient<void, Types.KillReturn>({
      method: 'get',
      url: '/kill',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Returnsvm_type: Hypervizor type (ovz or kvm)
hostname: Hostname of the VPS
node_ip: IP address of the physical node
node_alias: Internal nickname of the physical node
node_location: Physical location (country, state)
location_ipv6_ready: Whether IPv6 is supported at the current location
plan: Name of plan
plan_disk: Disk quota (bytes)
plan_ram: RAM (bytes)
plan_swap: SWAP (bytes)
os: Operating system
email: Primary e-mail address of the account
plan_monthly_data: Allowed monthly data transfer (bytes). Needs to be multiplied by monthly_data_multiplier - see below.
data_counter: Data transfer used in the current billing month. Needs to be multiplied by monthly_data_multiplier - see below.
monthly_data_multiplier: Some locations offer more expensive bandwidth; this variable contains the bandwidth accounting coefficient.
data_next_reset: Date and time of transfer counter reset (UNIX timestamp)
ip_addresses: IPv4 and IPv6 addresses assigned to VPS (Array)
private_ip_addresses: Private IPv4 addresses assigned to VPS (Array)
ip_nullroutes: Information on IP address nullrouting during (D)DoS attacks (Array). Sample output when IP is under attack:
iso1: Mounted image #1
iso2: Mounted image #2 (currently unsupported)
available_isos: Array of ISO images available for use
plan_max_ipv6s: Maximum number of IPv6 addresses allowed by plan
rdns_api_available: Whether or not rDNS records can be set via API
plan_private_network_available: Whether or not Private Network features are available on this plan
location_private_network_available: Whether or not Private Network features are available at this location
ptr: rDNS records (Array of two-dimensional arrays: ip=>value)
suspended: Whether VPS is suspended
policy_violation: Whether there is an active policy violation that needs attention (see getPolicyViolations)
suspension_count: Number of times service was suspended in current calendar year
total_abuse_points: Total abuse points accumulated in current calendar year
max_abuse_points: Maximum abuse points allowed by plan in a calendar year
[ip_nullroutes] => Array
    (
        [1.2.3.4] => Array
            (
                [nullroute_timestamp] => 1556678627      // start of attack
                [nullroute_duration_s] => 360            // duration of nullroute
                [log] => "Packet dump data of the attack (multi-line)" // raw log of attack
            )

    )

*/
  getServiceInfo() {
    return this.#httpClient<void, Types.GetServiceInfoReturn>({
      method: 'get',
      url: '/getServiceInfo',
      data: {
        ...{},
      },
    });
  }

  /**
* @description This function returns all data provided by getServiceInfo. In addition, it provides detailed status of the VPS.
Please note that this call may take up to 15 seconds to complete.

Depending on hypervisor this call will return the following information:

Returns[OVZ hypervisor]
vz_status: array containing OpenVZ beancounters, system load average, number of processes, open files, sockets, memory usage etc
vz_quota: array containing OpenVZ disk size, inodes and usage info
is_cpu_throttled: 0 = CPU is not throttled, 1 = CPU is throttled due to high usage. Throttling resets automatically every 2 hours.
ssh_port: SSH port of the VPS

Returns[KVM hypervisor]
ve_status: Starting, Running or Stopped
ve_mac1: MAC address of primary network interface
ve_used_disk_space_b: Occupied (mapped) disk space in bytes
ve_disk_quota_gb: Actual size of disk image in GB
is_cpu_throttled: 0 = CPU is not throttled, 1 = CPU is throttled due to high usage. Throttling resets automatically every 2 hours.
is_disk_throttled: 0 = Disk I/O is not throttled, 1 = Disk I/O is throttled due to high usage. Throttling resets automatically every 15-180 minutes depending on sustained storage I/O utilization.
ssh_port: SSH port of the VPS (returned only if VPS is running)
live_hostname: Result of "hostname" command executed inside VPS
load_average: Raw load average string
mem_available_kb: Amount of available RAM in KB
swap_total_kb: Total amount of Swap in KB
swap_available_kb: Amount of available Swap in KB
screendump_png_base64: base64 encoded png screenshot of the VGA console
*/
  getLiveServiceInfo() {
    return this.#httpClient<
      void,
      | Types.GetLiveServiceInfoOVZHypervisorReturn
      | Types.GetLiveServiceInfoKVMHypervisorReturn
    >({
      method: 'get',
      url: '/getLiveServiceInfo',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Returnsinstalled: Currently installed Operating System
templates: Array of available OS
*/
  getAvailableOS() {
    return this.#httpClient<void, Types.GetAvailableOSReturn>({
      method: 'get',
      url: '/getAvailableOS',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Reinstall the Operating System. OS must be specified via "os" variable. Use getAvailableOS call to get list of available systems.

ReturnsrootPassword: New root password
sshPort: SSH port
sshKeys: SSH keys uploaded to /root/.ssh/authorized_keys
sshKeysBrief: SSH keys (shortened for visual presentation)
notificationEmail: E-mail address where notification will be sent when complete
*/
  reinstallOS({ data }: { data: { os: string } }) {
    return this.#httpClient<void, Types.ReinstallOSReturn>({
      method: 'get',
      url: '/reinstallOS',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Update per-VM SSH keys in Hypervisor Vault. Keys will be written to /root/.ssh/authorized_keys during a reinstallOS call. These keys will override any keys set in Billing Portal.
   */
  updateSshKeys({ data }: { data: { ssh_keys: string } }) {
    return this.#httpClient<void, Types.UpdateSshKeysReturn>({
      method: 'get',
      url: '/updateSshKeys',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Get SSH keys stored in Hypervisor Vault, as well as the ones stored in Billing Portal.

Returnsssh_keys_veid: Per-VM SSH Keys stored in Hypervisor Vault
ssh_keys_user: Per-Account SSH keys stored in Billing Portal
ssh_keys_preferred: SSH Keys which will be actually used during a reinstallOS call (Per-VM Keys will always override Per-Account keys)
shortened_ssh_keys_veid: Visually shortened keys
shortened_ssh_keys_user: Visually shortened keys
shortened_ssh_keys_preferred: Visually shortened keys
*/
  getSshKeys() {
    return this.#httpClient<void, Types.GetSshKeysReturn>({
      method: 'get',
      url: '/getSshKeys',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Generates and sets a new root password. 

Returnspassword: New root password
*/
  resetRootPassword() {
    return this.#httpClient<void, Types.ResetRootPasswordReturn>({
      method: 'get',
      url: '/resetRootPassword',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Obsolete, use getRawUsageStats instead
   */
  getUsageGraphs() {
    return this.#httpClient<void, Types.GetUsageGraphsReturn>({
      method: 'get',
      url: '/getUsageGraphs',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Returns a two-dimensional array with the detailed usage statistics shown under Detailed Statistics in KiwiVM.
   */
  getRawUsageStats() {
    return this.#httpClient<void, Types.GetRawUsageStatsReturn>({
      method: 'get',
      url: '/getRawUsageStats',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Returns an array with the detailed audit log shown under Audit Log in KiwiVM.
   */
  getAuditLog() {
    return this.#httpClient<void, Types.GetAuditLogReturn>({
      method: 'get',
      url: '/getAuditLog',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Sets new hostname.
   */
  setHostname({ data }: { data: { newHostname: string } }) {
    return this.#httpClient<void, Types.SetHostnameReturn>({
      method: 'get',
      url: '/setHostname',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Sets new PTR (rDNS) record for IP.
   */
  setPTR({ data }: { data: { ip: string; ptr: string } }) {
    return this.#httpClient<void, Types.SetPTRReturn>({
      method: 'get',
      url: '/setPTR',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Sets ISO image to boot from. VM must be completely shut down and restarted after this API call.
   */
  isoMount({ data }: { data: { iso: string } }) {
    return this.#httpClient<void, Types.IsoMountReturn>({
      method: 'get',
      url: '/iso/mount',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Removes ISO image and configures VM to boot from primary storage. VM must be completely shut down and restarted after this API call.
   */
  isoUnmount() {
    return this.#httpClient<void, Types.IsoUnmountReturn>({
      method: 'get',
      url: '/iso/unmount',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Simulate change of directory inside of the VPS. Can be used to build a shell like Basic shell.

Returnspwd: Result of the "pwd" command after the change.
*/
  basicShellCd({ data }: { data: { currentDir: string; newDir: string } }) {
    return this.#httpClient<void, Types.BasicShellCdReturn>({
      method: 'get',
      url: '/basicShell/cd',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Execute a shell command on the VPS (synchronously).

Returnserror: Exit status code of the executed command
message: Console output of the executed command
*/
  basicShellExec({ data }: { data: { command: string } }) {
    return this.#httpClient<void, Types.BasicShellExecReturn>({
      method: 'get',
      url: '/basicShell/exec',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Execute a shell script on the VPS (asynchronously).

Returnslog: Name of the output log file.
*/
  shellScriptExec({ data }: { data: { script: string } }) {
    return this.#httpClient<void, Types.ShellScriptExecReturn>({
      method: 'get',
      url: '/shellScript/exec',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Create snapshot

ReturnsnotificationEmail: E-mail address on file where notification will be sent once task is completed.
*/
  snapshotCreate({ data }: { data: { description?: string } }) {
    return this.#httpClient<void, Types.SnapshotCreateReturn>({
      method: 'get',
      url: '/snapshot/create',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Get list of snapshots.

Returnssnapshots: Array of snapshots (fileName, os, description, size, md5, sticky, purgesIn, downloadLink).
*/
  snapshotList() {
    return this.#httpClient<void, Types.SnapshotListReturn>({
      method: 'get',
      url: '/snapshot/list',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Delete snapshot by fileName (can be retrieved with snapshot/list call).
   */
  snapshotDelete({ data }: { data: { snapshot: string } }) {
    return this.#httpClient<void, Types.SnapshotDeleteReturn>({
      method: 'get',
      url: '/snapshot/delete',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Restores snapshot by fileName (can be retrieved with snapshot/list call). This will overwrite all data on the VPS.
   */
  snapshotRestore({ data }: { data: { snapshot: string } }) {
    return this.#httpClient<void, Types.SnapshotRestoreReturn>({
      method: 'get',
      url: '/snapshot/restore',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Set or remove sticky attribute ("sticky" snapshots are never purged). Name of snapshot can be retrieved with snapshot/list call – look for fileName variable.
Set sticky = 1 to set sticky attribute
Set sticky = 0 to remove sticky attribute
*/
  snapshotToggleSticky({
    data,
  }: {
    data: { snapshot: string; sticky: string };
  }) {
    return this.#httpClient<void, Types.SnapshotToggleStickyReturn>({
      method: 'get',
      url: '/snapshot/toggleSticky',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Generates a token with which the snapshot can be transferred to another instance.
   */
  snapshotExport({ data }: { data: { snapshot: string } }) {
    return this.#httpClient<void, Types.SnapshotExportReturn>({
      method: 'get',
      url: '/snapshot/export',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Imports a snapshot from another instance identified by VEID and Token. Both VEID and Token must be obtained from another instance beforehand with a snapshot/export call.
   */
  snapshotImport({
    data,
  }: {
    data: { sourceVeid: string; sourceToken: string };
  }) {
    return this.#httpClient<void, Types.SnapshotImportReturn>({
      method: 'get',
      url: '/snapshot/import',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Get list of automatic backups.

Returnsbackups: Array of backups (backupToken, size, os, md5, timestamp).
*/
  backupList() {
    return this.#httpClient<void, Types.BackupListReturn>({
      method: 'get',
      url: '/backup/list',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Copies a backup identified by backupToken (returned by backup/list) into a restorable Snapshot.
   */
  backupCopyToSnapshot({ data }: { data: { backupToken: string } }) {
    return this.#httpClient<void, Types.BackupCopyToSnapshotReturn>({
      method: 'get',
      url: '/backup/copyToSnapshot',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Assigns a new IPv6 address. For initial IPv6 assignment an empty IP is required (call without parameters), and a new IP from the available pool is assigned automatically. All subsequent requested IPv6 addresses must be within the /64 subnet of the first IPv6 address.

Returnsip: Newly assigned IPv6 address
*/
  ipv6Add({ data }: { data: { ip: string } }) {
    return this.#httpClient<void, Types.Ipv6AddReturn>({
      method: 'get',
      url: '/ipv6/add',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Releases specified IPv6 address.
   */
  ipv6Delete({ data }: { data: { ip: string } }) {
    return this.#httpClient<void, Types.Ipv6DeleteReturn>({
      method: 'get',
      url: '/ipv6/delete',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Return all possible migration locations.

ReturnscurrentLocation: ID of current location
locations: IDs of locations available for migration into
descriptions: Friendly descriptions of available locations
dataTransferMultipliers: Some locations may offer more expensive bandwidth where monthly allowance will be lower. This array contains monthly data transfer allowance multipliers for each location.
*/
  migrateGetLocations() {
    return this.#httpClient<void, Types.MigrateGetLocationsReturn>({
      method: 'get',
      url: '/migrate/getLocations',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Start VPS migration to new location. Takes new location ID as input. Note that this will result in all IPv4 addresses to be replaced with new ones, and all IPv6 addresses will be released.

ReturnsnotificationEmail: E-mail address on file where notification will be sent once task is completed.
newIps: Array of new IP addresses assigned to the VPS.
*/
  migrateStart({ data }: { data: { location: string } }) {
    return this.#httpClient<void, Types.MigrateStartReturn>({
      method: 'get',
      url: '/migrate/start',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description (OVZ only) Clone a remote server or VPS. See Migrate from another server for example on how this works.
   */
  cloneFromExternalServer({
    data,
  }: {
    data: {
      externalServerIP: string;
      externalServerSSHport: string;
      externalServerRootPassword: string;
    };
  }) {
    return this.#httpClient<void, Types.CloneFromExternalServerReturn>({
      method: 'get',
      url: '/cloneFromExternalServer',
      data: {
        ...data,
      },
    });
  }

  /**
* @description Retrieve information related to service suspensions.

Returnssuspension_count: Number of times service was suspended in current calendar year
total_abuse_points: Total abuse points accumulated in current calendar year
max_abuse_points: Maximum abuse points allowed by plan in a calendar year
suspensions: array of all outstanding issues along with supporing evidence of abuse. See example below.
evidence: Full text of the complaint or more details about the issue

Sample output when service is suspended:
[suspensions] => Array
    (
        [0] => stdClass Object
            (
                [record_id] => 11851         // Case ID, needed to unsuspend 
                                             // the service via "unsuspend" API call
                [flag] => copyright          // Type of abuse
                [is_soft] => 1               // 0 = must contact support to unsuspend
                                             // 1 = can unsuspend via API call
                [evidence_record_id] => 2207 // Detailed abuse report ID (see below)
                [abuse_points] => 100        // Each abuse incident increases total_abuse_points counter
            )
    )

[evidence] => stdClass Object
    (
        [2207] => "Full text of abuse complaint here"
    )

[suspension_count] => 2
[total_abuse_points] => 200
[max_abuse_points] => 1500

*/
  getSuspensionDetails() {
    return this.#httpClient<void, Types.GetSuspensionDetailsReturn>({
      method: 'get',
      url: '/getSuspensionDetails',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Retrieve information related to active policy violations.

Returnstotal_abuse_points: Total abuse points accumulated in current calendar year
max_abuse_points: Maximum abuse points allowed by plan in a calendar year
policy_violations: array of all outstanding issues along with supporing evidence of abuse. See example below.

Sample output when there is an active policy violation:
[policy_violations] => Array
    (
        [0] => Array
            (
                [record_id] => 14            // Case ID, for resolvePolicyViolation 
                [timestamp] => 1571469818    // Unix timestamp when record was created
                [suspend_at] => 1571599418   // Service will be suspended if not resolved by this time
                [flag] => copyright          // Type of abuse
                [is_soft] => 1               // 0 = must contact support to unsuspend
                                             // 1 = can unsuspend via API call
                [abuse_points] => 100        // Each abuse incident increases total_abuse_points counter
                [evidence_data] =>           // Details of violation (text)
            )

    )

[total_abuse_points] => 200
[max_abuse_points] => 1500
[error] => 0

*/
  getPolicyViolations() {
    return this.#httpClient<void, Types.GetPolicyViolationsReturn>({
      method: 'get',
      url: '/getPolicyViolations',
      data: {
        ...{},
      },
    });
  }

  /**
   * @description Clear abuse issue identified by record_id and unsuspend the VPS. Refer to getSuspensionDetails call for details.
   */
  unsuspend({ data }: { data: { record_id: string } }) {
    return this.#httpClient<void, Types.UnsuspendReturn>({
      method: 'get',
      url: '/unsuspend',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Mark policy violation as resolved. This is required to avoid service suspension. Refer to getPolicyViolations call for details.
   */
  resolvePolicyViolation({ data }: { data: { record_id: string } }) {
    return this.#httpClient<void, Types.ResolvePolicyViolationReturn>({
      method: 'get',
      url: '/resolvePolicyViolation',
      data: {
        ...data,
      },
    });
  }

  /**
* @description When you perform too many API calls in a short amount of time, KiwiVM API may start dropping your requests for a few minutes. This call allows monitoring this matter.

Returnsremaining_points_15min: Number of "points" available to use in the current 15-minute interval
remaining_points_24h: Number of "points" available to use in the current 24-hour interval
*/
  getRateLimitStatus() {
    return this.#httpClient<void, Types.GetRateLimitStatusReturn>({
      method: 'get',
      url: '/getRateLimitStatus',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Returns all available (free) IPv4 addresses which you can activate on VM

Returnsavailable_ips: Array of available private IP addresses.
*/
  privateIpGetAvailableIps() {
    return this.#httpClient<void, Types.PrivateIpGetAvailableIpsReturn>({
      method: 'get',
      url: '/privateIp/getAvailableIps',
      data: {
        ...{},
      },
    });
  }

  /**
* @description Assign private IP address. If IP address not specified, a random address will be assigned.

Returnsassigned_ips: Array of successfully assigned private IP addresses
*/
  privateIpAssign({ data }: { data: { ip?: string } }) {
    return this.#httpClient<void, Types.PrivateIpAssignReturn>({
      method: 'get',
      url: '/privateIp/assign',
      data: {
        ...data,
      },
    });
  }

  /**
   * @description Delete private IP address.
   */
  privateIpDelete({ data }: { data: { ip: string } }) {
    return this.#httpClient<void, Types.PrivateIpDeleteReturn>({
      method: 'get',
      url: '/privateIp/delete',
      data: {
        ...data,
      },
    });
  }
}
