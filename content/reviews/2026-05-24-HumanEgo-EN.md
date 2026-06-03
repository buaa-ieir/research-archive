---
title: "HumanEgo: Zero-Shot Robot Learning from Minutes of Human Egocentric Videos"
date: "2026-05-24"
presenter: "Raye Liu"
presenter_slug: "zipei-liu"
language: "en"
cover_image: "/reviews/2026-05-24-HumanEgo-EN/cover.png"
paper_title: "HumanEgo: Zero-Shot Robot Learning from Minutes of Human Egocentric Videos"
authors:
  - "Zhi (Leo) Wang"
  - "Botao He"
  - "Kelin Yu"
  - "Seungjae Lee"
  - "Ruohan Gao"
  - "Furong Huang"
  - "Yiannis Aloimonos"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2605.24934"
doi: ""
tags:
  - "human-to-robot transfer"
  - "egocentric video"
  - "zero-shot learning"
  - "flow matching"
  - "robot manipulation"
summary: "HumanEgo learns robot manipulation policies from minutes of human egocentric video by converting hand-object interactions into embodiment-agnostic visual and spatial representations and training a flow-matching policy with dense auxiliary objectives."
---

## One-sentence summary

HumanEgo shows that robot manipulation policies can be learned zero-shot from short human egocentric videos by converting demonstrations into interaction-centric representations and training a flow-matching policy with dense auxiliary supervision.

![HumanEgo overview](/reviews/2026-05-24-HumanEgo-EN/fig1-overview.png)

*Figure 1. HumanEgo learns from human egocentric video and transfers the learned policy to robots without task-specific robot demonstrations.*

## Problem addressed

Large robot manipulation models usually require many robot demonstrations, which are expensive and slow to collect. Human egocentric video is cheaper and easier to gather, but it is difficult to transfer directly to robots because humans and robots differ in both appearance and kinematics. Existing approaches either still require robot data, rely on large-scale pretraining, or abstract away too much of the interaction signal.

The central problem is to learn deployable robot policies from only minutes of human video, without robot demonstrations or internet-scale pretraining.

## Main contribution

HumanEgo proposes a robot-data-free and hardware-agnostic framework for zero-shot human-to-robot transfer.

The main contributions are:

- an embodiment-agnostic visual preprocessing pipeline using arm inpainting, virtual gripper rendering, and object keypoint visualization;
- Interaction-Centric Tokens (ICT), an entity-level representation encoding relative 6-DoF hand-object relations;
- a flow-matching policy for fast multimodal bimanual action generation;
- dense auxiliary objectives for object motion, 2D trace prediction, and latent consistency;
- strong real-world results from only 15–30 minutes of human egocentric videos per task.

## Methodology

HumanEgo uses Aria glasses to collect egocentric human demonstrations. The raw video is transformed into two complementary observations: an RGB observation and a spatial observation.

![System overview](/reviews/2026-05-24-HumanEgo-EN/fig2-system-overview.png)

*Figure 2. HumanEgo combines visual preprocessing, Interaction-Centric Tokens, and a flow-matching policy with dense auxiliary objectives.*

For the visual observation, the system segments and removes the human arm using SAM2 and LaMa inpainting, then renders a virtual gripper and tracked object keypoints into the frame. This reduces the visual embodiment gap without requiring image-to-image translation into robot-specific scenes.

For the spatial observation, HumanEgo tracks hands and objects, estimates their 6-DoF poses, and encodes every entity as an Interaction-Centric Token. Each token includes the entity type, the entity pose in a shared reference frame, the left and right hand poses expressed in the entity frame, and a grasp state. This entity-relative formulation is designed to be invariant to viewpoint, embodiment, and environment.

The policy itself is trained with conditional flow matching. Instead of predicting a single deterministic action, it learns a generative velocity field that maps Gaussian noise to future bimanual action trajectories. Three auxiliary losses provide dense supervision from each demonstration: future object motion, future 2D trajectories, and future latent ICT state.

