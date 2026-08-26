---
title: "连接语言与行动：语言条件机器人操作综述"
date: "2026-08-26"
presenter: "胡开鑫"
presenter_slug: "kaixin-hu"
language: "zh"
cover_image: "/reviews/2026-08-26-Bridging-Language-and-Action/cover.png"
paper_title: "Bridging Language and Action: A Survey of Language-Conditioned Robot Manipulation"
authors:
  - "Xiangtong Yao"
  - "Hongkuan Zhou"
  - "Oier Mees"
  - "Yuan Meng"
  - "Ted Xiao"
  - "Yonatan Bisk"
  - "Jean Oh"
  - "Edward Johns"
  - "Mohit Shridhar"
  - "Dhruv Shah"
  - "Jesse Thomason"
  - "Kai Huang"
  - "Joyce Chai"
  - "Zhenshan Bing"
  - "Alois Knoll"
venue: "The International Journal of Robotics Research (accepted)"
year: 2026
paper_url: "https://arxiv.org/abs/2312.10807"
doi: ""
tags:
  - "语言条件机器人操作"
  - "VLA"
  - "大语言模型"
  - "机器人操作"
  - "综述"
summary: "该综述以“语言在控制闭环中的功能角色”为核心，系统梳理语言用于状态评估、策略条件、认知规划推理以及统一 VLA 四条路线，并从动作粒度、数据监督、成本时延、评测环境和任务指定等维度比较现有方法。"
---

## 一句话总结

这篇 70 页综述不是按“用了什么模型”分类，而是按“语言在机器人控制闭环里究竟起什么作用”分类，从而把奖励/状态评估、语言条件策略、LLM 规划推理和端到端 VLA 放到统一框架里比较。

![语言条件操作系统框架](/reviews/2026-08-26-Bridging-Language-and-Action/fig1-system-framework.png)

*图 1. 语言、感知和控制三模块构成系统骨架，语言可以在不同位置进入闭环。*

## 综述要解决的问题

语言条件机器人操作的文献横跨 NLP、计算机视觉、模仿学习、强化学习、规划和 foundation models。若只按模型类型分类，很难回答一个更关键的问题：**语言到底如何改变机器人从观测到动作的决策过程？** 作者因此把 taxonomy 的轴从“模型”改成“功能角色”。

## 四类核心范式

论文把现有方法划分为四类：

1. **Language for state evaluation**：语言定义目标、奖励、价值或代价，间接指导规划与学习；
2. **Language as a policy condition**：策略直接学习 \(\pi(a|s,l)\)，语言成为行为条件；
3. **Language for cognitive planning and reasoning**：LLM/VLM 负责任务分解、因果推理、约束理解和高层计划；
4. **Language in unified VLA models**：语言、视觉和动作进入统一端到端模型。

![代表方法全景](/reviews/2026-08-26-Bridging-Language-and-Action/fig2-method-landscape.png)

*图 2. 综述按照上述四类角色组织大量代表性语言条件机器人操作方法。*

这个分类的价值在于，同一个 LLM 可以被用作 reward designer、planner，也可以成为 VLA backbone；真正决定系统性质的不是模型名称，而是它在控制回路中的位置和职责。

## 语言作为策略条件

![语言条件策略分类](/reviews/2026-08-26-Bridging-Language-and-Action/fig3-policy-condition-taxonomy.png)

*图 3. 策略条件路线包含语言条件 RL、behavior cloning 和 diffusion policy，并分别面向奖励工程、次优模仿和多模态动作分布等问题。*

论文比较了 RL、BC 和 diffusion-based policy learning。语言条件 RL 可以把高层目标写入奖励结构，但数据效率和 reward design 是明显瓶颈；BC 依赖示教、训练稳定，但会继承示教偏差；diffusion policy 更适合表示多峰动作分布，却带来推理延迟。

## 认知规划与统一 VLA

![认知规划分类](/reviews/2026-08-26-Bridging-Language-and-Action/fig4-cognitive-planning-taxonomy.png)

*图 4. 语言在认知规划中可以承担 task decomposition、affordance reasoning、code generation、world-model reasoning 等角色。*

![LLM/VLM 驱动方法](/reviews/2026-08-26-Bridging-Language-and-Action/fig5-llm-approaches.png)

*图 5. foundation models 可以作为规划器、代码生成器、语义推理器或与传统控制器组合。*

