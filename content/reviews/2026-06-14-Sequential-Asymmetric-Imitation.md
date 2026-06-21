---
title: "SAI：用顺序非对称模仿学习双机器人协作"
date: "2026-06-14"
presenter: "张方远"
presenter_slug: "fangyuan-zhang"
language: "zh"
cover_image: "/reviews/2026-06-14-Sequential-Asymmetric-Imitation/cover.png"
paper_title: "Robots that Collaborate: Sequential Asymmetric Imitation for Learning Coupled Robot Policies"
authors:
  - "Yincong Chen"
  - "Ranpeng Qiu"
  - "Zihao Li"
  - "Yanan Zhou"
  - "Guoqiang Ren"
  - "Weiming Zhi"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.16490"
doi: "10.48550/arXiv.2606.16490"
tags:
  - "模仿学习"
  - "双机器人协作"
  - "课程学习"
  - "移动操作"
  - "稀疏干预"
summary: "SAI 用单操作者、分三阶段的数据收集课程来学习双机器人协作：先让 A 机器人在顺从的人类伙伴帮助下学局部能力，再让 B 机器人对着冻结的 A 学习，最后通过少量闭环干预修正 A，从而在没有显式通信和同步双人示教的情况下诱导出时序同步与让步行为。"
---

## 一句话总结

SAI 通过一个三阶段、单操作者的数据采集课程，把“协作能力”从昂贵的同步双人示教转化为逐步塑造的伙伴分布，让双机器人在没有显式通信的情况下学会同步、等待和让步。

![问题动机](/reviews/2026-06-14-Sequential-Asymmetric-Imitation/fig1-motivation.png)

*图 1. 仅有局部操作能力并不足以支撑双机器人协作，真正难点在于相位同步、等待与让步。*

## 研究问题

双机器人操作的失败，很多时候不是因为单个机器人不会抓、不会拉、不会移动，而是因为两者节奏不一致：一个先拉了，另一个还没准备好；一个不让步，另一个就被拖拽失稳。传统方法往往需要同步双操作者示教、显式通信机制，或基于精确模型的集中控制，这些都提升了系统成本。本文追问：能否只用单操作者、异步示教和少量闭环干预，学出具有耦合协作行为的双机器人策略？

## 主要贡献

- 提出 Sequential Asymmetric Imitation（SAI）三阶段课程；
- 不需要同步双操作者示教，也不需要显式 inter-robot communication；
- 通过“伙伴分布”逐渐从顺从人类、到冻结的已学机器人、再到闭环协作执行，诱导出真正的协作行为；
- 在刚性与柔性物体任务上进行真实双机器人验证；
- 通过 yielding、phase synchronization 等过程指标，而不只看最终成功率，衡量协作质量。

## 方法概述

SAI 的三阶段非常直观：

1. **Stage 1: Bootstrapping Robot A**：由人类顺从地协助，采集 Robot A 的单边示教，使其掌握基本局部操作能力；
2. **Stage 2: Asymmetric Co-teaching**：冻结 Robot A 策略，由单操作者遥操作 Robot B，让 B 在“未来的真实伙伴分布”下学习；
3. **Stage 3: Closed-loop Intervention**：让 A 和 B 一起闭环执行，仅在协作即将失败时对 Robot A 做少量干预，从而学会等待、让步、减速和恢复。

![系统概览](/reviews/2026-06-14-Sequential-Asymmetric-Imitation/fig2-system-overview.png)

*图 2. SAI 的核心不是换一个大网络，而是重新组织示教收集与伙伴暴露顺序。*

我很喜欢这篇工作的地方在于：它把“协作”理解成训练分布塑形问题，而不是先验认为要用复杂的中央控制器或显式消息传递来解决。

## 实验与主要结果

作者在四类真实双机器人任务上评估 SAI，包括 Bed-throw Spreading、Tablecloth Spreading、Laundry Collection 和 Painting Transport。

![真实任务套件](/reviews/2026-06-14-Sequential-Asymmetric-Imitation/fig3-real-task-suite.png)

*图 3. 任务既包含柔性物体铺展，也包含共享工作空间与刚性物体搬运。*

实验表明，SAI 在成功率、相位同步和 Yield/Wait 指标上均优于 independent imitation 及课程消融基线。论文还展示了一个非常关键的行为特性：当 Robot B 被人为暂停时，baseline 往往继续按名义轨迹执行，导致张力升高、抓取失败；而 SAI 会减速、等待，并在伙伴恢复后继续协作。

![让步行为与执行消融](/reviews/2026-06-14-Sequential-Asymmetric-Imitation/fig4-yielding-and-ablations.png)

*图 4. 上部展示 SAI 的 partner-contingent yielding；下部说明 history token 与 cascaded head 可进一步减少早放手与过早下放。*

此外，SAI 不依赖某个特定动作骨干。论文报告在 ACT 与 Diffusion 两种 imitation backbones 上，SAI 都明显优于独立学习：例如某接触密集任务中，ACT 成功率由 33.3% 提升到 56.7%，Diffusion 由 23.5% 提升到 52.9%。这说明 SAI 更像是一个“数据课程贡献”，而不是只对单一网络有效的技巧。

## 优点

- 从数据采集与课程设计层面解决协作学习，思路新颖且实用；
- 不需要同步双人遥操作与显式通信，降低真实系统门槛；
- 真实任务验证充分，且指标关注协作过程质量；
- 对不同 imitation backbones 都有效。

## 局限

- 仍需要阶段 3 的人工稀疏干预，完全自动化程度有限；
- 目前验证在两机器人、特定平台和四类任务上，通用性仍待扩展；
- 没有显式建模伙伴意图，复杂多智能体协作下可能仍不足；
- 主要解决物理耦合协作，尚未涉及语言协作或更高层任务分工。

## 讨论问题

1. SAI 的三阶段是否可以自动决定何时切换，而不靠人工预设？
2. 如果伙伴机器人能力很弱或不稳定，Robot B 是否仍能学到正确的适应策略？
3. 稀疏干预能否由自动失败检测或安全控制器替代？
4. 在三机器人或更多协作主体下，伙伴分布塑形是否仍然有效？
5. 是否可以把显式通信作为附加信息，与 SAI 的课程优势互补？

## 与本实验室研究的关系

这篇论文与实验室关注的遥操作、机器人协作和策略学习非常契合。它给出的重要启发是：协作并不一定要靠更复杂的网络结构，也可以通过示教组织方式来诱导。对于手套—机械手、人—机器人协作或双臂协作任务，如何设计数据采集流程和人机接管机制，可能比单纯增加模型容量更关键。

## 可能的后续方向

- 把 stage switching 设计成基于性能或失败率的自适应课程；
- 将 SAI 扩展到多机器人和异构机器人协作；
- 联合显式通信、接触估计与伙伴意图推断；
- 用自动干预检测器替代人工 sparse interventions；
- 与更大规模的离线协作数据或 VLA 骨干结合。
