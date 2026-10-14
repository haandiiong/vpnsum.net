---
title: Android机场客户端教程：FlClash与sing-box订阅导入、VPN授权及断连排查
createTime: 2026/07/27
updateTime: 2026/10/14
permalink: /guides/android-proxy-client/
tags:
  - Android
  - 机场客户端
  - Clash
  - sing-box
description: 按Clash/Mihomo YAML与sing-box JSON选择Android客户端，介绍FlClash和SFA的官方APK、架构选择、配置导入、VPN授权、后台权限、连接验证及更新回退。
---

Android 上先选订阅格式，再选客户端。机场后台的“复制订阅”可能返回 Clash/Mihomo 配置、sing-box 配置或一串节点链接；地址都以 HTTPS 开头，不代表内容通用。本文分别说明 FlClash 和 sing-box for Android（简称 SFA）的导入方法。

核对日期为 **2026 年 10 月 14 日**：FlClash 官方发布页有当天发布的 **0.9.0**；sing-box 官方发布页有 10 月 9 日发布的稳定版 **1.14.3**，附件包含 SFA 安装包。两者截至核对时均有近期发布记录。下文菜单按这两个版本的官方源码核对，不代表对你的手机、套餐或线路进行过实测。下载时仍以官方最新稳定版和发布说明为准。

## 先确认你拿到哪种配置

| 客户端 | 本教程采用的输入 | 适合的情况 | 导入前确认 |
| --- | --- | --- | --- |
| FlClash | Clash/Mihomo 的 YAML 配置文件或返回该配置的订阅地址 | 服务商提供 Clash、Clash Meta 或 Mihomo 导入入口，希望通过策略组选节点 | 复制的是订阅地址，不是登录页、购买页或使用说明页 |
| SFA | 完整的 sing-box JSON 配置文件或返回该配置的远程地址 | 服务商明确提供适配 Android/SFA 的 sing-box 配置 | 配置与客户端内核版本兼容，并包含接管手机流量所需的 TUN 入站 |

