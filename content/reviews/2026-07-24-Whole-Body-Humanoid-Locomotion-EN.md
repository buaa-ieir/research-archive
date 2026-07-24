---
title: "Learning Whole-Body Humanoid Locomotion via Motion Generation and Motion Tracking"
date: "2026-07-24"
presenter: "Jingyu Xu"
presenter_slug: "jingyu_xu"
language: "en"
cover_image: "/reviews/2026-07-24-Whole-Body-Humanoid-Locomotion/cover.png"
paper_title: "Learning Whole-Body Humanoid Locomotion via Motion Generation and Motion Tracking"
authors:
  - "Zewei Zhang"
  - "Kehan Wen"
  - "Michael Xu"
  - "Junzhe He"
  - "Chenhao Li"
  - "Takahiro Miki"
  - "Clemens Schwarke"
  - "Chong Zhang"
  - "Xue Bin Peng"
  - "Marco Hutter"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2604.17335"
doi: ""
tags:
  - "humanoid robotics"
  - "whole-body locomotion"
  - "diffusion models"
  - "motion tracking"
  - "reinforcement learning"
summary: "The method uses a terrain- and direction-conditioned diffusion model to generate short-horizon whole-body references online, while a closed-loop RL-fine-tuned tracker corrects discontinuous, slipping, or dynamically infeasible references for multi-skill Unitree G1 locomotion."
---

## One-sentence summary

Rather than training and distilling one expert per terrain, the framework generates terrain-conditioned whole-body references online and uses a closed-loop RL-fine-tuned tracker to filter imperfect kinematic motion into executable robot actions.

## Problem addressed

Reward-only learning often converges to leg-dominant behaviors with limited upper-body coordination. Pure imitation preserves coordinated motion but cannot readily adapt to obstacle height, direction, or composition. Multi-expert distillation supports skill switching but requires expert assignment, data allocation, and transition design, making it increasingly expensive as the skill set grows. Diffusion models can compose motion, yet their kinematic outputs may contain foot sliding, penetration, temporal discontinuities, and hardware-infeasible states.

The paper asks how one generative model can compose whole-body skills online from terrain and direction, while a unified tracker supplies dynamic feasibility and high-rate feedback. It also targets the distribution shift between refined offline motions and imperfect online references under an onboard latency budget.

## Main contribution

- A real-humanoid architecture combining a diffusion motion generator with an RL whole-body tracker.
- A pipeline from monocular video and public motion data to physically executable G1 trajectories.
- Terrain-geometry augmentation and repeated physical refinement that expand roughly five minutes of motion to about one hour.
- A generator conditioned on direction, a 17×11 height scan, and two motion-history frames, predicting 0.5 seconds ahead.
- Closed-loop tracker fine-tuning with the generator frozen, exposing the controller to realistic generation errors.
- Two-step diffusion with TensorRT inference in approximately 0.02 seconds.
- Unitree G1 demonstrations on a 75 cm box, repeated vaults, stairs, obstacle avoidance, and unseen skill compositions.
- Quantitative studies that isolate the benefits of online generation and closed-loop fine-tuning.

## Methodology

![Motion curation, independent generator/tracker pretraining, and closed-loop fine-tuning.](/reviews/2026-07-24-Whole-Body-Humanoid-Locomotion-EN/fig1-framework.png)

*Figure 1. The system builds physically executable motion data, pretrains generation and tracking modules independently, then freezes the generator and fine-tunes the tracker in closed loop.*

Source motions come from ordinary videos and public datasets. GVHMR reconstructs human motion, contact-constrained inverse kinematics retargets it to the G1, and terrain objects are aligned manually. Retargeted trajectories are not used directly: a DeepMimic-style controller first tracks them, and its rollouts form physically refined training data. Obstacle scale, terrain shape, and small random blocks augment the motion, after which each optimized sequence is refined again through physical tracking.

The tracker observes a reference root state, 23 joint states, nine key-body positions, five frames of proprioceptive history, and a 17×11 height scan. At 50 Hz it outputs 23 target joint positions. Pretraining combines whole-body imitation rewards with joint, torque, and action-smoothness regularization.

The MDM-style diffusion generator predicts 25 frames, or `0.5 s`, of whole-body reference conditioned on target direction, terrain scan, and the two most recent states. It acts as a short-horizon motion planner rather than a motor controller. Before deployment, the generator is frozen and continuously produces references on expanded terrains while PPO fine-tunes the tracker. The controller thus learns to deviate from references that contain sliding or unsafe contact.

The real system builds a 2.5D elevation map from a Livox MID360, DLIO, and Elevation Mapping CuPy. The generator runs on an additional Jetson Thor and replans every `0.25 s`; tracking and the remaining modules run on the G1's Jetson Orin.

## Experimental setup

Initial skills include omnidirectional walking, a 35 cm hurdle, climbing onto and jumping from a 50 cm box, and roughly 20 cm stairs. Augmentation expands the set to 35–75 cm boxes, 25–45 cm hurdles, and 15–20 cm stairs. Closed-loop fine-tuning further covers 15–25 cm stairs, 25–55 cm consecutive hurdles, and 30–85 cm multi-box and pyramid structures.

