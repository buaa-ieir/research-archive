---
title: "HapTile: A Haptic-Informed VTLA Dataset for Contact-Rich Imitation Learning"
date: "2026-06-03"
presenter: "Kaixin Hu"
presenter_slug: "kaixin-hu"
language: "en"
cover_image: "/reviews/2026-06-03-HapTile-EN/cover.png"
paper_title: "HapTile: A Haptic-Informed Vision-Tactile-Language-Action Dataset for Contact-Rich Imitation Learning"
authors:
  - "Amirhosein Alian"
  - "Yongqiang Zhao"
  - "Shiyi Gu"
  - "Xuyang Zhang"
  - "Zhuo Chen"
  - "Christopher E. Mower"
  - "Haitham Bou-Ammar"
  - "Shan Luo"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.04825"
doi: "10.48550/arXiv.2606.04825"
tags:
  - "VLA"
  - "tactile sensing"
  - "haptic feedback"
  - "imitation learning"
  - "multimodal datasets"
summary: "HapTile provides 1,726 contact-rich demonstrations with language, vision, fingertip touch, actions, and operator haptic feedback, and benchmarks alternative tactile representations."
---

## One-sentence summary

HapTile records fingertip touch for policy learning and feeds tactile changes back to the teleoperator, improving contact awareness at both data collection and model input.

![HapTile overview](/reviews/2026-06-03-HapTile-EN/fig1-overview.png)

*Figure 1. The platform synchronizes vision, bilateral touch, robot state, actions, language, and controller vibration.*

## Problem addressed

Most VLA datasets remain vision-centric. Existing tactile datasets often lack task diversity, language conditioning, or action trajectories, while teleoperation systems rarely return robot contact to the operator. HapTile aims to combine fingertip sensing, language, actions, and haptic-informed collection in a reproducible platform.

## Main contribution

- 1,726 demonstrations, 38 tasks, nine skills, and 750.33 minutes of interaction;
- third-person and wrist vision, bilateral tactile images, proprioception, 7D actions, and instructions;
- low-cost vision-based tactile fingertips for the Robotiq 2F-85;
- marker optical flow converted into Quest-controller vibration;
- Diffusion Policy and π0 benchmarks for vision, raw touch, and marker features.

## Dataset and platform

Nine operators teleoperate a UR5e through VR across move, put, remove, turn, fold, insert, wipe, press, and stack skills. Data are synchronized at 15 Hz, with actions represented as end-effector translation, rotation deltas, and gripper command.

![Dataset statistics](/reviews/2026-06-03-HapTile-EN/fig2-dataset-statistics.png)

*Figure 2. Skill composition, demonstration counts, and task duration statistics.*

![Collection platform](/reviews/2026-06-03-HapTile-EN/fig3-platform.png)

*Figure 3. UR5e, RGB cameras, VR interface, and custom tactile fingertip construction.*

Lucas-Kanade flow tracks surface markers with consistency checks and reinitialization. Marker displacement becomes a contact-motion score that is normalized and discretized into left/right controller vibration.

![Tactile signals](/reviews/2026-06-03-HapTile-EN/fig4-tactile-signals.png)

*Figure 4. Marker motion changes from pre-grasp to grasp for a can and Rubik's cube.*

![Haptic workflow](/reviews/2026-06-03-HapTile-EN/fig5-haptic-workflow.png)

*Figure 5. Tactile marker motion is processed into teleoperator vibration feedback.*

## Key results

The benchmark covers bottle uprighting, whiteboard wiping, liquid pouring, and peg insertion. Touch helps strongly when contact is decisive: π0 peg insertion rises from 0% with vision to 90% with raw touch; wiping rises from 50% to 100% with marker features; Diffusion Policy bottle uprighting rises from 80% to 90%.

![Modality ablations](/reviews/2026-06-03-HapTile-EN/fig6-results.png)

*Figure 6. Raw tactile images favor precise localization, while marker displacement can capture shear and force, but benefits depend on task and policy.*

Negative results are equally informative. Marker features reduce Diffusion Policy wiping from 80% to 30% and pouring from 50% to 20%; several π0 tactile settings also degrade. The authors attribute this to limited data and motivate adaptive fusion.

## Strengths

- Connects tactile recording with operator contact awareness.
- Combines task, language, action, and fingertip touch for direct policy learning.
- Documents hardware, synchronization, quality control, and marker processing.
- Reports cases where extra modalities hurt rather than assuming monotonic gains.

## Weaknesses

- Collection occurs in one laboratory scene.
- The dataset remains small for adapting large VLAs to new tactile inputs.
- Haptic feedback has coarse discrete intensity.
- Each evaluation configuration has only ten trials.
- There is no strict randomized comparison of demonstrations with versus without haptic feedback.

## Discussion questions

1. Do gains come from better demonstrations or additional policy observations?
2. How should raw images and marker features be fused adaptively?
3. Can language identify which tactile representation a task needs?
4. How can tactile sensors be normalized across grippers and laboratories?
5. Would continuous bilateral force feedback further improve demonstrations?

## Relevance to our lab

HapTile closely matches the WEART glove-to-XHand project: robot fingertip signals become operator feedback, aligning with existing FORCE/TEMP return channels. Similar synchronized trajectories could combine vision, glove IMU, joint angles, robot forces, and language to test whether feedback reduces slip, repeated corrections, and demonstration variance.

## Possible follow-up ideas

- Randomized collection with and without haptic feedback.
- Task-dependent modality gating through cross-attention or mixture of experts.
- Continuous 3D force and contact-location feedback.
- Cross-sensor tactile pretraining before VLA fine-tuning.
- Extension to dexterous hands, deformable objects, and bimanual tasks.
