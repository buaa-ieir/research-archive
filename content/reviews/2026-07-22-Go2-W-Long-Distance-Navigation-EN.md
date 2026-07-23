---
title: "Long-Distance Real-World Navigation of the Legged-Wheeled Robot Go2-W Using Deep Reinforcement Learning"
date: "2026-07-22"
presenter: "Fangyuan Zhang"
presenter_slug: "fangyuan_zhang"
language: "en"
cover_image: "/reviews/2026-07-22-Go2-W-Long-Distance-Navigation/cover.png"
paper_title: "Long-Distance Real-World Navigation of the Legged-Wheeled Robot Go2-W Using Deep Reinforcement Learning"
authors:
  - "Takaaki Matsuzawa"
  - "Kiyoshi Irie"
  - "Tomoaki Yoshida"
  - "Taro Suzuki"
  - "Yoshitaka Hara"
  - "Masahiro Tomono"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.21387"
doi: ""
tags:
  - "wheeled-legged robots"
  - "long-distance navigation"
  - "reinforcement learning control"
  - "thermal management"
  - "autonomous navigation"
summary: "The work builds a learned locomotion and autonomous navigation system for the commercial Go2-W, using periodic foot lifting to distribute sustained hip load and repeatedly complete a 2.8 km real urban route with stairs and unpaved terrain."
---

## One-sentence summary

The system resolves hip-motor overheating during sustained Go2-W rolling, enabling more than one hour of continuous autonomous travel over an approximately 2.8 km urban route.

## Problem addressed

Long-range wheeled-legged navigation requires more than a short-horizon locomotion policy: it must provide thermal reliability, terrain traversal, localization, obstacle handling, path following, and robust system integration. The authors find that continuous Go2-W rolling spreads the hip joints outward, causing sustained position-control torque and eventual thermal shutdown.

The paper asks how quadruped reinforcement-learning control can be extended to a 16-DoF wheeled-legged platform and integrated into a kilometer-scale real navigation system.

## Main contribution

- A complete Go2-W navigation stack combining learned locomotion/path following with classical localization and planning.
- A systematic extension from 12-DoF quadruped control to 16-DoF wheeled-legged actuation.
- Identification of hip-load and heat concentration during rolling.
- A flat-terrain policy that uses periodic foot lifting to redistribute load and sustain operation.

## Methodology

![Navigation stack integrating localization, planning, RL locomotion, and learned odometry.](/reviews/2026-07-22-Go2-W-Long-Distance-Navigation-EN/fig1-system-architecture.png)

*Figure 1. Navigation stack integrating localization, planning, RL locomotion, and learned odometry.*

The low-level system contains asymmetric PPO policies for stance, flat terrain, and rough terrain. At deployment, the actor uses joint states, IMU, velocity commands, and action history; the critic also receives terrain height, body velocity, friction, mass, and latency during training. Policies output 12 leg-position commands and four wheel velocities at 50 Hz.

The flat policy is shaped to produce periodic foot lifting, returning hip joints toward their nominal angle and distributing load. The rough-terrain policy is mainly wheel-driven and traverses steps up to 24 cm. The upper layer combines Livox Mid-360 LiDAR, a prior 3D map, map matching, obstacle detection, planning, and a learned omnidirectional path follower.

## Experimental setup

![Traversal sequences for a 24 cm single step and 13 cm staircase.](/reviews/2026-07-22-Go2-W-Long-Distance-Navigation-EN/fig2-stair-traversal.png)

*Figure 2. Traversal sequences for a 24 cm single step and 13 cm staircase.*

The platform is Unitree Go2-W with a Jetson Orin NX. The approximately 2.8 km Tsukuba Challenge 2025 route includes sidewalks, a park, unpaved terrain, 13 cm stairs, an 18-step staircase, and approximately 20 cm steps. Six autonomous runs are conducted over three days, each exceeding one hour.

The manufacturer controller and proposed flat policy are also compared through joint temperature, hip angle, and estimated torque during continuous 1.0 m/s motion.

## Key results

![Approximately 2.8 km Tsukuba Challenge route and key traversal segments.](/reviews/2026-07-22-Go2-W-Long-Distance-Navigation-EN/fig3-navigation-route.png)

*Figure 3. Approximately 2.8 km Tsukuba Challenge route and key traversal segments.*

![Joint-motor temperature curves for the manufacturer baseline and the proposed flat-terrain policy.](/reviews/2026-07-22-Go2-W-Long-Distance-Navigation-EN/fig4-thermal-results.png)

*Figure 4. Joint-motor temperature curves for the manufacturer baseline and the proposed flat-terrain policy.*

The manufacturer controller stops after 1.4 km when a rear-left hip reaches `85°C`; hip temperature approaches the `84°C` protection threshold. With the proposed flat policy, all joint categories stabilize at approximately `56–62°C`.

The robot completes the approximately 2.8 km route in all six runs, each taking 62–69 minutes. Four runs require no intervention; two require handling an unexpected road cone and an oncoming vehicle. During the final demonstration, battery decreases from 89% to 46%, and the robot autonomously continues after contact with another robot.

## Strengths

- The paper addresses thermal reliability, a practical issue often omitted from locomotion studies.
- Mechanism analysis, policy design, and kilometer-scale deployment form a strong evidence chain.
- The use of a commercial platform improves deployment relevance.
- The system covers locomotion, localization, planning, and emergency safety.

## Weaknesses

- Flat and rough policies still require manual configuration for switching.
- Navigation depends on a prebuilt 3D map and predefined route.
- Fast dynamic obstacles are not predicted and once required an emergency stop.
- No direct comparison with pure wheeled or pure legged robots is provided.

## Discussion questions

1. Can thermal suppression and rough-terrain capability be unified in one policy?
2. Can motor temperature enter the policy state and constraints directly?
3. How should terrain-dependent policy selection be automated?
4. Under what route and terrain distribution does a wheeled-legged robot outperform pure alternatives?

## Relevance to our lab

The paper is highly relevant to high-speed, long-endurance mobile bodies, industrial reliability, learned low-level control, and autonomous navigation integration. It shows that industrial evaluation must extend beyond short task success to continuous operation, temperature rise, and hardware protection.

## Possible follow-up ideas

- Build a trainable motor-thermal model and temperature-constrained RL.
- Unify stance, flat, and rough-terrain policies.
- Add online semantic traversability and mapless navigation.
- Incorporate dynamic-object prediction and comparisons with wheeled and legged platforms.
