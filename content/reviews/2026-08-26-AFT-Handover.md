---
title: "AFT-Handover：面向腿式移动操作机器人的任务导向人机递交"
date: "2026-08-26"
presenter: "魏逸凡"
presenter_slug: "yifan-wei"
language: "zh"
cover_image: "/reviews/2026-08-26-AFT-Handover/cover.png"
paper_title: "Task-Oriented Robot-Human Handovers on Legged Manipulators"
authors:
  - "Andreea Tulbure"
  - "Carmen Scheidemann"
  - "Elias Steiner"
  - "Marco Hutter"
venue: "HRI ’26"
year: 2026
paper_url: "https://doi.org/10.1145/3757279.3785629"
doi: "10.1145/3757279.3785629"
tags:
  - "人机递交"
  - "腿式机器人"
  - "LLM 推理"
  - "affordance transfer"
  - "移动操作"
summary: "AFT-Handover 将 LLM 驱动的任务 affordance 推理与纹理式 3D affordance transfer 结合，使机器人能以支持人类后续使用的姿态进行零样本任务导向递交。"
---
## 一句话总结

AFT-Handover 关注的不是“把东西安全递过去”这一最低要求，而是“以人拿到后能直接使用的方式递过去”：系统用 LLM 推断功能部件对应关系，再用纹理式 affordance transfer 把可抓/不可抓区域迁移到新物体，并在固定机械臂和腿式移动操作机器人上验证。

![AFT-Handover 管线](/reviews/2026-08-26-AFT-Handover/fig1-aft-pipeline.png)

*图 1. 系统将物体分割、LLM 功能部件推理、affordance transfer、抓取生成和抓取选择整合为完整递交流程。*

## 研究问题

人类递交工具时通常会考虑对方接下来要做什么：递勺子给搅拌任务时应该让对方抓到柄部，递锤子给敲击任务时也要保证锤头可用。许多机器人递交方法只关注安全转移或对象级 affordance，难以处理新对象、新任务和跨类别工具。本文的问题是：如何让机器人在零样本条件下根据“对象-任务”组合推断人应该抓哪里、机器人自己应该抓哪里，并在移动腿式平台上执行？

## 主要贡献

- 提出 **AFT-Handover**，将 LLM 常识推理与 3D 纹理式 affordance transfer 结合；
- 用小型对象-任务数据库检索 proxy exemplar，并由 LLM 建立功能部件对应关系；
- 将 affordance 表示为物体表面的连续标量纹理，支持跨类别、几何差异较大的迁移；
- 在多种对象-任务组合上优于 LLM-Handover、OS-TOG 等基线；
- 在 Franka Panda 用户研究和 ANYmal + 机械臂的腿式移动平台上验证真实递交。

## 方法概述

AFT-Handover 包括三个关键步骤。第一，给定目标对象和后续任务，LLM 从数据库中找一个功能相似的 proxy object。第二，LLM 推断部件级对应关系，例如“刀刃对应螺丝刀杆，柄对应柄”。第三，系统通过 point-to-point transfer network 将 proxy object 上的 affordance 纹理迁移到新对象点云，再根据人类抓取区和机器人抓取区选择可执行抓取。

![基准结果](/reviews/2026-08-26-AFT-Handover/fig2-benchmark-results.png)

*图 2. 在常规和非常规对象-任务组合中，AFT-Handover 的任务导向抓取表现优于多个基线。*

## 实验与结果

论文在基准、用户研究和移动平台三个层次评估方法。基准中，使用 GPT-4o 的 AFT-Handover 平均成功率达到 83%，使用 GPT-5 可提升到 86%；若给定 ground-truth affordance，上界可达 95%，说明主要错误来自 LLM 对非常规用途的功能部件推理。

![用户研究](/reviews/2026-08-26-AFT-Handover/fig3-user-study.png)

*图 3. 用户研究比较 AFT-Handover 与 LLM-Handover 在偏好、是否需要重新抓握和任务理解感知上的差异。*

用户研究中，14 名参与者在多个对象-任务组合下比较 AFT-Handover 和 LLM-Handover。结果显示 AFT-Handover 显著减少 regrasp，并获得更高总体偏好。最后，系统在 ANYmal 底盘加 6-DoF 机械臂上完成从抓取、转身、寻找人、手部检测到递交的完整流程。

![腿式机器人执行流程](/reviews/2026-08-26-AFT-Handover/fig4-legged-execution.png)

*图 4. 腿式移动操作机器人从接收任务、抓取物体、寻找人到执行递交的完整过程。*

## 证据质量与学术评价

AFT-Handover 的实验从模块到系统逐层验证。任务条件知识本身带来约 **15–20%** 的机器人抓取成功率提升；完整 AFT-Handover 在测试 object-task pairs 上使用 GPT-4o 时平均成功率约 **83%**，使用 GPT-5 时约 **86%**。当以 ground-truth affordance 替代 LLM 推理误差时，系统上限可达约 **95%**，这一区分非常有价值，因为它说明当前主要剩余误差来自语义推理与部件匹配，而不是 affordance transfer 本身。

人因证据也比较完整：14 名参与者在配对设计下比较 AFT-Handover 与 LLM-Handover。AFT-Handover 显著减少 regrasp（Wilcoxon p=0.027；McNemar p=0.035），在更多 object-task pair 上被偏好（p=0.015），总体有 **71.43%** 参与者选择 AFT-Handover。论文随后在 ANYmal + 6-DoF 机械臂上验证五类真实递交任务。需要谨慎的是，腿式平台实验主要是定性系统验证，且 hand detection 为 single-shot；机器人没有针对人手连续运动进行实时闭环调整。对 unconventional tool use，LLM 仍可能产生功能部件错配，因此“零样本泛化”应理解为对常规功能语义较强、对非典型使用仍脆弱。

## 优点

- 问题设置贴近真实人机协作：递交质量取决于后续任务；
- LLM 负责语义/功能部件推理，几何网络负责 affordance 迁移，职责清晰；
- 相比纯对象级 affordance，更能处理跨类别工具；
- 用户研究和腿式平台演示增强了系统说服力；
- 适合移动服务机器人和现场协作机器人场景。

## 局限

- 非常规任务仍受 LLM 功能推理错误影响；
- 当前递交主要是单次检测和单次姿态计算，未对人手运动进行实时闭环响应；
- 腿式平台上的误差来源包括机械臂轨迹跟踪、运动模糊和可用抓取候选不足；
- 未充分处理物体内部状态，例如装满液体的杯子。

## 讨论问题

1. 任务导向递交是否应显式建模人类偏好和手部运动轨迹？
2. 对非常规工具用法，LLM 推理需要哪些额外上下文？
3. Affordance transfer 是否可以与视觉语言模型的密集 grounding 结合？
4. 在腿式机器人上，实时闭环递交的计算预算如何分配？
5. 递交质量应如何统一评价：regrasp 次数、使用效率还是主观舒适度？

## 与本实验室研究的关系

这篇工作与人机协作、移动操作、任务 affordance 和语言推理结合非常相关。对于关注遥操作或服务机器人系统的实验室，它说明递交任务不能只看抓取稳定性，还要看人拿到对象后是否能直接完成目标动作。

## 可能的后续方向

- 加入人手实时跟踪，实现递交位置和姿态的闭环调整；
- 让系统从用户反馈中学习个人化递交偏好；
- 将 post-handover scene context 纳入 affordance 推理；
- 在更多移动平台和户外场景中测试；
- 与 VLA/多模态基础模型结合，实现更开放的任务理解。
