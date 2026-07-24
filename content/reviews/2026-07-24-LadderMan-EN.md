---
title: "LadderMan: Learning Humanoid Perceptive Ladder Climbing"
date: "2026-07-24"
presenter: "Jingyu Xu"
presenter_slug: "jingyu_xu"
language: "en"
cover_image: "/reviews/2026-07-24-LadderMan-EN/cover.png"
paper_title: "LadderMan: Learning Humanoid Perceptive Ladder Climbing"
authors:
  - "Siheng Zhao"
  - "Yuanhang Zhang"
  - "Ziqi Lu"
  - "Pieter Abbeel"
  - "Rocky Duan"
  - "Koushil Sreenath"
  - "Yue Wang"
  - "C. Karen Liu"
  - "Guanya Shi"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.05873"
doi: ""
tags:
  - "humanoid robotics"
  - "ladder climbing"
  - "multi-contact control"
  - "imitation learning"
  - "sim-to-real"
summary: "LadderMan learns privileged experts for diverse ladder geometries from one reference motion, distills them into a unified depth policy through hybrid DAgger and reinforcement learning, and uses a dual-agent controller for stable on-ladder manipulation."
---

## One-sentence summary

LadderMan follows a one-reference-to-many-experts-to-unified-policy pipeline for perceptive ascent and descent, then separates multi-contact lower-body stabilization from upper-body teleoperation through a dual-agent controller.

## Problem addressed

Ladder climbing requires both hands and feet to establish reliable contact on narrow, discrete rungs while the support structure changes continuously. Small perception or contact errors accumulate over a long climb. Model-based approaches typically require an accurate ladder model and hand-designed contact sequences; reward-only learning can underuse the arms; standard motion tracking cannot readily adapt one demonstration to new inclinations, rung spacings, and structures.

The paper asks how minimal motion data can support whole-body contact skills across ladder geometries, how privileged experts can be compressed into one depth policy, and how to address structured visual domain gaps caused by thin rungs, rails, braces, and background clutter. It also considers manipulation while maintaining stable ladder contact.

## Main contribution

- A unified perceptive ladder-climbing and on-ladder manipulation system for the Unitree G1.
- Hybrid Motion Tracking, with strict lower-body tracking, relaxed upper-body tracking, and ladder-conditioned contact targets.
- Multi-geometry expert learning from a single reference motion with one annotation of limb-contact events.
- Hybrid DAgger + RL distillation, combining expert imitation with recovery under learner-induced state distributions.
- Fast-FoundationStereo and Rung-Focused Masking for depth sim-to-real transfer.
- Evidence that accurate hand, foot, and shank collision geometry is essential for contact-intensive transfer.
- A dual-agent manipulation policy that separates lower-body stability from upper-body teleoperation.
- Evaluation across ladder inclination, rung spacing and shape, and three physical ladders.

## Methodology

![LadderMan pipeline from a single reference to a unified visual policy.](/reviews/2026-07-24-LadderMan-EN/fig1-framework.png)

*Figure 1. One motion produces multiple privileged experts, which are distilled through hybrid DAgger and RL into a unified depth policy for real deployment.*

The reference is captured with OptiTrack on a ladder inclined at `65.5°` with `24.8 cm` rung spacing. The system labels hand and foot contact events once and trains one expert for each target ladder geometry. Hybrid Motion Tracking applies stricter weights and temperatures to lower-body keypoints to preserve a stable climbing rhythm, while relaxing upper-body tracking so the arms can reach new rungs. Geometry-derived limb-contact targets and a root progress objective ensure that contacts are established and the robot ascends or descends.

The unified policy observes a 60×80 depth image, proprioceptive history, and a binary up/down command. Hybrid DAgger + RL jointly optimizes a PPO objective and a KL imitation term toward the expert, then reduces the KL weight over training. The student therefore begins by copying experts but can later learn recovery in states not covered by demonstrations.

![Rung-focused alignment between simulation and real depth.](/reviews/2026-07-24-LadderMan-EN/fig2-depth-alignment.png)

*Figure 2. Simulation uses rung-focused masking and lightweight noise, while real deployment uses foundation-model stereo depth to recover continuous rung geometry.*

Rung-Focused Masking randomly removes non-rung regions, forcing the policy to attend to the structures that determine contact rather than memorizing rails, braces, or backgrounds. On the real system, the D435i infrared projector and auto-exposure are disabled, and Fast-FoundationStereo runs on an external RTX 4090 to provide cleaner depth. The hand, foot, and shank collision models are also refined to represent rung contacts more faithfully.

For manipulation, two independent actor-critic modules are used. A lower-body agent observes proprioception and maintains limb contacts and a pelvis target; an upper-body agent additionally tracks arm, wrist, and waist targets generated from PICO devices. Their joint actions are concatenated. Climbing and manipulation remain separately trained policies and require a phase transition.

