---
title: "Benchmarking VLA Models on SO-101: Failure and Recovery on Low-Cost Hardware"
date: "2026-06-11"
presenter: "Kaixin Hu"
presenter_slug: "kaixin-hu"
language: "en"
cover_image: "/reviews/2026-06-11-SO101-VLA-Benchmark-EN/cover.png"
paper_title: "Benchmarking Vision-Language-Action Models on SO-101: Failure and Recovery Analysis"
authors:
  - "Yi Yu"
  - "Xinchuan Qiu"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.08881"
doi: "10.48550/arXiv.2606.08881"
tags:
  - "VLA"
  - "robot benchmarks"
  - "low-cost robotics"
  - "failure analysis"
  - "recovery"
summary: "The paper compares π0.5, SmolVLA, Wall-X, and ACT on a low-cost SO-101 arm and uses structured failure categories and recovery rates to expose robustness differences hidden by success alone."
---

## One-sentence summary

This benchmark treats low-cost hardware as a VLA stress test and shows that execution instability and recovery after failure reveal deployment differences that binary success rates miss.

![Representative trajectories](/reviews/2026-06-11-SO101-VLA-Benchmark-EN/fig4-trajectories.png)

*Figure 1. Successful and failed multi-object-packing trajectories contrast stable execution with repeated attempts and state mismatch.*

## Problem addressed

Most VLA evaluations use simulation or precise research robots, masking backlash, latency, unstable grasping, calibration error, and trajectory drift. The paper asks how representative policies fail on accessible real hardware, whether they recover after errors, and whether success alone adequately measures embodied robustness.

## Main contribution

- A four-task real-robot benchmark on the open-source SO-101 arm;
- controlled comparison of π0.5, SmolVLA, Wall-X, and ACT;
- a taxonomy of grasp instability, repetition loops, state mismatch, and precision misalignment;
- semantic/execution aggregation plus recovery opportunities and recovery rate;
- 400 teleoperated demonstrations and 320 physical evaluation episodes.

## Benchmark design

Pen Transfer, Selective Color Sorting, Multi-Object Packing, and Precision Pen Placement probe control fidelity, grounding, temporal consistency, and embodiment-noise robustness. Each task has 100 randomized demonstrations; every model-task pair is evaluated for 20 trials.

![Benchmark tasks](/reviews/2026-06-11-SO101-VLA-Benchmark-EN/fig1-benchmark-tasks.png)

*Figure 2. The four execution-centric tasks and their intended capabilities.*

Recovery is evaluated only when an observable execution failure leaves an opportunity to continue, separating error avoidance from self-correction.

## Key results

π0.5 has the highest mean success at 56.25%, followed by Wall-X at 51.25%, ACT at 33.75%, and SmolVLA at 32.5%. Pen Transfer is easy (70–95%), Color Sorting is difficult (0–10%), and Multi-Object Packing is most discriminative: 55% for π0.5, 30% for Wall-X, and 10% for ACT and SmolVLA.

![Success and failure statistics](/reviews/2026-06-11-SO101-VLA-Benchmark-EN/fig2-success-and-failures.png)

*Figure 3. Success rates and failure distributions vary strongly by both task and policy.*

Grasp instability and repetition loops remain near or above 90% among failed trials for every model. π0.5 has the lowest state-mismatch rate at 45.71%, yet still suffers execution failures. Recovery separates architectures further: 30.77% for π0.5, 20.51% for Wall-X, 6.45% for ACT, and 3.23% for SmolVLA.

![Failure and recovery analysis](/reviews/2026-06-11-SO101-VLA-Benchmark-EN/fig3-failure-recovery.png)

*Figure 4. Semantic/execution decomposition and recovery rates reveal robustness differences beneath aggregate success.*

![Trajectory examples](/reviews/2026-06-11-SO101-VLA-Benchmark-EN/fig4-trajectories.png)

*Figure 5. Successful runs preserve grasp and placement order; failures show repeated grasps, unstable placement, and state misinterpretation.*

## Strengths

- Accessible hardware makes physical evaluation more reproducible.
- Moves from outcome metrics toward failure mechanisms and recovery.
- Uses consistent data, tasks, and deployment conditions across models.
- Exposes execution noise underrepresented in simulation benchmarks.

## Weaknesses

- A single SO-101 cannot separate model limitations from platform-specific faults.
- Twenty trials per pair make some zero-count failure categories unstable.
- Dominant-failure annotation involves human judgment.
- Four tabletop tasks exclude bimanual, mobile, deformable, and richer contact settings.
- Policies are task-specifically adapted rather than evaluated zero-shot.

## Discussion questions

1. How should model, controller, and hardware failures be separated?
2. Should recovery be weighted by time, cost, or final task value?
3. Can repetition loops be detected and interrupted online?
4. Will low-cost-platform rankings transfer to precise robots?
5. Should training explicitly optimize failure recognition and recovery?

## Relevance to our lab

IMU-glove, teleoperation, and robotic-hand systems face similar sensing noise, latency, limits, and execution drift. The taxonomy can become practical log labels, while recovery opportunities provide a better way to compare mappings, controllers, and haptic feedback than final success alone.

## Possible follow-up ideas

- Cross-platform benchmarking on low-cost and research-grade robots.
- Automatic loop, slip, and state-mismatch detection.
- Failure-conditioned datasets and dedicated recovery policies.
- Add intervention, energy, and recovery-time metrics.
- Identify hardware dynamics to separate platform and policy contributions.
