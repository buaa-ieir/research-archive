---
title: "Ambient Diffusion Policy：从次优机器人数据中进行模仿学习"
date: "2026-06-10"
presenter: "魏民"
presenter_slug: "wei-min"
language: "zh"
cover_image: "/reviews/2026-06-10-Ambient-Diffusion-Policy/cover.png"
paper_title: "Ambient Diffusion Policy: Imitation Learning from Suboptimal Data in Robotics"
authors:
  - "Adam Wei"
  - "Nicholas Pfaff"
  - "Thomas Cohn"
  - "Arif Kerem Dayı"
  - "Constantinos Daskalakis"
  - "Giannis Daras"
  - "Russ Tedrake"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.12365"
doi: "10.48550/arXiv.2606.12365"
tags:
  - "模仿学习"
  - "扩散策略"
  - "次优数据"
  - "协同训练"
  - "Open X-Embodiment"
summary: "Ambient Diffusion Policy 将“何时使用次优数据”显式写入扩散时间轴，只在高噪声与低噪声区间利用次优样本，从而在不丢弃数据的前提下学习其有用部分，并在多种分布偏移与 OXE 扩展实验中显著优于传统 co-training。"
---

## 一句话总结

Ambient Diffusion Policy 的核心思想是：不要简单地“全用”或“全丢”次优数据，而是根据扩散时间决定什么时候让次优样本参与训练，以便在高噪声阶段学习其全局规划信息，在低噪声阶段学习局部原语，同时避免把有害偏差完整带进策略中。

![训练算法](/reviews/2026-06-10-Ambient-Diffusion-Policy/fig1-algorithm.png)

*图 1. 高质量数据可在所有扩散时间使用，而次优数据只在低噪声区间与高噪声区间参与训练。*

## 研究问题

现实机器人数据具有天然异质性：高质量目标任务数据昂贵、稀缺，而低质量、跨任务、跨具身、仿真或带噪声的数据却大量存在。最常见的做法要么过滤掉低质量数据，要么采用简单的 dataset re-weighting 做 co-training。但如果策略真的在学习一个混合分布，次优数据中的错误动作模式、动力学偏差或任务偏差就仍会被写入模型。作者的问题是：能否只从这些次优样本中“提取有用部分”，而不是被迫整体接受其分布偏移？

## 主要贡献

- 提出 Ambient Diffusion Policy，把“是否使用次优数据”变成扩散时间轴上的设计变量；
- 观察并验证机器人动作数据具有 spectral power law，由此引出全局到局部的扩散层级结构；
- 从理论上说明噪声能抹平分布差异，并给出 locality 与收缩性质的分析；
- 在 noisy trajectories、sim-to-real、task mismatch 和 OXE 扩展实验中显著优于 co-training 与 data filtering；
- 工程实现非常简单，本质上只是改了 Diffusion Policy 的数据采样器。

## 方法概述

Ambient 继承自 Ambient Diffusion Omni。设高质量目标数据为 \(D_p\)，次优数据为 \(D_q\)。Ambient 不会让 \(D_q\) 在全部扩散时间参与训练，而只允许其在 \([0, t_{max})\cup(t_{min}, T]\) 内贡献梯度：在高噪声处，次优样本的低层错误细节被噪声掩盖，策略可以学习较粗粒度的任务结构；在低噪声处，则可利用 locality 学到某些共享局部动作原语。

![谱层级结构](/reviews/2026-06-10-Ambient-Diffusion-Policy/fig2-spectral-hierarchy.png)

*图 2. 论文把扩散过程解释为从全局规划逐步细化到局部动作原语，并用机器人动作的频谱统计支持这一观点。*

这种设计的美妙之处在于，它并不需要先验知道“数据哪里坏”，而是借助噪声层次将“可迁移的全局信息”和“不该继承的局部偏差”尽可能分离。

## 实验与主要结果

作者首先在受控实验中验证基本直觉，例如二维迷宫和 7-DoF motion planning，发现 Ambient 在“成功率—平滑度”之间取得更优权衡。

![Pareto 前沿](/reviews/2026-06-10-Ambient-Diffusion-Policy/fig3-pareto-frontier.png)

*图 3. 在受控实验中，Ambient 的平滑度—成功率 Pareto 前沿整体优于 co-training。*

在 task mismatch 的 block sorting 实验中，论文进一步利用 locality 机制说明：策略可以从错误任务中学习有用的 motion primitive，同时避免学到错误的 task logic。

![局部性与任务错配](/reviews/2026-06-10-Ambient-Diffusion-Policy/fig4-locality-task-mismatch.png)

*图 4. 通过选择适当的 \(t_{max}\)，Ambient 可以保留“抓取—放置”这类局部能力，而不过度吸收错误任务逻辑。*

最重要的是扩展实验。作者把方法扩展到 Open X-Embodiment 这类包含严重质量混杂与分布偏移的大规模数据源，在 table cleaning 和 tower building 等真实任务上，相比 co-training 最多提升约 33%。

![OXE 扩展结果](/reviews/2026-06-10-Ambient-Diffusion-Policy/fig5-oxe-scaling.png)

*图 5. 当引入 OXE 规模的异质次优数据时，Ambient 比 data filtering 和 co-training 更稳定，也更能持续从额外数据中获益。*

我认为这篇论文的价值非常高，因为它不是单纯追求“更多数据”，而是给出一个相当清晰的机制去决定“什么样的数据在扩散过程的什么阶段有用”。

## 优点

- 把次优数据利用问题转化为扩散时间选择问题，概念非常清晰；
- 有理论、有受控实验，也有大规模真实数据验证；
- 只需修改采样策略，方法极其易于落地；
- 相比简单加权，对数据配比与重加权更不敏感。

## 局限

- 依赖扩散策略框架，未必能直接迁移到非扩散式 IL；
- 需要为不同数据源估计或标注 \(t_{min}\)、\(t_{max}\)，实际工程中仍有代价；
- 论文的解释较强依赖 spectral power law 假设，其适用边界仍需更多验证；
- 当次优数据的“错误”并非局部动作，而是高层目标完全错误时，收益可能受限。

## 讨论问题

1. 能否把 \(t_{min}\)、\(t_{max}\) 的估计自动化并在线更新？
2. 如果次优数据来自完全不同的动作空间或具身，Ambient 还是否有效？
3. 对 VLA 或动作世界模型，是否也存在类似的“噪声阶段分工”？
4. 在多模态观测偏移而非动作偏移主导时，这一方法如何修改？
5. 是否可以将该思想与主动数据筛选或不确定性估计结合？

## 与本实验室研究的关系

实验室在机器人模仿学习、跨平台数据利用以及高成本示教采集上都可能遇到“目标数据少、旁路数据多”的问题。Ambient 提供了一个非常启发性的角度：不是简单决定“要不要用”次优数据，而是决定“在哪个训练阶段用什么”。这对遥操作、仿真到真实迁移、跨设备示教复用都很有参考价值。

## 可能的后续方向

- 将 Ambient 思想推广到 flow matching 或自回归动作模型；
- 学习连续的 diffusion-time weighting，而非硬阈值区间；
- 联合考虑观测噪声与动作次优性；
- 在跨具身数据混合时引入动作语义层级；
- 与数据质量估计器联合训练，做自动的阶段性数据利用。
