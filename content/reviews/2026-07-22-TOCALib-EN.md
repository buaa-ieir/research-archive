---
title: "TOCALib: An Optimal-Control Trajectory Library for Bimanual Manipulation and Obstacle Avoidance"
date: "2026-07-22"
presenter: "Yiping Li"
presenter_slug: "yiping_li"
language: "en"
cover_image: "/reviews/2026-07-22-TOCALib/cover.png"
paper_title: "TOCALib: Optimal Control Library with Interpolation for Bimanual Manipulation and Obstacles Avoidance"
authors:
  - "Yulia Danik"
  - "Dmitry Makarov"
  - "Aleksandra Arkhipova"
  - "Sergei Davidenko"
  - "Aleksandr Panov"
venue: "arXiv"
year: 2025
paper_url: "https://arxiv.org/abs/2504.07708"
doi: ""
tags:
  - "bimanual manipulation"
  - "trajectory optimization"
  - "optimal control"
  - "collision avoidance"
  - "trajectory library"
summary: "TOCALib unifies robot dynamics, joint constraints, and differentiable collision constraints in an optimal-control problem, precomputes a bimanual trajectory library, and interpolates Bézier coefficients for new targets."
---

## One-sentence summary

TOCALib uses FROST, IPOPT, and differentiable collision detection to precompute dynamically feasible bimanual motions, then interpolates neighboring Bézier trajectories to produce approximate solutions for targets inside the library grid.

## Problem addressed

Bimanual planning must simultaneously handle intra-arm self-collision, inter-arm collision, arm-base collision, and environmental obstacles while respecting joint, velocity, acceleration, torque, and full-dynamics constraints. Sampling-based or purely kinematic planners generally produce geometric paths without guaranteeing dynamic executability.

Directly solving a large nonlinear optimal-control problem for every new target is too costly for rapid planning or large-scale data generation. The paper therefore asks how to construct a high-quality trajectory library offline and obtain approximate trajectories efficiently when a query does not coincide with a stored grid node.

## Main contribution

- A nonlinear-program formulation containing full bimanual dynamics, joint limits, end-effector targets, and collision constraints.
- Symbolic dynamic and kinematic constraints generated from the URDF by FROST and solved through IPOPT.
- Integration of DifferentiableCollisions/DCOL, implemented in Julia, into the FROST pipeline.
- Unified convex-primitive modeling for intra-arm, inter-arm, arm-base, and environment collision constraints.
- Fifth-order Bézier storage and trilinear interpolation of eight neighboring library trajectories.
- Validation on Mobile ALOHA with static obstacles, known moving obstacles, and shelf scenes, with potential use as an RL or imitation-learning data generator.

## Methodology

![Integration of DifferentiableCollisions with the FROST optimal-control pipeline.](/reviews/2026-07-23-TOCALib/fig1-framework.png)

*Figure 1. Integration of DifferentiableCollisions with the FROST optimal-control pipeline.*

TOCALib builds a bimanual optimal-control problem in FROST. State and control trajectories satisfy discretized dynamics and joint/actuator limits. DCOL computes differentiable proximity measures between convex primitives and their gradients with respect to generalized coordinates; these quantities become nonlinear constraints for IPOPT.

Optimized state and control trajectories are stored as fifth-order Bézier coefficients on a regular target-space grid. For an uncovered target, the system identifies the eight surrounding nodes and trilinearly interpolates their polynomial coefficients. This avoids a complete re-optimization, although the paper does not prove that interpolation preserves every dynamic and collision constraint.

## Experimental setup

![Spherical-obstacle avoidance on the physical Mobile ALOHA platform.](/reviews/2026-07-23-TOCALib/fig2-real-robot-avoidance.png)

*Figure 2. Spherical-obstacle avoidance on the physical Mobile ALOHA platform.*

The Mobile ALOHA model contains 39 generalized degrees of freedom, and each trajectory is discretized into 31 intervals. Experiments focus on the two front manipulators rather than coordinated mobile-base and arm motion.

Scenes include a static sphere, a sphere following a predefined trajectory, a shelf built from convex polytopes, and the robot’s own arms and base. TOCALib is compared with CHOMP, which mainly produces geometric waypoints and requires additional end-effector-orientation search and post-planning self-collision checks.

## Key results

![Manipulator avoidance of a sphere with a known motion trajectory.](/reviews/2026-07-23-TOCALib/fig3-moving-obstacle.png)

*Figure 3. Manipulator avoidance of a sphere with a known motion trajectory.*

With DCOL enabled, the manipulator avoids both static and moving spheres; without collision constraints, the optimized path intersects the obstacle. The moving-obstacle result assumes known geometry and motion and does not include online perception, tracking, or prediction.

![Collision-free bimanual trajectories and self-collision avoidance in a shelf scene.](/reviews/2026-07-23-TOCALib/fig4-shelf-trajectories.png)

*Figure 4. Collision-free bimanual trajectories and self-collision avoidance in a shelf scene.*

For 36 shelf targets, TOCALib finds feasible trajectories for `90%` of tasks, compared with approximately `44%` for CHOMP; the remaining `10%` are infeasible because the target states are already in collision. A larger library contains 27 target positions and 325 bimanual combinations. On the 166 combinations solvable by at least one method, TOCALib achieves a higher success rate while producing dynamically constrained state-control trajectories. Approximately `22%` of CHOMP outputs also exhibit abnormal behavior in visualization.

## Strengths

- Unifies dynamic feasibility and multiple collision classes in one optimal-control problem.
- Supplies analytical collision gradients to gradient-based optimization.
- Uses interpretable convex geometry for robot and environment interactions.
- Provides dynamically feasible bimanual reference data for learning methods.
- Reduces repeated optimization through local trajectory interpolation.
- Outperforms a geometric planner in the complex shelf environment.

## Weaknesses

- Full optimization takes roughly two minutes for typical trajectories and about eight minutes for complex shelf tasks.
- Interpolation latency and strict feasibility are not systematically evaluated.
- Obstacles must be modeled in advance as spheres, capsules, or convex polytopes.
- The moving obstacle follows a known trajectory; no online sensing or prediction is provided.
- Mobile-base and arm whole-body coordination is not demonstrated.
- IPOPT is locally optimal and sensitive to initialization and target feasibility.
- Complex bimanual scenes and interpolated trajectories receive limited physical validation.

## Discussion questions

1. How can interpolated Bézier coefficients be guaranteed to satisfy dynamics, joint, and collision constraints?
2. Can interpolation between different obstacle-avoidance homotopy classes produce collisions?
3. Could an interpolated trajectory initialize a few optimization iterations for rapid feasibility restoration?
4. How can RGB-D, point clouds, or ESDF maps be converted into online DCOL constraints?
5. How can the library avoid dimensionality growth when adding pose, initial state, obstacles, and carried objects?

## Relevance to our lab

The work is highly relevant to mobile-bimanual whole-body planning, collision avoidance, safety constraints, and high-quality reference generation. Its main lesson is that differentiable collision metrics can be embedded directly as analytical optimal-control constraints, while the resulting trajectory library can support safe reinforcement and imitation learning.

## Possible follow-up ideas

- Use interpolated trajectories to initialize short-horizon feasibility correction.
- Build online collision constraints from learned implicit fields, ESDFs, or point clouds.
- Add moving-obstacle state estimation and short-term prediction.
- Model grasped objects as attached rigid collision bodies.
- Replace dense regular grids with sparse sampling, generative models, or neural implicit libraries.
- Extend optimization to the mobile base, torso, and both arms.
