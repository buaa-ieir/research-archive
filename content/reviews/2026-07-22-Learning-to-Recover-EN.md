---
title: "Learning to Recover: Dynamic Reward Shaping with Wheel-Leg Coordination for Fallen Robots"
date: "2026-07-22"
presenter: "Fangyuan Zhang"
presenter_slug: "fangyuan_zhang"
language: "en"
cover_image: "/reviews/2026-07-22-Learning-to-Recover-EN/cover.png"
paper_title: "Learning to Recover: Dynamic Reward Shaping with Wheel-Leg Coordination for Fallen Robots"
authors:
  - "Boyuan Deng"
  - "Luca Rossini"
  - "Jin Wang"
  - "Weijie Wang"
  - "Dimitrios Kanoulas"
  - "Nikolaos Tsagarakis"
venue: "arXiv"
year: 2025
paper_url: "https://arxiv.org/abs/2506.05516"
doi: ""
tags:
  - "wheeled-legged robots"
  - "fall recovery"
  - "dynamic reward shaping"
  - "wheel-leg coordination"
  - "reinforcement learning"
summary: "The method uses episode-based dynamic reward shaping to balance recovery exploration and terminal convergence, while quantifying how active wheels improve stability and reduce leg-joint torque through center-of-mass regulation."
---

## One-sentence summary

The method encourages broad recovery exploration early in an episode, precise posture convergence later, and active wheel use to reduce joint loading and body oscillation.

## Problem addressed

Wheeled-legged recovery involves discontinuous contacts and strongly nonlinear dynamics. Sparse terminal rewards provide insufficient exploration guidance, while strong posture penalties can make the policy converge prematurely to local optima. Previous work also rarely quantifies the active contribution of the wheels during self-righting.

The paper asks how exploration and convergence can be balanced while coordinating wheels and legs for fast, stable, and low-load recovery across robot platforms.

## Main contribution

- Episode-based Dynamic Reward Shaping (ED) combined with curriculum learning.
- A quantitative analysis of wheel assistance for center-of-mass regulation, stability, and torque reduction.
- Cross-platform validation on KYON and Unitree Go2-W.
- Real-world demonstrations of repeated autonomous recovery without resetting.

## Methodology

![Asymmetric-PPO training framework for wheeled-legged recovery.](/reviews/2026-07-22-Learning-to-Recover-EN/fig1-training-framework.png)

*Figure 1. Asymmetric-PPO training framework for wheeled-legged recovery.*

An asymmetric PPO actor-critic uses noisy proprioception and state history for the actor, while the critic receives privileged collision information. Each five-second episode starts from a randomized free-fall pose and is not terminated early.

ED changes the reward composition over an episode: early steps prioritize broad joint and wheel exploration, while later steps increasingly emphasize target joint posture, base height, and orientation. The actor jointly commands leg positions and wheel velocities, producing rolling-based center-of-mass adjustment followed by precise leg stabilization.

## Experimental setup

![Autonomous repeated recovery under consecutive manual perturbations.](/reviews/2026-07-22-Learning-to-Recover-EN/fig3-repeated-perturbation-recovery.png)

*Figure 2. Autonomous repeated recovery under consecutive manual perturbations.*

Policies are trained in Isaac Lab and compared across 2,048 randomized initial states. Ablations compare ED with fixed reward shaping and active wheels with fixed wheels. Metrics include recovery success, average joint torque, maximum joint velocity, and base-height variance.

Hardware experiments use KYON and Unitree Go2-W, including repeated external perturbations and immediate second recovery. Five unseen uneven-terrain families evaluate zero-shot generalization.

## Key results

![Average joint-torque comparison between wheel-active and wheel-fixed configurations.](/reviews/2026-07-22-Learning-to-Recover-EN/fig2-joint-torque-results.png)

*Figure 3. Average joint-torque comparison between wheel-active and wheel-fixed configurations.*

ED achieves `99.1%` recovery on KYON versus `96.4%` for the baseline, and `97.8%` on Go2-W versus `94.1%`. Active wheels reduce average joint torque from 42.515 to 35.776 N·m on KYON (`15.85%`) and from 9.657 to 7.123 N·m on Go2-W (`26.24%`).

On unseen non-flat terrain, KYON reaches `78.6%` success versus `61.8%` for the baseline. Hardware trials show autonomous correction after an unstable first attempt and repeated recovery after further perturbations.

## Strengths

- The reward schedule directly addresses the exploration-convergence trade-off.
- The paper quantifies how wheel actuation contributes to recovery.
- Similar benefits appear on platforms with different dynamics and actuation limits.
- Evaluation covers success, torque, and stabilization behavior.

## Weaknesses

- Performance still drops substantially on unseen stairs and slopes.
- Without terrain perception, contact transitions can produce delayed reactions.
- Large-sample hardware statistics remain limited.

## Discussion questions

1. Can the reward schedule itself be learned rather than manually annealed?
2. How does wheel assistance scale with robot mass and wheel radius?
3. How should wheel impact and slip be constrained while reducing leg torque?
4. Can locomotion and recovery be unified in one hybrid policy?

## Relevance to our lab

This work is relevant to safe wheeled-legged and humanoid recovery, reinforcement-learning reward design, and actuator-load management. Its quantitative wheel-leg analysis is particularly useful for industrial robots requiring safe and sustainable operation.

## Possible follow-up ideas

- Learn the reward schedule through meta-learning or constrained optimization.
- Fuse terrain perception and contact prediction.
- Add thermal, peak-torque, and hardware-lifetime constraints.
- Train an integrated locomotion-fall-recovery policy.
