---
title: "SCAN-Planner: Spatial Collision-Aware Local Planning for Route-Guided Long-Range Quadruped Navigation"
date: "2026-07-22"
presenter: "Fangyuan Zhang"
presenter_slug: "fangyuan_zhang"
language: "en"
cover_image: "/reviews/2026-07-22-SCAN-Planner/cover.png"
paper_title: "SCAN-Planner: Spatial Collision-Aware Local Planning for Route-Guided Long-Range Quadruped Navigation"
authors:
  - "Han Zheng"
  - "Zhe Chen"
  - "Yiwen Fu"
  - "Ming Yang"
  - "Tong Qin"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.19555"
doi: ""
tags:
  - "quadruped robots"
  - "local planning"
  - "whole-body collision checking"
  - "3D navigation"
  - "long-range navigation"
summary: "SCAN-Planner combines a yaw-aware twin-cylinder body model, projected A*, and a robot-centric sliding map to handle narrow passages, overhangs, stairs, and long-range route guidance while preserving ground-following motion."
---

## One-sentence summary

SCAN-Planner makes local planning aware of a quadruped's elongated, orientation-dependent body, enabling safe motion through narrow 3D spaces and scalable multi-floor or campus navigation.

## Problem addressed

Most real-time planners approximate a robot as a point, circle, or sphere. For elongated quadrupeds, width-based inflation may be unsafe during turning, while length-based inflation blocks feasible narrow passages. Two-dimensional and elevation maps cannot represent overhanging structures, whereas unconstrained 3D optimization may generate vertical avoidance that a ground-contact robot cannot execute.

Finite local maps also create dead ends during long-range route following when goals lie outside the window or behind newly observed obstacles.

## Main contribution

- A yaw-aware twin-cylinder footprint for efficient whole-body collision checking.
- Projected A* and z-gradient suppression for horizontally dominated, ground-following avoidance.
- A bounded robot-centric sliding occupancy map with boundary fallback.
- Integration with coarse global routes for long-range indoor and outdoor navigation.

## Methodology

![SCAN-Planner architecture: inputs, robot-centric 3D sliding map, and trajectory optimization.](/reviews/2026-07-22-SCAN-Planner-EN/fig1-system-architecture.png)

*Figure 1. SCAN-Planner architecture: inputs, robot-centric 3D sliding map, and trajectory optimization.*

The system combines a 3D sliding map with B-spline local trajectory optimization. Body yaw is inferred from the local trajectory tangent, and two vertical cylinders approximate the front and rear body for sparse collision queries against a yaw-aware inflated occupancy map.

When a trajectory segment collides, projected A* searches an interpolated ground surface between the segment entry and exit. The rebound construction suppresses its z component, preserving the nominal height trend on stairs and slopes. A circular-buffer sliding map updates occupancy incrementally; when local planning reaches a dead end, a feasible boundary voxel becomes a temporary fallback goal.

## Experimental setup

![Real-world tests in clutter, an S-bend, unstructured terrain, and dynamic-obstacle settings.](/reviews/2026-07-22-SCAN-Planner-EN/fig3-real-world-navigation.png)

*Figure 2. Real-world tests in clutter, an S-bend, unstructured terrain, and dynamic-obstacle settings.*

Simulation comparisons include EGO-Planner-2D/3D, CMU-Planner, and ART-Planner. Scenarios include a 40 m by 20 m forest with 100–500 obstacles, an overhanging desk scene, and stairs with obstacles. Each scene uses 50 independent trials, reporting success rate, collision rate, and SPL.

Hardware experiments use Unitree Go2, Livox Mid-360, and Jetson Orin NX in cluttered rooms, S-bends, unstructured 3D scenes, slowly moving obstacles, multi-floor inspection, and campus delivery.

## Key results

![Planner trajectories in scenes containing 100, 300, and 500 obstacles.](/reviews/2026-07-22-SCAN-Planner-EN/fig2-dense-obstacle-results.png)

*Figure 3. Planner trajectories in scenes containing 100, 300, and 500 obstacles.*

In dense-obstacle simulation, SCAN-Planner achieves `SR/CR/SPL = 1.00/0.00/0.95`, outperforming EGO-Planner-2D (`0.96/0.04/0.88`), EGO-Planner-3D (`0.76/0.24/0.75`), and the other baselines.

The real robot completes a 149 m, three-floor office inspection in 251 s and a 367 m campus delivery in 589 s. It traverses stairs, under-table clearances, and confined bends while avoiding pedestrians, bicycles, and vehicles.

## Strengths

- The body model balances collision fidelity, conservatism, and computation.
- The planner handles both overhangs and ground-following constraints.
- Sliding mapping makes high-resolution local planning scalable to long routes.
- Evaluation combines clear simulation metrics with large real environments.

## Weaknesses

- The system assumes a coarse global route and tangent-aligned body yaw.
- Dynamic tests emphasize slowly moving obstacles and lack motion prediction.
- Terrain dynamic feasibility is delegated to the locomotion controller.
- The twin-cylinder model cannot represent large body-pose changes or attached payloads exactly.

## Discussion questions

1. How should lateral motion be planned when body yaw differs from path tangent?
2. Should pitch, roll, and body-height changes enter collision checking?
3. How can geometric feasibility be unified with learned terrain traversability?
4. What guarantees can the local boundary fallback provide in complex dead ends?

## Relevance to our lab

The paper is relevant to autonomous navigation for quadrupeds and wheeled humanoids, 3D perception, and industrial safety planning. Its lightweight whole-body geometry can connect high-level Physical AI route generation with analyzable low-level safety control.

## Possible follow-up ideas

- Jointly optimize position, yaw, and body pose.
- Add dynamic-obstacle prediction and occlusion risk.
- Feed learned traversability and controller capability back into planning.
- Extend to manipulators, payloads, and variable robot geometry.
