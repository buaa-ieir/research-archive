---
title: "Towards Next-Generation Healthcare: A Survey of Medical Embodied AI for Perception, Decision-Making, and Action"
date: "2026-06-15"
presenter: "Yiping Li"
presenter_slug: "yiping-li"
language: "en"
cover_image: "/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/cover.png"
paper_title: "Towards Next-Generation Healthcare: A Survey of Medical Embodied AI for Perception, Decision-Making, and Action"
authors:
  - "Cheng Zhang"
  - "Qing Cai"
  - "Xingzheng Wu"
  - "Xun Yang"
  - "Xiaojun Chang"
  - "Bingkun Bao"
  - "Liqiang Nie"
  - "Xinwang Liu"
  - "Yi Yang"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.15647"
doi: ""
tags:
  - "medical robotics"
  - "survey"
  - "perception-decision-action"
  - "datasets"
  - "clinical intelligence"
summary: "This survey organizes medical embodied AI around a closed-loop perception-decision-action pipeline and reviews its methods, applications, datasets, and real-world challenges."
---

## One-sentence summary

This is a broad systems-level survey that organizes medical embodied AI around a perception-decision-action loop and reviews its methods, application domains, datasets, and deployment challenges.

![Medical embodied AI framework](/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/fig1-framework-overview.png)

*Figure 1. The survey frames medical embodied AI as a closed loop in which agents interact with simulated and real clinical environments through perception, decision-making, and action.*

## Problem addressed

Medical AI has made strong progress in image analysis, report generation, and decision support, but most of those systems remain confined to “observe static data and output an answer.” Real clinical work often requires a system to:

- perceive complex and dynamic surgical or ward environments;
- make decisions under workflow, spatial, and safety constraints;
- act through robots or interactive systems that change the physical world.

So the key question of the paper is not about one algorithm, but rather: **how should we understand and organize the rapidly growing area of medical embodied AI from a systems perspective?**

## Main contribution

As a survey, the main contribution is conceptual organization:

- a unified **perception–decision-making–action** framework for medical embodied AI;
- a structured review of representative methods and application scenarios;
- a categorized overview of datasets, including perception, decision-making, action, and simulation/synthetic data;
- a discussion of real-world barriers such as data scarcity, uncertainty, precision control, safety, and regulation.

## A structured view of the field

![Hierarchical overview](/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/fig2-hierarchical-overview.png)

*Figure 2. The survey organizes medical embodied AI into perception, decision-making, action, and integrated application layers.*

The paper argues that medical embodied AI should not be reduced to “medical robots” alone. Instead, it should be viewed as a broader family of systems that sense, reason, and act in clinical environments.

### 1. Medical embodied perception

This part covers instrument/organ recognition, surgical scene modeling, behavior detection, and affective interaction understanding. The challenges are especially severe because medical environments involve occlusion, tissue deformation, illumination shifts, specialized semantics, and strong real-time constraints.

### 2. Medical embodied decision-making

![Medical embodied decision-making](/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/fig3-decision-making-overview.png)

*Figure 3. Decision-making is organized into workflow/task planning, medical navigation, and clinical QA/decision support.*

The authors divide decision-making into three directions:

- **workflow modeling and task planning**;
- **medical navigation**;
- **clinical question answering and decision support**.

A useful point here is that medical decision-making is usually not a standalone classification problem, but a temporally structured reasoning problem with strong domain constraints.

### 3. Medical embodied action

![Medical embodied action](/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/fig4-action-overview.png)

*Figure 4. Action methods are grouped into imitation-based, reinforcement-based, and large-model-driven approaches.*

At the action level, the survey distinguishes:

- **imitation-based action**, where expert demonstrations provide supervision;
- **reinforcement-based action**, where policies are optimized through interaction;
- **large-model-driven action**, where high-level semantic understanding is mapped to executable behavior.

The paper repeatedly emphasizes that clinical usefulness requires not only strong task performance, but also interpretability, reliability, and safety.

## Applications and datasets

![Application examples](/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/fig5-application-examples.png)

*Figure 5. The survey includes application examples such as intelligent caregiving and companion robots.*

The survey also reviews several representative application domains:

- surgical robots;
- intelligent caregiving and companion robots;
- immersive medical education platforms;
- telecollaborative diagnosis and treatment systems.

A particularly useful contribution is the dataset map:

![Dataset map](/reviews/2026-06-15-Medical-Embodied-AI-Survey-EN/fig6-dataset-map.png)

*Figure 6. Datasets are organized by perception, decision-making, action, and simulation/synthetic categories.*

This section is helpful because it connects research tasks to available data resources, which is valuable for project planning.

## Main takeaways

Because this is a survey, it does not offer a single “best model” conclusion. Instead, it argues that:

- medical embodied AI is moving from static perception/decision systems toward **closed-loop interactive systems**;
- the coordination of perception, decision-making, and action is central to practical deployment;
- data, simulation platforms, and safety evaluation remain major bottlenecks;
- foundation models improve semantic understanding, but dependable execution and clinical validation remain open challenges.

## Strengths

- **Clear organizing framework** built around the closed loop;
- **broad coverage** of methods, applications, datasets, and challenges;
- **systems-level perspective** rather than a disconnected list of papers;
- useful for readers from robotics, medical AI, and multimodal AI alike;
- the dataset section is especially practical.

## Weaknesses

- as with any broad survey, not every subfield can be covered in deep technical detail;
- a unified taxonomy may compress meaningful differences across clinical specialties;
- some large-model-driven action directions are still early, so part of the discussion is naturally forward-looking;
- deployment constraints vary greatly across medical settings, so the framework still needs more domain-specific grounding.

## Discussion questions

1. Which medical setting is most likely to see reliable embodied-AI deployment first: surgery, caregiving, or telemedicine?
2. Under strict clinical safety requirements, which paradigm is most realistic: imitation learning, reinforcement learning, or foundation-model-driven control?
3. Are current datasets sufficient for truly closed-loop perception-decision-action research?
4. How should uncertainty be represented and propagated through clinical decision-making and action?
5. Beyond task success, what clinical metrics should matter when evaluating a medical embodied system?

## Relevance to our lab

For an embodiment-intelligence lab, this survey is useful in two ways. First, it shows how embodied AI is being restructured in a high-risk application domain. Second, it reminds us that embodiment is not only about manipulation policies; it also involves perception, workflow reasoning, interaction, and safety. That broader systems view is valuable for any lab trying to move robot learning toward real deployment.

## Possible follow-up ideas

- choose one subtopic such as surgical workflow understanding or medical VLA systems for a deeper paper reading;
- analyze which perception-decision-action modules transfer naturally to non-medical robotics;
- study sim-to-real strategies under data scarcity and safety-critical constraints;
- examine safety and interpretability issues of multimodal foundation models in embodied clinical tasks;
- propose benchmarks that emphasize closed-loop execution rather than only static prediction.

