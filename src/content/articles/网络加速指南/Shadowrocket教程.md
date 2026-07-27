---
title: Shadowrocket教程：App Store核对、订阅导入与分流设置
createTime: 2026/07/27
updateTime: 2026/07/27
permalink: /guides/shadowrocket/
tags:
  - Shadowrocket
  - 小火箭
  - iPhone
  - 机场订阅
description: Shadowrocket小火箭新手教程，说明如何核对App Store正版页面、导入机场订阅、授权VPN、选择节点和分流模式，并排查订阅与连接问题。
---

Shadowrocket 常被称为“小火箭”，主要用于 iPhone、iPad 等 Apple 设备读取代理节点和订阅。它是付费客户端，不包含机场流量。

## 核对正版页面

优先从 [Apple App Store的Shadowrocket页面](https://apps.apple.com/us/app/shadowrocket/id932747118) 核对应用。不同地区商店的可见性可能不同，不建议购买陌生人提供的共享 Apple ID，也不要安装需要额外证书的未知版本。

## 导入订阅

1. 在机场后台复制 Shadowrocket 或通用订阅地址。
2. 打开 Shadowrocket，添加“Subscribe/订阅”类型。
3. 粘贴地址并保存，随后更新订阅。
4. 从节点列表中选择节点。
5. 开启顶部连接开关，并允许系统添加 VPN 配置。
6. 打开网页验证连接，再测试常用应用。

机场若只支持专属客户端，通用订阅可能无法导入。导入前先查看机场后台的客户端说明。

## 配置模式怎么选

新手优先选择规则或配置模式，让国内外流量按规则分流。全局模式会让更多流量经过节点，适合短时间排查，但可能增加流量消耗并影响国内应用。

选择节点时不要只看最低延迟。节点延迟低不代表晚高峰稳定，也不代表一定能访问 ChatGPT 或流媒体。

## 常见故障

- **订阅为空：**检查套餐是否到期、订阅是否重置，以及复制的是否为完整地址。
- **VPN已开启但打不开网页：**切换节点，更新订阅，再检查本机 Wi-Fi 或蜂窝网络。
- **部分App不能用：**先临时切换全局模式判断是否为分流规则问题。
- **流量消耗异常：**检查是否长期启用全局代理、云同步或后台下载。

## 隐私与账号安全

订阅地址不要复制给远程客服以外的人，不要截图公开二维码。Apple ID、机场账号和订阅链接应分别保管；机场客服不需要你的 Apple ID 密码。

延伸阅读：[机场订阅故障排查](/guides/subscription-troubleshooting/)、[流媒体机场测试方法](/posts/streaming-airport-test/)。