## Key results

The paper reports strong data efficiency. With 30 minutes of human video per task, HumanEgo achieves 92.5% average success across four real-world tasks; with 15 minutes, it still reaches 75% average success.

![Data efficiency and evaluation](/reviews/2026-05-24-HumanEgo-EN/fig3-data-efficiency.png)

*Figure 3. HumanEgo scales effectively with limited human video and compares favorably against robot teleoperation baselines.*

The framework is evaluated on tasks including serving bread, downstacking cups, watering flowers, and adjusting a table. The results emphasize that HumanEgo performs especially well on tasks requiring precise spatial reasoning and multi-step coordination.

![Qualitative examples](/reviews/2026-05-24-HumanEgo-EN/fig4-qualitative-examples.png)

*Figure 4. Qualitative examples show deployment on several real-world manipulation tasks.*

Ablation studies show that the explicit spatial representation is central. Visual preprocessing alone improves performance only modestly, while adding ICT produces a large success-rate jump. Auxiliary objectives also improve performance, especially under low-data conditions.

![Representation and auxiliary objective ablations](/reviews/2026-05-24-HumanEgo-EN/fig5-representation-ablation.png)

*Figure 5. Representation and auxiliary-objective ablations indicate that interaction-centric spatial tokens and dense auxiliary losses are major contributors to performance.*

The paper also reports robustness to changes in robots, camera configurations, lighting, backgrounds, and object instances.

![Robustness analysis](/reviews/2026-05-24-HumanEgo-EN/fig6-robustness-transfer.png)

*Figure 6. Additional robustness and transfer analysis across variations in setup and embodiment.*

## Strengths

- The paper directly addresses the cost bottleneck of robot demonstration collection.
- The interaction-centric representation is conceptually strong: manipulation is defined by hand-object relations, not by hands or objects alone.
- The framework combines visual abstraction with explicit 3D spatial structure, avoiding overreliance on either pixels or sparse keypoints.
- Flow matching provides a natural way to model multimodal action distributions with faster inference than many diffusion-style approaches.
- The evaluation is broad and includes comparisons to multiple baselines, data-efficiency curves, and ablation studies.

## Weaknesses

- The pipeline chains many perception modules, so errors from segmentation, tracking, object detection, and pose estimation may cascade.
- The method depends strongly on high-quality egocentric hand tracking from Aria-MPS; monocular substitutes perform worse.
- Real-time in-hand manipulation and fast dynamic object motion remain challenging because object tracking is not fully solved.
- The few-shot regime appears to plateau at fine precision, suggesting that reinforcement learning or additional interaction data may still be required for sub-centimeter tasks.
- Although robot-data-free training is appealing, the deployment still depends on substantial engineering in perception and calibration.

## Discussion questions

1. Is ICT sufficient for contact-rich manipulation where force, compliance, or tactile state matters?
2. How robust is the pipeline when object detection or hand tracking fails for several consecutive frames?
3. Could tactile or force signals be integrated into the interaction-centric representation?
4. Does flow matching remain efficient for longer-horizon tasks with many possible strategies?
5. What is the minimum perception quality required for reliable zero-shot transfer?

## Relevance to our lab

HumanEgo is relevant to teleoperation and robot learning because it treats human demonstration data as a scalable alternative to direct robot teleoperation. For a lab working on haptic teleoperation, this paper raises an important question: which parts of human manipulation should be transferred as geometry, and which parts require physical feedback such as force, texture, temperature, or slip? The interaction-centric token idea could also inspire compact state representations for human-robot teleoperation logs.

## Possible follow-up ideas

- Add tactile or force-derived tokens to ICT for contact-rich manipulation.
- Compare egocentric-video learning with haptic teleoperation demonstrations under equal collection time.
- Use HumanEgo-style entity-relative representations for robot-side sensor fusion.
- Study whether haptic feedback helps humans generate cleaner demonstrations for HumanEgo-like pipelines.
- Replace chained perception modules with a jointly trained perception frontend.
