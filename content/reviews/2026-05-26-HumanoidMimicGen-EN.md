---
title: "HumanoidMimicGen: Data Generation for Loco-Manipulation via Whole-Body Planning"
date: "2026-05-26"
presenter: "Yifan Wei"
presenter_slug: "yifan-wei"
language: "en"
cover_image: "/reviews/2026-05-26-HumanoidMimicGen-EN/cover.png"
paper_title: "HumanoidMimicGen: Data Generation for Loco-Manipulation via Whole-Body Planning"
authors:
  - "Kevin Lin"
  - "Ajay Mandlekar"
  - "Caelan Reed Garrett"
  - "Nikita Chernyadev"
  - "Yu Fang"
  - "Runyu Ding"
  - "Yuqi Xie"
  - "Justin Tran"
  - "Linxi Fan"
  - "Yuke Zhu"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2605.27724"
doi: ""
tags:
  - "humanoid robots"
  - "loco-manipulation"
  - "data generation"
  - "whole-body planning"
  - "imitation learning"
summary: "HumanoidMimicGen generates large-scale humanoid loco-manipulation demonstrations from a small number of source demonstrations by combining skill adaptation, locomotion planning, arm planning, and whole-body control."
---

## One-sentence summary

HumanoidMimicGen automatically amplifies a small number of humanoid loco-manipulation demonstrations into large simulation datasets by adapting object-centric skills and interleaving them with whole-body locomotion and manipulation planning.

![HumanoidMimicGen overview](/reviews/2026-05-26-HumanoidMimicGen-EN/fig1-overview.png)

*Figure 1. HumanoidMimicGen uses a small number of teleoperated source demonstrations to generate many humanoid loco-manipulation demonstrations for simulation and real-world co-training.*

## Problem addressed

Humanoid robots promise to operate in human environments because they can walk, reach, and manipulate objects with a human-like body. However, training humanoid manipulation policies is difficult because loco-manipulation combines high-dimensional whole-body control, balance, navigation, arm motion, and object interaction. Collecting large real-world datasets through teleoperation is expensive and slow.

Existing data generation methods work well for fixed-base manipulators, but they do not directly transfer to humanoids because humanoids must coordinate legs, torso, arms, and hands while maintaining stability. The paper addresses the question: how can we automatically generate large, useful humanoid loco-manipulation datasets from only a few source demonstrations?

## Main contribution

The paper contributes HumanoidMimicGen, a data generation method for humanoid legged loco-manipulation.

The main contributions are:

- a method for adapting annotated humanoid skill demonstrations to new object and scene layouts;
- an interleaved planning pipeline combining locomotion planning, arm planning, and adapted manipulation skill execution;
- a hybrid control space where learned leg control and upper-body manipulation planning are combined;
- a new nine-task G1 humanoid loco-manipulation simulation benchmark;
- experiments analyzing data generation strategies, randomization types, policy architectures, and sim-and-real co-training;
- real-world results showing that co-training with generated simulation data improves policy performance over real-only training.

## Methodology

HumanoidMimicGen begins with a small number of annotated source demonstrations. Each demonstration is segmented into object-centric skill segments, and constraints specify skill order, concurrency, and target poses. The method adapts these segments to new initial object and robot states.

![Method overview](/reviews/2026-05-26-HumanoidMimicGen-EN/fig2-method-overview.png)

*Figure 2. The method infers target poses from constraints, performs whole-body planning, executes locomotion and arm plans, and then executes adapted skill segments.*

A key design choice is to separate parts of the problem that require dynamic stability from those that can be handled with static manipulation planning. Locomotion is handled with whole-body control, while arm plans and object-centric skill segments are adapted using privileged simulation state. The resulting generated demonstrations are then used to train visuomotor policies from observations.

## Benchmark and experiments

The paper introduces a G1 loco-manipulation benchmark with nine tasks. These tasks vary in base-motion requirements, object-interaction complexity, bimanual coordination, and horizon length.

![G1 benchmark tasks](/reviews/2026-05-26-HumanoidMimicGen-EN/fig3-benchmark-tasks.png)

*Figure 3. The benchmark includes nine simulated humanoid factory-style loco-manipulation tasks.*

The experiments study the effects of data generation and policy design choices. HumanoidMimicGen generates 1,000 successful trajectories per task from a single source demonstration, and the generated data are used to fine-tune visuomotor policies.

![Ablation results](/reviews/2026-05-26-HumanoidMimicGen-EN/fig4-ablation-results.png)

*Figure 4. Simulation ablations compare policy architectures and data generation choices across the benchmark tasks.*

The real-world evaluation focuses on sim-and-real co-training. Policies trained with both real demonstrations and HumanoidMimicGen-generated simulation data outperform policies trained only on real-world data.

![Real-world deployment](/reviews/2026-05-26-HumanoidMimicGen-EN/fig5-real-world-deployment.png)

*Figure 5. Real-world deployment results show improved average policy score with sim-and-real co-training.*

Additional analysis examines transfer and robustness across task settings.

![Additional analysis](/reviews/2026-05-26-HumanoidMimicGen-EN/fig6-additional-analysis.png)

*Figure 6. Additional benchmark analysis highlights the role of data generation and task variation.*

## Key results

HumanoidMimicGen generates large-scale simulation datasets from limited source demonstrations. On the real-world tasks reported in the paper, co-training with generated simulation data improves average policy score from 0.51 to 0.71, corresponding to a 20 percentage-point gain over real-only training. The paper also uses the benchmark to analyze how policy architecture and data generation decisions affect performance.

## Strengths

- The paper tackles the harder humanoid setting rather than fixed-base manipulation.
- The method recognizes that humanoid loco-manipulation requires whole-body planning, not only end-effector skill replay.
- The benchmark is valuable because it isolates locomotion-manipulation coupling in a reproducible simulation setting.
- The method provides a practical way to amplify scarce teleoperated demonstrations.
- The real-world co-training result is a useful demonstration that generated simulation data can improve physical humanoid policy performance.

## Weaknesses

- The method still requires manual skill annotations and constraints.
- Simulation environments, initial-state distributions, and success conditions are manually designed.
- The approach assumes fixed object-centric skill sequences and may struggle when a task requires new high-level plans.
- Rigid object-frame transformations may not handle large intra-category geometric variation or ambiguous affordances.
- The generated demonstrations rely on privileged simulation state, which may not always translate to real-world perception noise.

## Discussion questions

1. How much manual annotation is acceptable before data generation becomes too labor-intensive?
2. Can foundation models infer skill segments and constraints automatically?
3. How robust are generated policies when real-world humanoid dynamics differ substantially from simulation?
4. Can this method handle tasks with multiple valid high-level strategies rather than fixed skill sequences?
5. How should generated data be weighted relative to real demonstrations during co-training?

## Relevance to our lab

HumanoidMimicGen is relevant to robot learning and teleoperation because it treats human demonstrations as seeds for data amplification. For labs collecting teleoperation data, the paper suggests a useful pattern: collect a small number of high-quality demonstrations, annotate their structure, and use planning plus simulation to generate larger training sets. This connects naturally to questions of demonstration quality, retargeting, and robot-side control stability.

## Possible follow-up ideas

- Use automated video or telemetry analysis to segment source demonstrations.
- Combine DQAF-style quality scoring with HumanoidMimicGen-style data generation.
- Extend the method to tasks with deformable or articulated objects.
- Study whether haptic teleoperation improves the quality of source demonstrations used for data amplification.
- Add uncertainty-aware filtering to reject generated demonstrations with low dynamic feasibility.
