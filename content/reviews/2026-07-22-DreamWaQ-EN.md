---
title: "DreamWaQ: Learning Robust Quadrupedal Locomotion With Implicit Terrain Imagination via Deep Reinforcement Learning"
date: "2026-07-22"
presenter: "Fangyuan Zhang"
presenter_slug: "fangyuan_zhang"
language: "en"
cover_image: "/reviews/2026-07-22-DreamWaQ-EN/cover.png"
paper_title: "DreamWaQ: Learning Robust Quadrupedal Locomotion With Implicit Terrain Imagination via Deep Reinforcement Learning"
authors:
  - "I Made Aswin Nahrendra"
  - "Byeongho Yu"
  - "Hyun Myung"
venue: "IEEE ICRA"
year: 2023
paper_url: "https://arxiv.org/abs/2301.10602"
doi: ""
tags:
  - "quadruped robots"
  - "reinforcement learning"
  - "proprioception"
  - "terrain adaptation"
  - "sim-to-real"
summary: "DreamWaQ combines an asymmetric actor-critic with a context-aided estimator to infer body state and terrain properties from short proprioceptive histories, enabling robust quadrupedal locomotion without exteroception."
---

## One-sentence summary

DreamWaQ uses proprioceptive history to “imagine” unobserved terrain, enabling a quadruped to traverse stairs, slopes, vegetation, mud, and outdoor hills without cameras or LiDAR.

## Problem addressed

Exteroceptive sensing is vulnerable to lighting, weather, occlusion, and misleading terrain appearance, while earlier proprioceptive policies have limited robustness over long and heterogeneous outdoor routes. A further difficulty is the representation-learning bottleneck: the policy needs terrain knowledge to learn stable locomotion, but must already move effectively to explore and learn terrain properties.

The paper therefore asks how body-state estimation, environmental representation, and locomotion control can be learned jointly under partial observability using only joint encoders and an IMU.

## Main contribution

The paper introduces DreamWaQ, a proprioception-only quadrupedal locomotion framework. Its main contributions are:

- a single-stage asymmetric actor-critic architecture for implicit terrain imagination;
- the Context-Aided Estimator Network (CENet) for joint body-velocity and environmental-context estimation;
- Adaptive Bootstrapping (AdaBoot), which regulates estimator guidance according to training stability;
- long-distance and disturbance-robust real-world validation on a Unitree A1.

## Methodology

![Overall DreamWaQ training and zero-shot sim-to-real framework.](/reviews/2026-07-22-DreamWaQ-EN/fig1-framework.png)

*Figure 1. Overall DreamWaQ training and zero-shot sim-to-real framework.*

DreamWaQ formulates locomotion as a POMDP. The actor receives five frames of proprioceptive observations together with CENet estimates of body velocity and latent environmental context. During training, the critic additionally receives privileged terrain, friction, and disturbance information. The actor, critic, and CENet are jointly trained with PPO in 4,096 domain-randomized Isaac Gym environments.

CENet combines forward-backward dynamics representation learning with explicit velocity estimation. AdaBoot uses the coefficient of variation of episodic returns to control the probability of estimator-based bootstrapping, limiting unreliable guidance before the estimator converges. At deployment, the policy and CENet run at 50 Hz, while target joint positions are tracked by a 200 Hz PD controller.

## Experimental setup

![Two long-distance outdoor routes and the challenging terrains encountered.](/reviews/2026-07-22-DreamWaQ-EN/fig3-outdoor-navigation.png)

*Figure 2. Two long-distance outdoor routes and the challenging terrains encountered.*

Simulation comparisons include a non-adaptive baseline, AdaptationNet, EstimatorNet, and DreamWaQ with and without AdaBoot. Metrics cover velocity-command tracking, estimation error, maximum tolerated push, and survival during a 30-minute randomized walk.

Real-world experiments use a Unitree A1 on yards, stairs, wet slopes, vegetation, gravel, and a hill route. RTK-GPS records the long-distance trajectories.

## Key results

![Learning curves across methods; AdaBoot improves training stability and final return.](/reviews/2026-07-22-DreamWaQ-EN/fig2-learning-curves.png)

*Figure 3. Learning curves across methods; AdaBoot improves training stability and final return.*

DreamWaQ with AdaBoot tolerates a maximum randomized push of `1.121 ± 0.164 m/s` and achieves a 30-minute survival rate of `95.23 ± 1.61%`; the baseline survival rate is only `20.51 ± 6.44%`. It also outperforms the proprioceptive baselines in command tracking and velocity estimation during stumbling and slipping.

The robot completes a 430 m yard route and a 465 m hill route. The latter includes a 22 m elevation gain and is completed in about 10 minutes.

## Strengths

- The policy avoids dependence on fragile exteroceptive sensing.
- Explicit body-state estimation and implicit environmental representation are learned jointly.
- Single-stage training is simpler than teacher-student distillation.
- The evaluation combines statistical simulation results with long outdoor deployments.

## Weaknesses

- Adaptation is mainly reactive and occurs after the feet contact an obstacle.
- Tall steps and precise foothold selection still require anticipatory perception.
- Cross-morphology generalization is not extensively evaluated.

## Discussion questions

1. Can the latent context be interpreted as friction, stiffness, or geometric properties?
2. How can low-rate exteroception be added without sacrificing proprioceptive robustness?
3. Can AdaBoot generalize to other jointly learned estimation-control systems?
4. Should energy consumption and motor temperature enter the long-distance objective?

## Relevance to our lab

This paper is directly relevant to embodied locomotion, reinforcement learning, proprioceptive state estimation, and robust control. Its central lesson is that interaction history can provide task-relevant environmental information when external sensing is unreliable, and that the estimator and controller should be optimized together.

## Possible follow-up ideas

- Fuse sparse depth or tactile information for pre- and post-contact terrain reasoning.
- Add motor temperature, energy, and joint-safety constraints.
- Extend the architecture to wheeled-legged, humanoid, and mobile-manipulation platforms.
- Study uncertainty and interpretability in the learned terrain context.
