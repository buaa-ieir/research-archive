---
title: "A Bilateral Teleoperation Framework for Dexterous Manipulation"
date: "2026-06-13"
presenter: "Yifan Wei"
presenter_slug: "yifan-wei"
language: "en"
cover_image: "/reviews/2026-06-13-Bilateral-Dexterous-Teleoperation-EN/cover.png"
paper_title: "A Bilateral Teleoperation Framework for Dexterous Manipulation"
authors:
  - "Stefano Dalla Gasperina"
  - "Dong Ho Kang"
  - "Haiyun Zhang"
  - "Aldo Galvan"
  - "Job D. Ramirez"
  - "Aaron Kim"
  - "Mark Helwig"
  - "Kazuto Yokoyama"
  - "Takahisa Ueno"
  - "Tetsuya Narita"
  - "Ann Majewicz-Fey"
  - "Ashish D. Deshpande"
  - "Luis Sentis"
venue: "IEEE RA-P submitted / arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.15434"
doi: ""
tags:
  - "teleoperation"
  - "dexterous manipulation"
  - "haptic feedback"
  - "motion retargeting"
  - "shared control"
summary: "The paper presents a modular bilateral teleoperation framework that integrates a hand exoskeleton, grounded haptic interface, dexterous hand, and compliant arm for contact-rich dexterous manipulation and demonstration collection."
---
## One-sentence summary

This paper presents a modular bilateral dexterous teleoperation platform that connects a hand exoskeleton and grounded haptic interface on the operator side with a three-finger robotic hand and compliant arm on the robot side.

![Framework overview](/reviews/2026-06-13-Bilateral-Dexterous-Teleoperation-EN/fig1-framework.png)

*Figure 1. The framework integrates operator-side interfaces, robot-side hardware, motion retargeting, shared control, haptic feedback, and logging.*

## Problem addressed

Dexterous teleoperation is not simply about making a robot copy human motion. In real contact-rich tasks, the system must maintain stable hand retargeting, intuitive arm control, timely haptic feedback, interchangeable hardware interfaces, and safety constraints under latency and human variability. Many prior systems emphasize visual immersion or coarse motion retargeting, but provide less integrated treatment of arm-hand coordination, bilateral feedback, and real-world contact.

The paper therefore focuses on a practical platform that can both support dexterous manipulation and serve as infrastructure for collecting high-quality demonstrations for learning from demonstration.

## Main contribution

- A modular bilateral teleoperation framework for dexterous manipulation;
- integration of the Maestro hand exoskeleton, Lambda.7 grounded haptic interface, Plato robotic hand, and Optimo arm in a ROS 2 stack;
- support for position-based hand retargeting, differential arm control, multi-scale haptic feedback, and shared control;
- real-world demonstration on a Jenga-style manipulation task;
- design insights on cross-embodiment mismatch, haptic granularity, and shared control.

## Methodology

![Control and demonstrations](/reviews/2026-06-13-Bilateral-Dexterous-Teleoperation-EN/fig2-control-demonstrations.png)

*Figure 2. The left panel shows hand-level retargeting and grasp examples; the right panel shows arm-level control, workspace constraints, and shared control.*

The framework separates hand and arm control while coordinating them in a unified architecture. On the hand side, the Maestro exoskeleton estimates human joint states and maps them into the Plato robotic hand. Because the human hand and robot hand differ in degrees of freedom, size, coupling, and contact geometry, the system does not treat exact joint matching as the only objective. Instead, it emphasizes feasible robot configurations that preserve task-relevant contact behavior.

On the arm side, the Lambda.7 interface provides pose commands and force feedback. The robot executes task-space retargeted motions subject to workspace limits and shared-control constraints. Shared control helps stabilize grasp execution, enforce force and workspace limits, and reduce sensitivity to operator errors, latency, or tracking noise.

![Hardware components](/reviews/2026-06-13-Bilateral-Dexterous-Teleoperation-EN/fig3-hardware-components.png)

*Figure 3. The system uses the Maestro hand exoskeleton, Lambda.7 haptic interface, Plato robotic hand, and Optimo robotic arm.*

![Control diagram](/reviews/2026-06-13-Bilateral-Dexterous-Teleoperation-EN/fig4-control-diagram.png)

*Figure 4. The complete control diagram shows signal flow, update rates, impedance control, grasp detection, and haptic feedback channels.*

## Experiments and results

The real-world validation uses a Jenga-style task. The operator probes a tower, grasps a selected block, extracts it, and places it on top. This requires coordinated arm motion, hand closure, contact modulation, and force feedback. The paper reports successful execution of multiple grasp types, including pinch and lateral grasps, and repeated successful extraction and placement without toppling the tower.

The point of the evaluation is not to establish a large benchmark score, but to show that the integrated hardware/software system can function under real contact, real hardware latency, and human-in-the-loop control. That is important because many learning papers assume demonstrations exist, while fewer papers address how those demonstrations can be collected reliably with a complex dexterous platform.

## Strengths

- Complete systems integration across input devices, robot hardware, control, haptics, and logging;
- strong emphasis on bilateral feedback rather than one-way motion capture;
- realistic treatment of human-robot morphology mismatch;
- shared control is framed as error mitigation rather than full autonomy;
- useful foundation for collecting dexterous manipulation demonstrations.

## Weaknesses

- Evaluation is limited in task diversity and scale;
- the robot hand has only three fingers, so transfer to full five-finger dexterous hands remains open;
- user-study metrics, latency statistics, and large-scale success-rate analysis are limited;
- shared-control rules are manually designed rather than learned;
- haptic feedback granularity remains to be tested on more complex material and force-control tasks.

## Discussion questions

1. Should dexterous retargeting optimize pose similarity or task-level contact success?
2. How much shared-control intervention can be added before the operator loses agency?
3. Should haptic feedback prioritize force magnitude, contact events, slip, or task-level warnings?
4. Are demonstrations collected with this platform sufficient for generalizable dexterous policies?
5. What structural changes are needed for five-finger or soft robotic hands?

## Relevance to our lab

This work is directly relevant to glove-to-robot-hand control, haptic feedback, and teleoperation data collection. Its main lesson is that high-quality demonstration data depends on the quality of the entire teleoperation stack: retargeting, feedback, shared control, safety constraints, and synchronized logging.

## Possible follow-up ideas

- use demonstrations from such a platform to fine-tune diffusion policies or VLAs;
- learn shared-control interventions from tactile or force feedback;
- retarget human motion through contact-space objectives instead of joint-space objectives;
- run user studies measuring how haptic feedback granularity affects workload;
- build a standardized benchmark for dexterous bilateral teleoperation.