FlClash 使用 mihomo 内核；SFA 管理本地或远程 sing-box 配置。**SFA 不能把 Clash YAML 当作 sing-box JSON 直接导入**，给文件改名为 `.json` 也不会转换内容。服务商只给裸节点链接、Base64 节点列表或专属 App 时，先向其确认对应客户端的配置出口；一份节点信息也不等于完整的 DNS 和分流配置。[FlClash 项目说明](https://github.com/chen08209/FlClash)、[SFA 官方说明](https://sing-box.sagernet.org/clients/android/)、[sing-box 配置格式](https://sing-box.sagernet.org/configuration/)

订阅地址中的令牌可能让别人使用你的套餐。导入时只把它交给选定的客户端；反馈错误时隐藏地址中的令牌、节点密码和 UUID，不要把完整订阅贴到在线转换站或公开评论区。

## 下载 APK：先核对来源，再核对架构

FlClash 从 [chen08209/FlClash 的 Releases](https://github.com/chen08209/FlClash/releases) 下载带 `android` 的 `.apk`。SFA 从 [SagerNet/sing-box 的 Releases](https://github.com/SagerNet/sing-box/releases) 下载文件名以 `SFA-` 开头的 `.apk`；这里也有服务器和其他系统的软件包，不要下载成 `sing-box-…-linux` 压缩包。SFA 的 [官方 Android 页面](https://sing-box.sagernet.org/clients/android/) 还提供 Play 商店与 F-Droid 入口。

| APK 文件名中的标记 | 选择方法 |
| --- | --- |
| `arm64-v8a` | 64 位 ARM Android 系统，通常是近年的手机；按设备实际支持的架构选择 |
| `armeabi-v7a` | 32 位 ARM 系统的设备；不能只看处理器宣传为“64 位”就判断系统支持 arm64 |
| `x86` / `x86_64` | 对应 Intel 架构的设备或模拟器，普通 ARM 手机不要选 |
| `universal` | 同一个 APK 含多种架构，体积较大；SFA 发布页提供此类包，拿不准架构时可选它 |

架构不确定时查手机厂商说明，或在已连接电脑并启用调试的情况下查询 `adb shell getprop ro.product.cpu.abilist`；返回值包含 `arm64-v8a` 才能据此选该包。架构含义见 [Android ABI 官方说明](https://developer.android.com/ndk/guides/abis)。

还要核对 Android 版本。FlClash 0.9.0 的原生模块最低版本为 Android 7.0；SFA 1.14.3 的普通构建最低为 Android 7.0，Android 5.0/6.0 使用发布页标明 `legacy-android-5` 的构建。架构匹配也不能解决系统版本过低的问题。安装遇到不兼容或签名冲突时，先重新核对包与来源；不要靠关闭 Play 保护机制解决。

## FlClash：导入 Clash/Mihomo 订阅

1. 在服务商后台选择 **Clash/Mihomo** 对应入口并复制订阅地址。第一次导入前先确认手机本身能正常联网。
2. 打开 FlClash 的 **配置** 页面，点 **添加配置**（已有配置时可用加号），选择 **链接**。
3. 在“从链接导入”窗口粘贴完整地址，可填写便于识别的名称，例如“主订阅”，然后确认。等待下载与配置校验完成；有错误时先看提示，不要连续重复添加。
4. 返回配置列表，选择刚导入的配置，使其成为当前配置。若服务商给的是 YAML 文件，第二步改选 **文件**，再用系统文件选择器找到文件；本地文件不会像远程订阅一样自动取得服务商更新。
5. 在 **代理** 页面查看策略组。手动选择组中一个实际节点，或使用配置提供的自动选择组。第一次检查可以运行延迟测试，但延迟数字只说明测试目标的结果，不能证明所有网站或 App 都能使用。
6. 在 **仪表盘** 确认 Android 的 **VPN** 开关已开启，再点 **启动** 并完成下面的系统授权。

“规则”模式按配置分流；“直连”不会把请求送往代理节点。先沿用服务商提供的规则，不要同时调整 DNS、分应用列表和多个覆写项。以后更新订阅，在配置页面使用 **更新** 按钮，完成后再次确认当前配置和节点选择。

## SFA：导入 sing-box JSON

### 用远程地址导入

1. 从服务商后台复制 **sing-box/SFA** 对应的配置地址，确认提供方说明它适配当前 sing-box 版本。不要复制旁边的 Clash 地址。
2. 打开 SFA，找到主界面的 **配置** 卡片，点加号；选择 **手动创建**，进入 **新建配置** 页面。
3. 填写 **名称**，把 **类型** 从“本地”切换为 **远程**，在 **URL** 中粘贴地址，然后点 **创建**。这里的“手动创建”是进入配置表单，并不要求你自己编写 JSON。
4. 等待客户端下载并检查配置。创建成功后确认该配置已选中；需要手动换配置时，点配置卡片中的当前配置打开选择列表。
5. 点 **启动**。如果配置包含 TUN 入站，会请求 Android VPN 授权。若启动成功却没有系统 VPN，先核对配置是否只是本地 HTTP/SOCKS 代理，要求服务商提供适配 Android 的 TUN 配置。

远程配置保存 URL，供后续更新使用；不要把远程配置的临时编辑当作永久修复，下一次更新可能覆盖修改。自动更新失败时，仍需单独检查配置地址是否可访问，不能只看服务当前在运行。

### 用本地文件导入

在配置卡片点加号 → **从文件导入** → 选择服务商提供的 JSON。按导入表单确认名称并完成创建，检查当前配置，再启动。此方式导入的是本地副本，服务商改节点后需要重新取得配置。

SFA 没有节点组可选不一定是导入失败：只有配置包含 Selector 或 URLTest 组时，客户端才有对应选择内容。提供方若只给固定节点配置，需按其配置说明使用。[sing-box 客户端通用功能说明](https://sing-box.sagernet.org/clients/general/)

## 完成 Android VPN 授权

首次启动时，Android 会弹出建立 VPN 连接的系统确认窗口。核对应用名称是你安装的客户端，再允许连接。随后在系统 **设置 → 网络和互联网 → VPN** 中检查正在运行的应用；找不到该入口时，在设置中搜索“VPN”。普通 Android VPN 接管不需要 root。

同一用户或工作资料中只能有一个活动的 Android VPN 服务。广告拦截、防火墙或另一款代理 App 也可能占用这个位置：先停止另一款，再启动当前客户端。系统出现 VPN 标识只表示本地 VPN 已建立，不代表代理节点已经联网。[Android VPN 机制](https://developer.android.com/develop/connectivity/vpn)、[Android VPN 设置帮助](https://support.google.com/android/answer/9089766)

第一次验证前先检查原有 **始终开启 VPN** 和 **阻止不使用 VPN 的连接** 设置。后者会在 VPN 停止时阻断普通网络；若这是你自己设定的选项，排查时记录其状态，避免把这种预期阻断当作套餐故障。工作设备的相关限制可能由管理员管理。[Android 企业 VPN 说明](https://support.google.com/work/android/answer/9213914)

## 只在发生后台断连时调整权限

先保持默认电池设置试用。如果前台能用、锁屏后中断，再按下面顺序检查；不同手机的入口文字可能不同。

1. 长按客户端图标，打开 **应用信息**，查 **电池 / 应用电池用量 / 允许后台使用**。对该客户端允许后台使用；有“不受限制”或“不优化”选项时，可作为针对该应用的排查措施。
2. 旧版系统可在 **设置 → 电池 → 电池优化** 中选择该客户端并调整。Android 的 Doze 会限制闲置时的网络活动，免于电池优化也不代表所有后台限制都消失。[Android 电池优化说明](https://developer.android.com/training/monitoring-device-state/doze-standby)、[Pixel 的后台用量入口](https://support.google.com/pixelphone/answer/6090599)
3. 若厂商系统另外提供 **自启动 / 后台运行**，检查该应用是否被限制；具体入口查你的机型说明，不能把一种手机的路径当作全部 Android 通用路径。
4. 使用移动网络时检查客户端的后台数据权限；开启节省流量时，检查“不受限制的数据使用”是否允许它联网。通知权限影响你查看连接状态，不要只因没有通知就判定服务停止。[Android 后台数据设置](https://support.google.com/googleplay/answer/1663315)

每次只改一项，然后回到客户端启动连接，锁屏数分钟、解锁再访问同一目标。这个检查用来缩小后台限制的可能性，不是对全天稳定性的保证。若后台一直正常，无需为了“保活”关闭整台手机的省电策略。

## 怎样判断导入和连接都成功

把以下四步分别检查，避免看到一个绿色按钮就结束：

1. **配置层：**当前配置有名称且已选中，没有下载或解析错误。FlClash 能看到配置中的节点/组；SFA 的组取决于 JSON 内容。
2. **系统层：**客户端显示运行，系统 VPN 页面显示对应应用连接中。SFA 若用于手机流量接管，还需确认存在 TUN 入站。
3. **实际请求：**用浏览器访问一个你知道能够使用的普通网页，再访问你实际需要的目标服务。随后单独测试目标 App；浏览器成功不能代替 App 检查。
4. **路径核对：**访问目标时查看客户端连接/日志，核对规则是否选中了预期出站。国内网站按规则直连时，出口未变化可能是正确行为；不要用一个走直连的网站判断所有流量都没代理。

再分别用 Wi-Fi 和移动数据检查一次，记录差异。若一种网络正常、另一种异常，应先沿网络差异排查，避免直接重装客户端。

## 常见失败：从症状决定下一步

| 症状 | 先查什么 | 下一步 |
| --- | --- | --- |
| 导入提示解析失败、配置无效 | 返回的是 YAML、JSON、节点列表还是 HTML 登录页；客户端与配置版本是否匹配 | 回后台复制正确格式，保留错误原文；SFA 的旧字段问题按官方迁移说明处理 |
| 更新返回 401/403，或下载失败 | 订阅是否过期、令牌是否重置、套餐是否有效，当前网络能否到达订阅域名 | 重新从账户后台取地址；不要盲目删改链接参数 |
| 显示运行但目标打不开 | VPN 是否属于该应用、FlClash 的模式与节点选择、SFA 的 TUN 配置 | 先确认流量已进入客户端，再看对应请求日志；启动内核不等于代理可用 |
| 所有节点超时 | 当前网络、套餐状态、系统自动日期时间、配置资源下载错误 | 换 Wi-Fi/移动数据做对照，试另一个节点；延迟测试失败也可能是测试 URL 被限制 |
| 浏览器正常，某个 App 不通 | 分应用代理的包含/排除列表，该 App 的域名是否命中直连或拦截规则 | 对照该 App 请求日志，调整一个相关设置后重试 |
| 前台正常，锁屏后断连 | 客户端是否仍运行、电池和后台数据限制、另一款 VPN 是否接管 | 按上一节逐项处理，避免同时改节点和后台设置 |
| 刚更新软件后启动报未知字段 | 客户端内核版本与配置格式、此前是否加过覆写 | 看发布说明和迁移文档，先用提供方的新配置或已保存的原始配置验证 |

**症状与逻辑演示：**假设同一订阅在 FlClash 导入正常，粘贴到 SFA 后立即报解析错误，首先验证它是否返回 Clash YAML；这种现象不能直接推断为“Android VPN 授权失败”。只有解析通过并启动 TUN 后，才进入 VPN 授权与连接检查。这个例子用于说明排查顺序，不是本站的线路实测记录。

更多订阅下载问题见 [机场订阅导入失败排查](/guides/subscription-troubleshooting/)。

## 更新前备份，失败后有序回退

更新前在本机保存当前可用配置、应用版本号和节点选择；订阅凭据单独保管。FlClash 有本地备份功能，SFA 可在配置内容中保存 JSON 文件。先确认备份文件实际存在，再更换版本。

更新后异常，先恢复同一份配置并撤回本次新增的覆写，查看 [FlClash 发布说明](https://github.com/chen08209/FlClash/releases) 或 [sing-box 配置迁移说明](https://sing-box.sagernet.org/migration/)。确需回退应用时，只取官方历史发布页的相应 Android 包；Android 可能拒绝覆盖安装较低版本或不同签名的软件。不要把卸载作为第一步，卸载会丢失应用内数据；无法覆盖时先确认配置已导出，再决定如何重新安装。

回退应用后按“配置 → VPN → 实际请求”的顺序重查。旧客户端不一定支持服务商刚更新的配置，回退是否有帮助必须用兼容的配置验证。

## 官方来源与菜单核对

- [FlClash 项目与下载说明](https://github.com/chen08209/FlClash)、[0.9.0 发布记录](https://github.com/chen08209/FlClash/releases/tag/v0.9.0)：内核、安装包与维护状态。
- [FlClash 0.9.0 添加配置页面](https://github.com/chen08209/FlClash/blob/v0.9.0/lib/views/profiles/add.dart)、[中文菜单](https://github.com/chen08209/FlClash/blob/v0.9.0/arb/intl_zh_CN.arb)、[Android 最低版本配置](https://github.com/chen08209/FlClash/blob/v0.9.0/android/gradle/libs.versions.toml)：导入入口、菜单文字与系统要求。
- [SFA 官方 Android 入口](https://sing-box.sagernet.org/clients/android/)、[sing-box 1.14.3 发布记录](https://github.com/SagerNet/sing-box/releases/tag/v1.14.3)：SFA 的 APK、稳定版与来源。
- [SFA 1.14.3 对应源码中的添加菜单](https://github.com/SagerNet/sing-box-for-android/blob/ae93152f21457723af77d144f28c1f7be7362aec/app/src/main/java/io/nekohasekai/sfa/compose/screen/dashboard/ProfilesCard.kt)、[新建配置表单](https://github.com/SagerNet/sing-box-for-android/blob/ae93152f21457723af77d144f28c1f7be7362aec/app/src/main/java/io/nekohasekai/sfa/compose/screen/configuration/NewProfileScreen.kt)、[构建要求](https://github.com/SagerNet/sing-box-for-android/blob/ae93152f21457723af77d144f28c1f7be7362aec/app/build.gradle.kts)：远程/本地导入入口与 Android 版本区分。
- [SFA 的 Android 功能](https://sing-box.sagernet.org/clients/android/features/)、[Android VPN](https://developer.android.com/develop/connectivity/vpn)、[Android 电池优化](https://developer.android.com/training/monitoring-device-state/doze-standby)：TUN、授权与后台行为。

