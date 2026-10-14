---
title: 客户端配置指南：按设备和订阅格式选择，排查连接错误
description: 先区分Clash/Mihomo YAML、sing-box JSON与专属客户端，再按Windows、macOS、Android、iPhone和路由器选择教程；从错误提示进入订阅、TUN与DNS排查。
permalink: /guides/
createTime: 2026/06/24
updateTime: 2026/10/14
tags:
  - 科学上网教程
  - Clash教程
  - 机场教程
  - VPN教程
---

先核对服务提供的订阅格式，再选择设备教程。配置导入成功后，还需要检查节点、代理模式和实际应用；已经遇到错误的读者，可以直接进入下方的症状入口。

## 先核对订阅格式

| 服务提供的内容 | 选择路径 | 容易混淆的地方 |
|---|---|---|
| Clash / Mihomo YAML订阅 | 桌面端[Clash Verge Rev](/guides/clash-verge-rev/)，Android端[FlClash](/guides/android-proxy-client/) | 网页登录地址不是订阅；确认当前启用的是刚更新的配置 |
| sing-box JSON配置 | Android端[sing-box for Android](/guides/android-proxy-client/) | 不能直接导入Clash YAML；先确认服务明确提供兼容JSON |
| 其他客户端订阅或节点链接 | 按服务与客户端的官方格式说明选择 | 改文件后缀不能转换配置；分享链接与完整配置不等同 |
| 只提供专属客户端账号 | [专属客户端与通用订阅](/guides/dedicated-client-vs-subscription/) | 账号、登录页和邀请码不能替代通用订阅 |

不确定格式时，向服务方确认“这条地址适用于哪款客户端”。不需要为了尝试另一个客户端，先购买另一份套餐或提交私有订阅给在线转换网站。

## 按设备选择客户端

| 设备或需求 | 从哪里开始 | 主要操作 |
|---|---|---|
| Windows、macOS | [Clash Verge Rev教程](/guides/clash-verge-rev/) | 官方下载、订阅导入、系统代理与TUN |
| iPhone、iPad | [Shadowrocket教程](/guides/shadowrocket/) | 核对应用、导入订阅、授权VPN与分流 |
| Android | [FlClash与sing-box for Android](/guides/android-proxy-client/) | 按配置格式二选一、官方APK、VPN授权与后台连接 |
| Windows / v2rayN | [v2rayN教程](/guides/v2rayn/) | 订阅更新、节点选择与系统代理 |
| 路由器 | [OpenWrt路由器教程](/guides/openwrt-router-proxy/) | 网络拓扑、分流与回退 |
| 不知道选哪种客户端 | [专属客户端与通用订阅](/guides/dedicated-client-vs-subscription/) | 先确认服务支持的客户端和订阅格式 |

客户端本身不提供机场账号或流量。开始前先确认服务是否提供对应格式的订阅；只有专属客户端的服务，不能直接套用通用订阅教程。

## 第一次连接的四步路径

1. **理解基本概念：**阅读[机场、VPN、节点、订阅和客户端的区别](/guides/what-is-proxy-airport/)。
2. **导入订阅：**按上表进入设备教程，确认配置已保存、更新后能看到节点。
3. **验证连接：**选择节点并开启对应代理模式，分别检查网页和需要使用的应用；[流媒体测试方法](/posts/streaming-airport-test/)说明如何进一步观察播放表现。
4. **定位异常：**记录错误提示，按[订阅故障排查](/guides/subscription-troubleshooting/)检查，每次只改变一项设置。

## 按故障症状查找

| 当前症状 | 先检查什么 | 操作入口 |
|---|---|---|
| 更新出现401、403、404，或请求超时 | 账号状态、地址与请求返回 | [订阅请求排查](/guides/subscription-troubleshooting/#第二步检查订阅) |
| 解析失败、不支持的字段、节点列表为空 | 返回内容、配置格式与启用状态 | [格式与客户端检查](/guides/subscription-troubleshooting/#第三步检查格式和客户端) |
| 一个节点或全部节点超时 | 区分单节点故障与全局故障 | [节点故障范围](/guides/subscription-troubleshooting/#第四步区分单节点和全局故障) |
| 浏览器可用，某个应用不能用 | 系统代理、分流规则与代理模式 | [代理模式检查](/guides/subscription-troubleshooting/#第五步检查代理模式) |
| 开启TUN后断网 | 先恢复基础模式，再检查服务和权限 | [Clash Verge Rev教程](/guides/clash-verge-rev/) |
| 日志提示域名解析失败或DNS超时 | 对照客户端日志，恢复最近的单项修改 | [DNS排查](/guides/subscription-troubleshooting/#第六步单独处理dns) |
| 家中网络失败，手机热点可用 | 本地网络、路由器与软件差异 | [切换网络对照](/guides/subscription-troubleshooting/#第七步更换本地网络) |

提供截图或日志时，请遮住订阅地址、二维码、账号和令牌。保留修改前的配置，便于恢复。

## 怎样确认已经配置完成

1. 配置导入或更新成功，当前启用的是目标配置。
2. 所需代理模式或Android VPN服务已启动；配置提供节点或策略组时，确认已选择目标出站。SFA固定出站配置可能没有选择项，应按服务方提供的配置验证。
3. 访问同一个目标时，客户端能观察到对应连接或日志；需要代理的请求走了预期策略。
4. 实际要使用的网页或应用可用。延迟测试结果只能作为一项观察，不能代替实际访问。

只完成第一步时，不要把“订阅已导入”当作“所有应用已经连接成功”。各教程会分别说明检查位置和失败后的下一步。

## 连接后如何检查效果

- [ChatGPT访问与节点测试](/posts/chatgpt-airport-guide/)：检查地区、IP和连续使用表现。
- [Netflix与YouTube测试](/posts/streaming-airport-test/)：区分能打开页面和实际播放可用。
- [电信、联通、移动线路测试](/guides/isp-airport-selection/)：对比自己的网络和使用时段。
- [主力与备用方案](/guides/primary-backup-airport/)：准备连接失效时的替代路径。
- [线路类型基础知识](/guides/airport-line-types/)：理解IEPL、IPLC、中转和直连等名称。

## 需要选购或核对机场资料

已有账号的读者可以直接使用上述教程。需要了解服务限制时，再查看[机场资料目录](/airports/)、[机场候选对比](/posts/jichang-tuijian/)和[套餐成本计算器](/tools/airport-plan-cost-calculator/)。

资料的时间与证据范围见[证据中心](/evidence/)；服务变化见[风险记录](/risk-monitor/)和[状态变更记录](/risk-monitor/status-history/)。