## Experimental setup

Experiments use Isaac Sim, 4,096 parallel environments, and a 29-DoF Unitree G1 at 50 Hz. Experts are trained for 8,000 epochs on one NVIDIA L40S with randomization over mass, center of mass, friction, restitution, joint states, and ladder geometry.

Simulation evaluates the Cartesian product of inclinations `{55°, 60°, 65°, 70°}` and rung spacings `{20, 22, 24, 26, 28, 30} cm`, with 100 episodes per configuration and randomized rung dimensions and cross-sections. Three real ladders span roughly `64.8°–69.2°` and `23.1–25.5 cm` rung spacing. Manipulation demonstrations include adjusting a painting, replacing a light bulb, and transferring a box at height.

## Key results

![Ascent, descent, and on-ladder manipulation on three physical ladders.](/reviews/2026-07-24-LadderMan-EN/fig3-real-tasks.png)

*Figure 3. LadderMan climbs structurally different ladders and performs multiple upper-body tasks while supported on the ladder.*

On the reference ladder, three rungs of ascent and descent take approximately `19.3 s`, compared with `18.2 s` for a human subject. In the main simulated region—24–28 cm spacing and 55°–65° inclination—the unified visual policy exceeds `95%` success; the mean over extreme boundary configurations remains about `57%`. A blind tracking baseline peaks at roughly `49%` near the reference geometry and approaches zero across most shifted configurations.

![Ablations of expert training and real-world sim-to-real components.](/reviews/2026-07-24-LadderMan-EN/fig4-ablations.png)

*Figure 4. Contact-aware expert learning and all visual transfer components are necessary for robust deployment.*

The complete system succeeds `9/10`, `6/10`, and `7/10` times on ladders A, B, and C. DAgger without RL drops to `2/10`, `0/10`, and `0/10`; removing foundation-model depth yields `3/10`, `0/10`, and `2/10`; removing Rung-Focused Masking gives `0/10` on all three ladders. Expert ablations further show that explicit contact tracking and the climbing-progress objective are central to transferring a single reference across geometries.

## Strengths

- Covers diverse ladder geometries with only one reference motion.
- Matches the task structure: legs preserve rhythm while arms adapt to rungs.
- Combines DAgger and RL to balance expert inheritance with out-of-distribution recovery.
- Separately targets unstructured sensor noise and structured ladder-domain differences.
- Highlights collision-asset fidelity as a key factor in contact-intensive sim-to-real.
- Tests physical ladders that vary in geometry, material, and support structure.
- Cleanly separates stabilization from teleoperated manipulation.

## Weaknesses

- The system cannot yet climb near-vertical ladders, and real inclinations cover a narrow range.
- Success on ladders B and C is only 6/10 and 7/10.
- Fast-FoundationStereo requires an external RTX 4090, so perception is not fully onboard.
- Manipulation lacks repeated-trial success, completion-time, force, and precision metrics.
- Upper-body-to-ladder collisions are disabled during manipulation training.
- Climbing and manipulation remain separate policies, with unquantified transition safety.
- The system does not autonomously align with, leave, inspect damage on, or recover from a ladder.
- Experts are still trained separately per target geometry, and the main code is not yet public.

## Discussion questions

1. Can a ladder-geometry-conditioned continuous teacher replace the discrete expert set?
2. How does KL annealing in hybrid DAgger + RL trade off stable imitation and failure recovery?
3. Can Rung-Focused Masking hide safety-relevant rails, platforms, or surrounding obstacles?
4. How sensitive is 50 Hz contact control to depth latency, dropped frames, and synchronization error?
5. How can policy transitions remain continuous while the robot handles missing or loose rungs autonomously?

## Relevance to our lab

LadderMan is directly relevant to Unitree G1 whole-body imitation, rough-terrain motion, motion priors, and unified skill policies. Its strict-lower/relaxed-upper tracking principle can support locomotion in which the arms must adapt freely to geometry. The results also suggest that improving contact assets may be more valuable than adding further randomization when hardware failures arise from inaccurate contact. Shared backbones, skill latents, and safety-aware transitions could unify climbing, manipulation, and recovery.

## Possible follow-up ideas

- Extend to 75°–90° ladders with explicit grip-force and friction-cone constraints.
- Replace per-geometry experts with a geometry-conditioned teacher.
- Unify climbing, manipulation, transition, and fall recovery in a hierarchical policy.
- Add wrist and foot force sensing for contact, slip, and rung-failure detection.
- Run the depth estimator entirely onboard.
- Replace fixed masking with semantic structure detection and model upper-body collisions explicitly.
