---
title: "DexTwist: Dexterous Hand Retargeting for Twist Motion via Mixed Reality-based Teleoperation"
date: "2026-05-12"
presenter: "Raye Liu"
presenter_slug: "zipei-liu"
language: "en"
cover_image: "/reviews/2026-05-12-DexTwist-EN/cover.png"
paper_title: "DexTwist: Dexterous Hand Retargeting for Twist Motion via Mixed Reality-based Teleoperation"
authors:
  - "Dongmyoung Lee"
  - "Chengxi Li"
  - "Dongheui Lee"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2605.12182"
doi: ""
tags:
  - "dexterous teleoperation"
  - "hand retargeting"
  - "mixed reality"
  - "twist manipulation"
  - "robot hands"
summary: "DexTwist reframes dexterous hand retargeting for rotational manipulation as functional twist preservation rather than pose imitation, improving turning progress and screw-axis stability in MR-based teleoperation."
---

## One-sentence summary

DexTwist is a Mixed-Reality dexterous teleoperation framework that detects a human tripod pinch, estimates the intended screw axis and accumulated twist, and refines robot hand commands so that the robot preserves the turning function rather than merely imitating hand pose.

![DexTwist overview](/reviews/2026-05-12-DexTwist-EN/fig1-overview.png)

*Figure 1. DexTwist targets contact-rich rotational manipulation such as screw, cap, and key turning, where direct hand-pose retargeting can fail under human–robot embodiment mismatch.*

## Problem addressed

Dexterous teleoperation systems often retarget human hand motion by minimizing differences in joint angles, fingertip positions, or task-space vectors. This works reasonably well in free-space imitation, but it can break down during contact-rich twist manipulation. For tasks such as cap opening, key turning, or bolt screwing, task success depends on maintaining a stable screw axis, transmitting torque, and preserving fingertip contacts. Under human–robot morphology mismatch, direct pose imitation may produce tangential fingertip sliding instead of stable object rotation.

The central problem is therefore not merely how to match human hand geometry, but how to preserve a manipulation function: accumulated rotation about a stable axis.

## Main contribution

The paper contributes a functional twist-retargeting framework for MR-based dexterous teleoperation.

The main contributions are:

- a Mixed-Reality teleoperation pipeline using headset hand tracking and visual feedback;
- a tripod-pinch detector that activates twist-specific control only when the operator forms a thumb–index–middle pinch;
- an estimate of the operator's screw axis and accumulated twist magnitude in the palm frame;
- a real-time residual joint-space refinement for the Allegro Hand;
- a virtual-object objective that tracks turning progress while regularizing tripod closure, screw-axis consistency, and tripod centroid stability;
- simulation and real-world evaluation against vector-based retargeting.

## Methodology

DexTwist uses the human palm frame as the local reference frame for interpreting hand motion. The MR headset provides hand joint positions and wrist pose; the system constructs the palm coordinate frame from wrist and knuckle landmarks and maps the human hand pose into the robot workspace.

![Teleoperation interface](/reviews/2026-05-12-DexTwist-EN/fig2-teleoperation-interface.png)

*Figure 2. The system uses MR-based hand tracking and visual feedback; the palm frame provides a stable reference for interpreting tripod pinch and twist motion.*

When a sustained tripod pinch is detected, DexTwist defines the human screw axis as the normal of the triangle formed by the thumb, index, and middle fingertips. The direction is stabilized using the palm normal and temporal consistency to avoid sign flips. The system then accumulates a scalar twist angle over the active pinch interval, supporting ratcheting behavior across re-grasps.

On the robot side, an analogous tripod tool frame is defined from the robot fingertips. The robot turning progress is computed relative to a latched reference frame. Rather than replacing the nominal retargeting system, DexTwist applies residual refinement initialized from vector retargeting. At each control cycle, it optimizes a joint-space objective with terms for:

- matching the intended turning angle;
- preserving fingertip closure distances;
- maintaining screw-axis consistency;
- stabilizing the tripod centroid to reduce translational drift.