Simulation uses Isaac Lab with 500 robots per quantitative condition and randomized initial poses and joint configurations. Real experiments include straight box ascent/descent, a 90° turn followed by a lateral jump, corner transitions, consecutive hurdles, stairs, local obstacle avoidance, and an unseen hurdle–stair–box sequence.

## Key results

![Real-world high-box, hurdling, stair, local-navigation, and mixed-terrain results.](/reviews/2026-07-24-Whole-Body-Humanoid-Locomotion-EN/fig2-real-results.png)

*Figure 2. The Unitree G1 uses hands, knees, and coordinated whole-body motion to traverse a 75 cm box, repeated hurdles, and mixed terrain.*

The physical G1 climbs a `75 cm` box and descends through straight motion, a 90° turn followed by a lateral jump, or corner transitions. It also traverses consecutive obstacles and stairs and switches motion styles within an unseen hurdle–stair–box sequence. In some trials, the fine-tuned tracker overrides a reference that is unsuitable for the current state and moves around the box, suggesting limited emergent local navigation.

![Fixed-reference tracking versus online motion generation across obstacle geometries.](/reviews/2026-07-24-Whole-Body-Humanoid-Locomotion-EN/fig3-generation-results.png)

*Figure 3. Online generation adapts motion timing and amplitude to obstacle scale and direction, substantially outperforming fixed-reference tracking.*

For box climbing, hurdling, and stair ascent, mean success increases from `0.859`, `0.805`, and `0.845` with fixed-reference tracking to `0.987`, `0.990`, and `0.997` with online generation. At extreme geometries, an 80 cm box improves from `0.230` to `0.962`, a 25 cm stair from `0.114` to `0.986`, and a 55 cm hurdle from `0.348` to `0.920`.

![Benefit of closed-loop RL fine-tuning with the generator frozen.](/reviews/2026-07-24-Whole-Body-Humanoid-Locomotion-EN/fig4-finetuning-results.png)

*Figure 4. Fine-tuning systematically improves box ascent/descent, hurdling, and stair ascent/descent, with larger gains on harder geometries.*

With the generator held fixed, the fine-tuned tracker outperforms its pretrained counterpart across all five task families and obstacle scales, with the margin increasing at greater difficulty. Exposure to the true error distribution of online references—and learning when to ignore them—is therefore a central component rather than a minor calibration step.

## Strengths

- Separates motion composition from physical execution without requiring one discrete expert per terrain.
- Physically refines retargeted data before generative training.
- Couples terrain and motion augmentation and revalidates augmented sequences through tracking.
- Generates continuous changes in motion timing, amplitude, and direction rather than discrete skill labels.
- Directly addresses the distribution shift of online references through closed-loop fine-tuning.
- Achieves deployable latency through two-step diffusion and TensorRT.
- Demonstrates high obstacles, whole-body support, mixed sequences, and selective reference overriding.
- Quantitatively isolates both generation and fine-tuning contributions.

## Weaknesses

- The system depends on a LiDAR height map, DLIO, and accurate pose estimation.
- An extra Jetson Thor is required; the stock G1 compute cannot run the full pipeline alone.
- A 2.5D map cannot represent overhangs, rails, or complex 3D structures.
- Reference updates every 0.25 seconds may be too slow for abrupt changes.
- Initial terrain-motion alignment remains manual, while augmentation primarily changes geometric scale.
- Source motion diversity is limited, and fall recovery is absent.
- Emergent obstacle avoidance is qualitative and lacks repeatability or path-efficiency statistics.
- Real experiments do not report repeated-trial success, and key generator/PPO hyperparameters are incomplete.
- Training and deployment code are not publicly linked.

## Discussion questions

1. Why freeze only the generator—would joint optimization improve feasibility or collapse motion diversity?
2. What error range introduced by two-step diffusion can the tracker safely correct?
3. How can the tracker be prevented from over-riding references so strongly that it becomes a reward-only policy?
4. Should the prediction horizon and replanning interval adapt to skill, speed, and perception latency?
5. Can contact feasibility be evaluated explicitly instead of being left entirely to the tracker?

## Relevance to our lab

The paper is highly relevant to G1 imitation learning, motion-data expansion, rough-terrain locomotion, teacher-student training, and unified recovery. It offers an alternative to multi-expert distillation: learn a continuous generator over the motion library and execute it with one physical tracker. Existing AMASS, LAFAN, or self-collected skills could first be refined through tracking before generator training. Recovery motions could join the same motion space, with tracker fine-tuning from randomized fallen states.

## Possible follow-up ideas

- Replace LiDAR elevation maps with raw depth, multi-view vision, or neural maps.
- Add a feasibility critic and contact predictor for penetration, sliding, and reachability.
- Distill the generator into a consistency, flow-matching, or low-dimensional latent model.
- Add arbitrary-pose recovery and post-recovery goal replanning.
- Jointly generate locomotion and loco-manipulation skills such as carrying, pushing, and door opening.
- Introduce an MPC/CBF safety layer and evaluate long-horizon outdoor and dynamic-obstacle settings.
