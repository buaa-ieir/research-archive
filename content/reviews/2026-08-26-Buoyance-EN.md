---
title: "Buoyancé: Reeling Helium-Inflated Balloons with Mobile Robots on the Ground for Mid-Air Tangible Display, Interaction, and Assembly"
date: "2026-08-26"
presenter: "Haopeng Li"
presenter_slug: "haopeng-li"
language: "en"
cover_image: "/reviews/2026-08-26-Buoyance-EN/cover.png"
paper_title: "Buoyancé: Reeling Helium-Inflated Balloons with Mobile Robots on the Ground for Mid-Air Tangible Display, Interaction, and Assembly"
authors:
  - "Alan Pham"
  - "Yuxiao Li"
  - "Miyu Fukuoka"
  - "Ken Nakagaki"
venue: "UIST ’25"
year: 2025
paper_url: "https://doi.org/10.1145/3746059.3747768"
doi: "10.1145/3746059.3747768"
tags:
  - "human-robot interaction"
  - "multi-robot systems"
  - "tangible UI"
  - "embodied interaction"
  - "mid-air display"
summary: "Buoyancé combines omnidirectional ground robots, reeling mechanisms, and helium-inflated balloons to create room-scale 3D tangible displays, interactions, and reconfigurable mid-air assemblies while keeping actuation hardware on the ground."
---

## One-sentence summary

Buoyancé turns tethered helium balloons into controllable room-scale tangible interfaces by using ground robots to reel and reposition them, avoiding many of the noise, safety, and endurance drawbacks of drone-based mid-air interfaces.

![Buoyancé design space](/reviews/2026-08-26-Buoyance-EN/fig1-design-space.png)

*Figure 1. The design space spans balloon configurations, ReelBot arrangements, interaction modalities, and application classes.*

## Problem addressed

Spatial tangible interfaces aim to make digital information occupy real 3D space. Existing mid-air systems commonly rely on drones, ceiling rigs, magnetic levitation, or acoustic levitation. Drones are mobile but noisy, energy intensive, and difficult to touch safely, while ceiling-based systems require substantial infrastructure. The paper asks whether helium buoyancy can provide passive lift while ground robots provide active tethering and horizontal positioning.

## Main contributions

- Introduces the Buoyancé architecture based on helium-inflated balloons, strings, and mobile reeling robots;
- develops a broad design space over balloon/robot counts, degrees of freedom, accessories, interaction, and applications;
- implements a closed-loop prototype with omnidirectional robots and optical tracking;
- supports GUI, string-tangible, direct-tangible, and nearby-gesture control;
- evaluates system motion and assembly performance and conducts a 12-participant user study.

## System design

![System implementation](/reviews/2026-08-26-Buoyance-EN/fig2-system-overview.png)

*Figure 2. The prototype integrates motion tracking, host-side control, omnidirectional bases, stepper-driven reels, and helium balloons.*

A basic unit contains a balloon, one or more strings, and one or more ReelBots. A single tethered unit provides 3D translation; additional tethers can provide orientation control. Because buoyancy continuously supports the object, the robots mainly spend energy on locomotion and reeling rather than hovering.

![Interaction modes](/reviews/2026-08-26-Buoyance-EN/fig3-interaction-modes.png)

*Figure 3. The system builds three embodied hand-control modes around familiar grasp-and-release interaction with balloons and strings.*

The HCI contribution is especially interesting: the balloon is not merely a passive display element. The interaction design deliberately reuses the everyday affordance of holding and guiding a tethered balloon.

## Evaluation and applications

Technical evaluation covers ReelBot motion/reeling behavior and assembly/disassembly capability. The application demonstrations include 3D information display, room reconfiguration and telepresence, and mid-air constructive assembly.

![Application examples](/reviews/2026-08-26-Buoyance-EN/fig4-applications.png)

*Figure 4. Multiple HIBs visualize 3D curves, terrain, and data, and can carry devices such as lights or cameras.*

The user study involves 12 participants performing spatial targeting with three interaction methods and rating comfort, intuitiveness, and enjoyment. The results suggest that different methods are preferable at different heights and interaction distances rather than one modality universally dominating.

![User-study results](/reviews/2026-08-26-Buoyance-EN/fig5-user-study.png)

*Figure 5. The study compares the three control modes across subjective interaction measures.*

## Strengths

- Clever physical design that uses buoyancy to reduce active hovering cost;
- safer and quieter for close interaction than rotor-based systems;
- broad design-space contribution rather than a single demonstration;
- interaction design is grounded in familiar embodied affordances;
- supports display, interaction, room reconfiguration, and assembly.

## Limitations

- Requires balloons, tethers, and external tracking infrastructure in the current prototype;
- strings introduce entanglement, collision, and reachability constraints;
- ground-robot velocity limits the responsiveness of the aerial object;
- coordination complexity grows quickly with more balloons and robots;
- evaluation is still centered on controlled indoor environments.

## Discussion questions

1. Can the system work without external motion capture using onboard sensing only?
2. How should multi-robot planning explicitly model tether topology and entanglement risk?
3. Can the softness and low inertia of balloons support physical collaboration beyond UI interaction?
4. What useful payloads can be carried without sacrificing controllability?
5. Which application domains genuinely favor this architecture over drones or ceiling rigs?

## Relevance to our lab

Buoyancé is a useful example of embodied system design: intelligence comes not only from control software but also from morphology, passive physics, and interaction affordances. For work in physical AI, teleoperation, and HRI, it highlights how mechanical design can simplify the control problem before learning is introduced.

## Possible follow-up ideas

- Replace motion capture with onboard visual/depth localization;
- incorporate tether constraints into multi-robot trajectory planning;
- explore higher-payload or variable-stiffness buoyant bodies;
- use the system for telepresence and mixed-reality physical agents;
- learn user intent for proactive spatial reconfiguration.
