---
title: "DreamRiser: Robust Recovery Motion Control for Quadrupedal Robots via Learned Terrain Imagination"
date: "2026-07-22"
presenter: "Fangyuan Zhang"
presenter_slug: "fangyuan_zhang"
language: "en"
cover_image: "/reviews/2026-07-22-DreamRiser-EN/cover.png"
paper_title: "Robust Recovery Motion Control for Quadrupedal Robots via Learned Terrain Imagination"
authors:
  - "I Made Aswin Nahrendra"
  - "Minho Oh"
  - "Byeongho Yu"
  - "Hyungtae Lim"
  - "Hyun Myung"
venue: "arXiv"
year: 2023
paper_url: "https://arxiv.org/abs/2306.12712"
doi: ""
tags:
  - "quadruped robots"
  - "fall recovery"
  - "reinforcement learning"
  - "terrain imagination"
  - "proprioception"
summary: "DreamRiser infers surrounding terrain structure from proprioceptive history and generates terrain-adaptive recovery maneuvers for quadrupeds on stairs, slopes, irregular supports, and under payload variation."
---

## One-sentence summary

DreamRiser applies implicit terrain imagination to fall recovery, allowing one reinforcement-learning policy to generate different self-righting motions for unknown support conditions.

## Problem addressed

![Failure and DreamRiser-enabled recovery of a fallen quadruped.](/reviews/2026-07-22-DreamRiser-EN/fig1-recovery-overview.png)

*Figure 1. Failure and DreamRiser-enabled recovery of a fallen quadruped.*

Most quadruped recovery controllers are designed and evaluated on flat ground. Fixed motions, or separate self-righting and stand-up policies, may fail on stairs, slopes, or stacked objects because the available support geometry and contacts vary substantially. A pose that is upright in a global frame may also remain unstable if the feet do not establish reliable contact.

The paper asks how a robot can infer its support conditions using onboard proprioception and recover from arbitrary fallen configurations to a stable, all-feet-contact posture.

## Main contribution

- An all-terrain recovery policy that adapts its maneuver to implicit terrain structure.
- Joint estimation of body velocity and latent environmental context.
- A recovery objective that combines base uprightness and stable foot contact.
- Simulation and real-world validation across terrain, robot platforms, and payload conditions.

## Methodology

DreamRiser formulates recovery as a POMDP. The actor uses proprioception, estimated body velocity, and a 32-dimensional context vector to output 12 target joint positions. The critic receives privileged disturbance, body-velocity, and local-height information during training. A CENet learns explicit velocity estimation and latent terrain context from temporal observations.

The reward includes base uprightness, foot contact, joint acceleration, joint power, and action-rate terms. PPO trains 4,096 domain-randomized Isaac Gym agents. The deployment policy runs at 50 Hz with 200 Hz joint-level PD control.

## Experimental setup

![Real-robot recovery sequences on deformable, cluttered, outdoor, and payload-perturbed settings.](/reviews/2026-07-22-DreamRiser-EN/fig2-terrain-adaptive-recovery.png)

*Figure 2. Real-robot recovery sequences on deformable, cluttered, outdoor, and payload-perturbed settings.*

Simulation covers ten difficulty levels of rough, discrete, sloped, and stair terrain, with 1,000 robots evaluated per condition. Recovery is successful when the robot reaches a stable upright posture within five seconds. The baseline is end-to-end RL without CENet or an asymmetric actor-critic.

Real-world tests use Unitree A1 and Go1 robots on sponge, irregular bumps, stacked boxes, and payload variations.

## Key results

![t-SNE visualization of latent representations from DreamRiser and the baseline.](/reviews/2026-07-22-DreamRiser-EN/fig3-latent-analysis.png)

*Figure 3. t-SNE visualization of latent representations from DreamRiser and the baseline.*

DreamRiser maintains higher recovery success than the baseline over most terrain types and difficulty levels, with the largest advantage on difficult terrain. In hardware, the policy produces support-dependent behaviors, such as asymmetric bracing, contact searching, and reduced leg swing under payloads.

t-SNE analysis shows more clearly separated terrain-dependent latent clusters than the baseline, suggesting that CENet learns environmental information relevant to recovery.

## Strengths

- Recovery is treated as adaptive behavior rather than a fixed motion sequence.
- The method avoids external sensors that may be damaged or occluded during a fall.
- Stable foot contact is included explicitly in the task objective.
- One policy covers diverse initial poses and payload conditions.

## Weaknesses

- Fall detection, normal locomotion, and recovery are not integrated into one autonomous system.
- Real-world evaluation is mainly qualitative and lacks large-sample success statistics.
- The implicit context does not provide explicit support geometry or contact locations.

## Discussion questions

1. When should a recovery controller take over from and return control to locomotion?
2. What are the trade-offs between implicit terrain context and explicit contact prediction?
3. How should impact force and hardware damage risk be constrained during recovery?
4. Can one policy unify fall prevention, impact mitigation, and self-righting?

## Relevance to our lab

The paper is relevant to robot safety, embodied state estimation, and failure-recovery learning. It shows that interaction history can support environmental inference even in failure states, providing a useful model for autonomous fault recovery in embodied systems.

## Possible follow-up ideas

- Jointly train fall prediction, locomotion, and recovery.
- Add contact-force, tactile, and structural-impact constraints.
- Predict interpretable support locations and surfaces.
- Extend to wheeled-legged, humanoid, and mobile-manipulator recovery.