作者特别讨论了几个当前争论：单纯扩大 VLA 模型是否是最优路线；world model 是否应成为核心；以及模块化/神经符号混合系统是否在真实机器人中更可靠。论文的态度并不是否定 scaling，而是指出机器人数据有限、物理错误代价高，结构先验和任务结构的扩展可能比纯参数规模更关键。

## 横向比较维度

除了 taxonomy，综述还从五个正交维度比较方法：

- 动作粒度；
- 数据与监督方式；
- 系统成本与实时延迟；
- 环境和 benchmark；
- 任务指定方式。

这使得文章不仅适合作为“文献索引”，也适合用于选择技术路线。

## 未来方向

作者把未来挑战重点放在 **generalization** 和 **safety**。前者包括更大且更多样的数据、lifelong learning、cross-embodiment alignment 和真正有效的 zero-shot；后者包括语言歧义、实时性能、失败恢复、安全约束和物理世界中的可验证性。一个很重要的观点是：语言适合表达“做什么”和逻辑约束，而图像/视频更适合表达“具体怎么做”的几何和运动细节，因此多模态任务指定可能比单一语言接口更稳健。

## 学术综述方法与批判性评价

这篇文章的核心价值不在提出新模型，而在于提供一个**按语言在控制闭环中的功能角色组织文献**的分类框架。作者将方法分为四类：语言用于状态评价、语言作为策略条件、语言用于认知规划与推理、以及统一 VLA；再从动作粒度、数据/监督、系统成本与时延、环境与评测、任务表示五个正交维度进行横向比较。这个组织方式比单纯按“LLM/VLM/VLA 模型类别”分类更接近机器人系统设计，因为它直接回答语言在哪个环节改变了 perception–planning–control 的信息流。

作为学术综述，其优点是覆盖跨度大，并且不回避当前社区的争论：是否应继续纯粹扩大 VLA、world model 是否是更好的中间层、以及结构化/混合系统是否更适合有限机器人数据。作者对 generalization 的判断也较克制：zero-shot 能力在语义理解和高层规划上最强，在 policy transfer 上更脆弱，而在接触丰富、长程、动态和跨具身真实执行中仍明显受限。安全部分把语言歧义、failure recovery 与实时性明确列为三类风险。需要注意的是，论文是**叙述性/分类型综述，而非带 PRISMA 式检索、纳入排除标准和统计 meta-analysis 的系统综述**；因此它适合建立研究地图与问题框架，但不应把文献覆盖或趋势判断理解为穷尽性的统计证据。

## 优点

- taxonomy 的切入点非常清楚，避免按模型名堆文献；
- 覆盖传统 RL/IL/规划到最新 VLA，历史跨度完整；
- 对工程成本、延迟和真实部署有专门讨论；
- 对 scaling、world models 和 hybrid systems 的争论有较平衡分析；
- 非常适合作为语言机器人操作方向的入口文献。

## 局限

- 领域更新极快，VLA 排名和模型细节很容易随新工作变化；
- 不同任务和 benchmark 的成功率不可直接横向比较；
- 分类边界并非完全互斥，很多现代系统横跨两到三类角色；
- 综述聚焦 manipulation，对导航、移动操作和 HRI 的覆盖相对次要。

## 讨论问题

1. 对真实机器人而言，VLA scaling 的瓶颈究竟是模型规模还是高质量动作数据？
2. world model 应该进入 VLA 内部，还是作为外部 rollout/evaluator？
3. 语言是否适合作为精细动作的主要条件，还是只应负责高层语义？
4. cross-embodiment alignment 最合理的共享空间是什么？
5. 如何系统评估语言歧义导致的物理安全风险？

## 与本实验室研究的关系

该综述与实验室的 VLA、模仿学习、跨具身和 teleoperation 数据研究直接相关。尤其值得借鉴的是它把“语言—感知—控制”接口拆开分析的方法：在设计自己的系统时，可以明确判断语言是在做任务指定、规划、状态评价还是直接生成动作，而不是笼统称为“使用 VLM/VLA”。

## 可能的后续方向

- 用本文 taxonomy 对实验室正在跟踪的 VLA 系统重新分类；
- 针对 action granularity 和 latency 做独立技术比较；
- 聚焦 cross-embodiment alignment 做专题综述；
- 对 language + demonstration 的混合任务指定方式做实验；
- 建立包含失败恢复与安全约束的本地评测集。