This design makes the method modular: the baseline retargeter supplies a plausible hand configuration, while DexTwist corrects the parts that matter for rotational task execution.

## Experimental setup

The physical setup uses an Apple Vision Pro headset, a Franka Emika FR3 arm, and an Allegro Hand. The operator controls the hand and wrist through headset tracking, while camera feedback is streamed into the MR interface for monitoring.

![Experiment setup](/reviews/2026-05-12-DexTwist-EN/fig3-experiment-setup.png)

*Figure 3. Real-world hardware setup with an MR headset, Franka arm, and Allegro Hand.*

The main baseline is vector retargeting, which minimizes discrepancies between palm-to-fingertip and fingertip-to-fingertip vectors. This is a reasonable baseline because it preserves hand geometry, but it does not explicitly encode the functional goal of stable twisting.

## Key results

In simulation, DexTwist improves both angle tracking and axis stability. The reported simulation results show lower turning-angle error and reduced screw-axis deviation compared with vector retargeting: RMSE decreases from 27.7° to 18.8°, MAE decreases from 23.3° to 15.6°, and axis deviation decreases from 13.6° to 6.1°.

![Turning-angle tracking](/reviews/2026-05-12-DexTwist-EN/fig4-turning-angle-tracking.png)

*Figure 4. Real-world turning-angle tracking compares object rotation measured by an ArUco marker, estimated human intent, vector retargeting, and DexTwist.*

In real-world demonstrations, DexTwist is applied to cap screwing and key unlocking. The qualitative results show that the framework can preserve turning progress across re-grasps while maintaining a more stable rotation axis.

![Real-world demonstrations](/reviews/2026-05-12-DexTwist-EN/fig5-real-world-demonstrations.png)

*Figure 5. Representative real-world demonstrations for cap screwing and key unlocking.*

## Strengths

- The paper correctly identifies a limitation of pose-level retargeting: geometric similarity does not guarantee task-level functional success.
- The method is lightweight and online, relying on residual refinement rather than task-specific policy learning.
- The tripod-based twist representation is simple, interpretable, and well matched to many screw-like manipulation tasks.
- The objective terms directly correspond to failure modes: axis drift, grip opening, and translational slip.
- The evaluation includes both simulation metrics and real hardware demonstrations.

## Weaknesses

- The method is specialized to tripod-pinch twisting and does not yet cover power grasps, cylindrical grasps, two-finger twisting, or tool-mediated rotations.
- The approach depends on visual hand tracking, so severe occlusion or tracking noise can bias twist intent estimation.
- Real-world evaluation is limited in scale and uses a small number of trials and tasks.
- The method does not incorporate tactile feedback, which would be important for detecting slip, contact loss, or torque transmission quality.
- The method estimates functional intent from hand motion but does not explicitly model object dynamics or contact forces.

## Discussion questions

1. How general is the tripod-pinch screw-axis representation across different object sizes and required torque levels?
2. Could tactile sensors improve robustness when visual hand tracking becomes unreliable during occlusion?
3. Should twist retargeting be integrated with object pose estimation rather than inferred only from fingertip geometry?
4. Can this residual-refinement formulation be extended to other manipulation primitives such as pulling, levering, or inserting?
5. What would a fairer large-scale benchmark for contact-rich retargeting look like?

## Relevance to our lab

This paper is highly relevant to work on dexterous teleoperation, hand retargeting, and closed-loop manipulation. It is especially useful because it shifts the design target from visual or kinematic imitation to functional task preservation. For haptic teleoperation research, this paper suggests that feedback and retargeting should be organized around task-level physical quantities such as twist angle, contact stability, and slip, not only around joint-space similarity.

## Possible follow-up ideas

- Extend the residual objective with tactile slip detection or force closure metrics.
- Compare tripod-only twist retargeting against grasp-dependent representations for larger objects.
- Add object pose tracking to directly optimize object rotation instead of inferred fingertip twist.
- Study whether haptic feedback improves the operator's ability to produce stable tripod twists.
- Build a benchmark of contact-rich rotational tasks with standardized metrics for turn angle, axis drift, and re-grasp stability.
