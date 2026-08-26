---
title: "Multimodal Soft Gripper: Fusing Touch and Vision for Fruit Picking"
date: "2026-08-26"
presenter: "Xintian Cui"
presenter_slug: "xintian-cui"
language: "en"
cover_image: "/reviews/2026-08-26-Multimodal-Soft-Gripper-Fruit-Picking-EN/cover.png"
paper_title: "Sensor fusion of touch & vision in soft manipulators for fruit picking"
authors:
  - "Anand Kumar Mishra"
  - "Aravind Ramaswami"
  - "Vikram Shree"
  - "Mehmet Mert Ilman"
  - "Khoi D. Ly"
  - "Marvin P. Pritts"
  - "Robert F. Shepherd"
venue: "Nature Communications"
year: 2026
paper_url: "https://doi.org/10.1038/s41467-026-70588-9"
doi: "10.1038/s41467-026-70588-9"
tags:
  - "soft robotics"
  - "tactile sensing"
  - "vision sensing"
  - "fruit picking"
  - "multimodal fusion"
summary: "The paper presents a five-finger soft gripper with integrated vision, tactile, and curvature sensing for estimating fruit color, shape, size, firmness, and grasp state during non-destructive harvesting."
---
## One-sentence summary

This work turns a soft gripper into a compact multimodal sensing platform: stretchable optical fibers in the fingers provide tactile and curvature sensing, while a palm-mounted camera and distance sensor support close-range visual inspection for adaptive fruit harvesting.

![Multifunctional gripper overview](/reviews/2026-08-26-Multimodal-Soft-Gripper-Fruit-Picking-EN/fig1-multifunctional-overview.png)

*Figure 1. The gripper integrates soft actuation, vision, tactile sensing, curvature sensing, and a rotational harvesting module.*

## Problem addressed

Fruit-picking robots must inspect accurately and manipulate gently. Vision-only systems are sensitive to occlusion, lighting, and inconsistent color changes during ripening. Touch-only inspection is slower and can damage delicate fruit. Many existing systems use rigid grippers or single-modality sensors, making it difficult to jointly reason about color, size, shape, firmness, and grasp stability. The paper asks whether all of these sensing functions can be integrated into one compact soft end effector.

## Main contributions

- Designs a five-finger pneumatic soft gripper with a workspace expansion from about 200 mm² to 14,000 mm²;
- embeds stretchable optical fibers in each finger for tactile and curvature sensing;
- integrates a palm camera and distance sensor for close-range color, shape, and size estimation;
- reports 100% shape classification accuracy and size measurement error below 1.8% using HSV hue-based vision;
- demonstrates real-time strawberry picking with multimodal ripeness and grasp-state assessment.

## Methodology

![Vision analysis](/reviews/2026-08-26-Multimodal-Soft-Gripper-Fruit-Picking-EN/fig2-vision-analysis.png)

*Figure 2. The palm camera performs close-range color segmentation, shape classification, and size measurement.*

The sensing roles are complementary. Vision estimates target color, shape, and size before or during contact. Tactile sensing checks object firmness and contact state. Curvature sensing estimates finger bending, load changes, and slip risk. Together, the sensors form a compact perception layer that is physically co-located with the gripper.

![Curvature sensing](/reviews/2026-08-26-Multimodal-Soft-Gripper-Fruit-Picking-EN/fig3-curvature-sensing.png)

*Figure 3. Optical curvature sensors estimate bending, load variation, and slipping through light-intensity loss.*

![Tactile sensing](/reviews/2026-08-26-Multimodal-Soft-Gripper-Fruit-Picking-EN/fig4-tactile-sensing.png)

*Figure 4. The U-shaped optical tactile sensors distinguish rigid materials, soft materials, and strawberries.*

## Experiments and results

The paper validates the system from component-level characterization to integrated harvesting. Each finger bends up to about 240°. The gripper actuates within 2 seconds at 80 kPa, exerts up to 6 N of pulling force, and lifts objects up to 1 kg. The tactile sensors distinguish material stiffness through optical power loss, while curvature sensors detect bending, payload differences, and slip events.

![Real-time strawberry picking](/reviews/2026-08-26-Multimodal-Soft-Gripper-Fruit-Picking-EN/fig5-real-time-harvesting.png)

*Figure 5. The integrated system demonstrates strawberry detection, grasping, rotational harvesting, and release.*

## Strengths

- Highly integrated sensing without relying on bulky external perception;
- soft mechanics reduce bruising risk;
- vision, touch, and curvature provide complementary information;
- evaluation spans sensor characterization, mechanical performance, and real harvesting;
- useful for both precision agriculture and general soft manipulation.

## Limitations

- Real harvesting is mainly demonstrated in greenhouse strawberry settings;
- the control logic is still largely rule-based rather than learned end-to-end;
- multi-sensor wiring and embedded electronics increase maintenance complexity;
- dense foliage, outdoor lighting, and difficult stem geometries may require stronger perception and planning.

## Discussion questions

1. Can the multimodal signals directly train a learned harvesting policy?
2. Can optical tactile/curvature sensing scale to more dexterous soft hands?
3. How robust is the sensing package under outdoor light, rain, dust, and long-term wear?
4. Should ripeness estimation, force control, and picking trajectory optimization be learned jointly?
5. Can this gripper provide useful data for VLA or imitation-learning systems?

## Relation to our lab

The paper is relevant to tactile sensing, multimodal perception, soft manipulation, and agricultural robotics. It highlights that reliable real-world manipulation of soft and damage-prone objects requires co-design of sensing and actuation, not just stronger visual models or larger policies.

## Possible follow-up directions

- use the gripper’s multimodal signals for imitation or reinforcement learning;
- build a multimodal dataset for soft robotic harvesting;
- model touch-vision ripeness estimation across fruit types;
- add closed-loop slip and grip-force control;
- adapt the design to general deformable-object manipulation.
