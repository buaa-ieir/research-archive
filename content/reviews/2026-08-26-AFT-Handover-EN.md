---
title: "AFT-Handover: Task-Oriented Human-Robot Handovers on Legged Manipulators"
date: "2026-08-26"
presenter: "Yifan Wei"
presenter_slug: "yifan-wei"
language: "en"
cover_image: "/reviews/2026-08-26-AFT-Handover-EN/cover.png"
paper_title: "Task-Oriented Robot-Human Handovers on Legged Manipulators"
authors:
  - "Andreea Tulbure"
  - "Carmen Scheidemann"
  - "Elias Steiner"
  - "Marco Hutter"
venue: "HRI ’26"
year: 2026
paper_url: "https://doi.org/10.1145/3757279.3785629"
doi: "10.1145/3757279.3785629"
tags:
  - "human-robot handover"
  - "legged manipulation"
  - "LLM reasoning"
  - "affordance transfer"
  - "mobile manipulation"
summary: "AFT-Handover combines LLM-driven task-affordance reasoning with texture-based 3D affordance transfer so robots can hand objects over in orientations that support the human’s intended post-handover use."
---
## One-sentence summary

AFT-Handover moves beyond merely transferring an object safely: it uses LLM-based functional reasoning and texture-based 3D affordance transfer to hand objects over in a way that lets the human immediately perform the intended task.

![AFT-Handover pipeline](/reviews/2026-08-26-AFT-Handover-EN/fig1-aft-pipeline.png)

*Figure 1. The pipeline combines object segmentation, LLM part reasoning, affordance transfer, grasp generation, and grasp selection.*

## Problem addressed

Human handovers are task-oriented. A spoon for stirring should expose the handle; a hammer for hammering should leave the handle available and the head usable. Most robot handover systems focus on safe object transfer or object-specific affordances, limiting generalization to new task-object pairs. The paper asks how a robot can infer where the human should grasp and where the robot should grasp under zero-shot task-oriented conditions, including deployment on a legged mobile manipulator.

## Main contributions

- Introduces **AFT-Handover**, combining LLM commonsense reasoning with 3D texture-based affordance transfer;
- retrieves a proxy exemplar from a compact task-object database;
- uses LLM reasoning to establish part-level correspondences across objects;
- represents affordances as continuous scalar textures on object surfaces;
- validates on task-object benchmarks, a Franka Panda user study, and an ANYmal-based legged manipulator.

## Methodology

Given a novel object-task pair, the system first selects a functionally similar proxy object. An LLM maps functional parts between the proxy and target object, such as blade-to-shaft or handle-to-handle. A point-to-point transfer network then propagates affordance textures from the proxy to the target point cloud. The resulting human and robot grasp regions guide grasp generation and selection.

![Benchmark results](/reviews/2026-08-26-AFT-Handover-EN/fig2-benchmark-results.png)

*Figure 2. AFT-Handover improves task-oriented grasp selection across conventional and unconventional object-task pairs.*

## Experiments and results

The paper evaluates the method at three levels. In benchmark comparisons, AFT-Handover reaches 83% average success with GPT-4o and 86% with GPT-5. With ground-truth affordances, the upper bound rises to 95%, indicating that most residual errors come from LLM reasoning failures in unconventional tool use.

![User study](/reviews/2026-08-26-AFT-Handover-EN/fig3-user-study.png)

*Figure 3. The user study compares AFT-Handover and LLM-Handover in preference, regrasping, and perceived task understanding.*

In the user study with 14 participants, AFT-Handover significantly reduces regrasping and is generally preferred over the baseline. Finally, the system is integrated on an ANYmal base with a 6-DoF arm, executing the full sequence from object pickup to human detection and task-oriented handover.

![Legged robot execution](/reviews/2026-08-26-AFT-Handover-EN/fig4-legged-execution.png)

*Figure 4. The legged manipulator receives the task, grasps the object, approaches the human, detects the hand, and executes the handover.*

## Evidence quality and academic assessment

AFT-Handover is evaluated progressively from module-level transfer to human-facing system deployment. Task-conditioned reasoning alone improves robot-grasp suitability by about **15–20%**. The full method reaches about **83% average success with GPT-4o** and **86% with GPT-5** over the tested object-task pairs. When ground-truth affordances remove LLM reasoning errors, performance rises to roughly **95%**, which is an informative upper-bound experiment: it separates semantic/part-matching failures from the geometric transfer mechanism itself.

The human-subject evidence is also comparatively strong. Fourteen participants compare AFT-Handover against LLM-Handover in a paired study. AFT-Handover significantly reduces regrasping (Wilcoxon p=0.027; McNemar p=0.035), is preferred on significantly more object-task pairs (p=0.015), and is selected overall by **71.43%** of participants. The paper then demonstrates five task-oriented handovers on an ANYmal-based legged manipulator. The boundary of the evidence is important: the legged evaluation is primarily qualitative, hand detection is single-shot rather than continuously reactive, and unconventional tool use can still cause LLM part-matching errors. Thus, “zero-shot generalization” is convincing for conventional functional semantics but remains brittle for atypical object use.

## Strengths

- Realistic problem framing: handover quality depends on what the human will do next;
- clean separation between semantic reasoning and geometric affordance transfer;
- handles cross-category functional similarities better than object-specific affordance labels;
- includes both user study and mobile robot deployment;
- relevant to assistive robots, service robots, and field mobile manipulation.

## Limitations

- Unconventional tasks remain vulnerable to LLM functional-reasoning errors;
- the current handover is not fully reactive to human hand motion;
- mobile deployment suffers from arm tracking error, motion blur, and limited grasp candidates;
- object internal state, such as liquid in a cup, is not modeled.

## Discussion questions

1. Should task-oriented handover explicitly learn individual user preferences?
2. What extra context is needed for LLMs to reason about unconventional tool use?
3. Can affordance transfer be combined with dense VLM grounding?
4. How should compute be allocated for real-time closed-loop handover on legged robots?
5. What is the best metric for handover quality: regrasp count, task speed, comfort, or success?

## Relation to our lab

This paper is relevant to human-robot collaboration, mobile manipulation, task affordance, and language-guided reasoning. It emphasizes that grasp stability alone is insufficient: the robot must deliver the object in a state that supports the human’s next action.

## Possible follow-up directions

- add real-time hand tracking and reactive handover alignment;
- learn user-specific handover preferences from feedback;
- incorporate post-handover scene context;
- test on more mobile platforms and unstructured environments;
- combine the framework with VLA or multimodal foundation models.
