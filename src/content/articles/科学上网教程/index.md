---
title: 客户端使用教程：Clash、Shadowrocket、订阅导入与故障排查
description: 按 Windows、macOS、iPhone、Android 和路由器选择客户端教程，从订阅导入、连接验证到节点超时、DNS与TUN故障排查。
permalink: /guides/
createTime: 2026/06/24
updateTime: 2026/09/24
tags:
  - 科学上网教程
  - Clash教程
  - 机场教程
  - VPN教程
---

先选择设备，再完成订阅导入和连接验证。如果已经装好客户端，直接进入下方的故障入口。

## 按设备选择客户端

| 设备或需求 | 从哪里开始 | 主要操作 |
|---|---|---|
| Windows、macOS、Linux | [Clash Verge Rev教程](/guides/clash-verge-rev/) | 官方下载、订阅导入、系统代理与TUN |
| iPhone、iPad | [Shadowrocket教程](/guides/shadowrocket/) | 核对应用、导入订阅、授权VPN与分流 |
| Android | [Android客户端教程](/guides/android-proxy-client/) | 客户端选择、配置导入与后台保活 |
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
| 订阅导入失败、更新后为空 | 账号状态、完整地址和配置格式 | [账号与订阅排查](/guides/subscription-troubleshooting/#第一步检查账号) |
| 一个节点或全部节点超时 | 区分单节点故障与全局故障 | [节点故障范围](/guides/subscription-troubleshooting/#第四步区分单节点和全局故障) |
| 浏览器可用，某个应用不能用 | 系统代理、分流规则与代理模式 | [代理模式检查](/guides/subscription-troubleshooting/#第五步检查代理模式) |
| 开启TUN后断网 | 先恢复基础模式，再检查服务和权限 | [Clash Verge Rev教程](/guides/clash-verge-rev/) |
| 域名打不开、部分网站解析异常 | 单独检查DNS，避免同时修改多项配置 | [DNS排查](/guides/subscription-troubleshooting/#第六步单独处理dns) |
| 家中网络失败，手机热点可用 | 本地网络、路由器与软件差异 | [切换网络对照](/guides/subscription-troubleshooting/#第七步更换本地网络) |

提供截图或日志时，请遮住订阅地址、二维码、账号和令牌。保留修改前的配置，便于恢复。

## 连接后如何检查效果

- [ChatGPT访问与节点测试](/posts/chatgpt-airport-guide/)：检查地区、IP和连续使用表现。
- [Netflix与YouTube测试](/posts/streaming-airport-test/)：区分能打开页面和实际播放可用。
- [电信、联通、移动线路测试](/guides/isp-airport-selection/)：对比自己的网络和使用时段。
- [主力与备用方案](/guides/primary-backup-airport/)：准备连接失效时的替代路径。
- [线路类型基础知识](/guides/airport-line-types/)：理解IEPL、IPLC、中转和直连等名称。

## 需要选购或核对机场资料

已有账号的读者可以直接使用上述教程。需要了解服务限制时，再查看[机场资料目录](/airports/)、[机场候选对比](/posts/jichang-tuijian/)和[套餐成本计算器](/tools/airport-plan-cost-calculator/)。

资料的时间与证据范围见[证据中心](/evidence/)；服务变化见[风险记录](/risk-monitor/)和[状态变更记录](/risk-monitor/status-history/)。
