---
title: "支持规模化远程驾驶的 5G 网络架构与配置选择"
date: "2026-06-16"
presenter: "魏逸凡"
presenter_slug: "yifan-wei"
language: "zh"
cover_image: "/reviews/2026-06-16-5G-Teleoperated-Driving/cover.png"
paper_title: "5G Network Architecture and Configuration Choices to Support Teleoperated Driving at Scale"
authors:
  - "M.C. Lucas-Estañ"
  - "B. Coll-Perales"
  - "M. I. Khan"
  - "J. Gozalvez"
  - "S. S. Avedisov"
  - "O. Altintas"
  - "M. Sepulcre"
venue: "IEEE VTC2024-Fall / arXiv postprint"
year: 2024
paper_url: "https://arxiv.org/abs/2606.17654"
doi: "10.1109/VTC2024-Fall63153.2024.10758026"
tags:
  - "远程驾驶"
  - "5G"
  - "MEC"
  - "V2X"
  - "网络时延"
summary: "该研究定量分析不同 5G 架构、双工模式和 TDD 配置对规模化远程驾驶的影响，指出 MEC/边缘架构比集中式网络更适合满足多车视频上行与低时延控制需求。"
---
## 一句话总结

这篇论文从通信系统角度研究远程驾驶的规模化部署：要同时远程控制多辆车，仅有“5G”这个标签不够，网络必须采用更靠近车辆的 MEC/边缘架构，并合理配置上行资源、TDD 帧结构和控制信道。

![5G 网络架构](/reviews/2026-06-16-5G-Teleoperated-Driving/fig1-network-architectures.png)

*图 1. 论文比较集中式 ToD 控制中心与不同 MEC 部署位置下的 5G 网络架构。*

## 研究问题

Teleoperated Driving（ToD）要求车辆把多路视频和感知数据上传到控制中心，远程驾驶员再把控制命令下发给车辆。这个过程同时需要高上行带宽、低下行时延和高可靠性。已有 pilot 通常只验证单车或少量车辆，难以回答规模化问题：**常见 5G 部署能否同时支持多个 ToD 车辆？如果不能，哪些网络架构和配置是关键瓶颈？**

本文聚焦最严格的 remote control use case，并根据 5GAA 需求分析 10 veh/km² 的目标密度。

## 方法概述

作者建立了 5G 通信时延模型，分解了无线接入网、传输网、核心网以及应用服务器连接带来的时延。论文比较两大类架构：

- **Centralized**：ToD 应用服务器远离车辆，通过互联网连接；
- **MEC-based**：ToD 控制服务部署在边缘侧，例如 MEC@gNB、MEC@M1 或 MEC@CN。

同时，作者分析了频宽、FDD/TDD、TDD 帧结构、上/下行 slot 分配，以及控制信道配置对容量和时延的影响。

![视频模型与配置参数](/reviews/2026-06-16-5G-Teleoperated-Driving/fig2-video-model.png)

*图 2. 论文用 CARLA/KITTI 视频帧大小分布校准 H.264 视频流模型，并列出 5G RAN 配置参数。*

## 关键结果

![上行架构结果](/reviews/2026-06-16-5G-Teleoperated-Driving/fig3-ul-architecture-results.png)

*图 3. MEC 架构在满足 ToD 上行时延要求方面明显优于集中式网络，尤其在视频处理延迟较大和车辆密度较高时更明显。*

远程驾驶最重的流量在上行，因为多路视频必须从车辆传到控制中心。论文指出，集中式架构会受到互联网连接到 ToD 控制中心的额外时延影响；MEC-based 架构则能显著降低这部分时延，从而支持更高车辆密度和更大视频处理延迟。

![带宽需求表](/reviews/2026-06-16-5G-Teleoperated-Driving/fig4-bandwidth-table.png)

*图 4. 不同视频处理延迟、车辆密度和网络架构下满足 ToD 上行需求所需的带宽。*

下行控制命令带宽很小，但可靠性和时延更严格。论文报告，在集中式网络中，DL 通信时延的高分位数可能持续超过要求；而 MEC 架构能更稳定地满足下行时延需求。

![双工和控制信道配置](/reviews/2026-06-16-5G-Teleoperated-Driving/fig5-duplexing-results.png)

*图 5. TDD 帧结构和控制信道配置会显著影响上行通信时延，FDD 或更均衡的 TDD 配置可降低等待上行资源的时间。*

一个重要结论是：常见非对称 TDD 配置倾向于服务下行移动宽带，而 ToD 的瓶颈恰好在上行视频。因此，把更多资源给上行，或者采用 FDD/更均衡的 TDD3，可以显著降低上行时延和带宽需求。控制信道配置也会影响车辆等待上行控制消息的时间。

## 优点

- 将 teleoperation 从机器人接口问题扩展到网络基础设施问题；
- 明确区分视频上行和控制下行的需求差异；
- 定量分析架构、频宽、TDD/FDD 和控制信道配置；
- 结论具有工程可操作性：MEC 部署和上行友好配置是关键；
- 对规模化 ToD 服务很有现实意义。

## 局限

- 论文主要基于模型与仿真，真实大规模道路部署仍需验证；
- 视频编码、渲染和感知管线的处理时延可能随实现差异很大；
- 研究重点是通信层，对远程驾驶员认知负担、控制稳定性和车辆动力学考虑较少；
- 单小区或特定 highway 场景假设可能不足以覆盖城市复杂网络；
- 没有深入讨论多运营商、切片、网络拥塞和安全攻击等部署问题。

## 讨论问题

1. 遥操作机器人系统是否也应该像 ToD 一样把网络架构纳入系统设计？
2. 视频上行瓶颈能否通过语义压缩、事件相机或 VLA 侧感知摘要缓解？
3. MEC 部署位置与远程操作者位置之间应如何折中？
4. 若控制信号需要超高可靠性，是否应该与视频流分离调度？
5. 对手术、工业远程操作等场景，是否存在类似的网络配置结论？

## 与本实验室研究的关系

实验室的遥操作项目如果从局域网走向远程部署，就会遇到类似问题：视频/传感器上行、控制下行、触觉反馈和动作命令的时延需求并不相同。本文提醒我们，teleoperation 不只是控制算法和交互设备，也依赖网络架构和资源调度。对触觉遥操作而言，这一点会更加关键。

## 可能的后续方向

- 建立机器人遥操作中的通信需求模型，区分视觉、触觉、状态和控制流；
- 测试边缘计算对手套-机械手遥操作延迟的影响；
- 研究语义压缩或关键帧传输是否能降低上行视频需求；
- 将网络时延模型与 shared autonomy 控制器联动；
- 设计面向远程机器人操作的 5G/edge benchmark。
