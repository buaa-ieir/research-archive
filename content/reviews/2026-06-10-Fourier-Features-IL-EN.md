---
title: "Fourier Features: Let Point-Cloud Imitation Policies See Fine Geometry"
date: "2026-06-10"
presenter: "Fangyuan Zhang"
presenter_slug: "fangyuan-zhang"
language: "en"
cover_image: "/reviews/2026-06-10-Fourier-Features-IL-EN/cover.png"
paper_title: "Fourier Features Let Agents Learn High Precision Policies with Imitation Learning"
authors:
  - "Balazs Gyenes"
  - "Emiliyan Gospodinov"
  - "Jan Frieling"
  - "Enrico Krohmer"
  - "Nicolas Schreiber"
  - "Xiaogang Jia"
  - "Niklas Freymuth"
  - "Gerhard Neumann"
venue: "ICML"
year: 2026
paper_url: "https://arxiv.org/abs/2606.12334"
doi: "10.48550/arXiv.2606.12334"
tags:
  - "imitation learning"
  - "point clouds"
  - "Fourier features"
  - "diffusion policy"
  - "precision manipulation"
summary: "The paper argues that point-cloud imitation learning is limited by spectral bias against high-frequency geometric details, and shows that adding Fourier feature mappings to Cartesian coordinates consistently improves high-precision manipulation across RoboCasa, ManiSkill3, and real robots."
---

## One-sentence summary

The paper shows that a lightweight Fourier feature mapping at the point-cloud input layer can substantially improve high-precision imitation learning by helping point-cloud encoders capture fine geometric differences that ordinary Cartesian coordinates make difficult to learn.

![Method overview](/reviews/2026-06-10-Fourier-Features-IL-EN/fig1-overview.png)

*Figure 1. The method maps point coordinates into a higher-dimensional Fourier space before feeding them into a point-cloud encoder.*

## Problem addressed

Point-cloud policies should, in principle, be ideal for precise robotic manipulation because they expose 3D geometry directly. In practice, however, their performance is highly inconsistent across tasks. The authors argue that the issue is not only the observation modality, but also the spectral bias of the neural architectures used to process point clouds. Many point-cloud encoders are ultimately built on MLPs operating on slowly varying Cartesian features, which makes them biased toward low-frequency functions. High-precision manipulation, by contrast, often depends on sharp high-frequency decision boundaries: for example, whether a peg should be inserted now or slightly repositioned first.

## Main contributions

- Introduces Fourier feature mappings as a simple front-end for point-cloud imitation learning;
- Evaluates the idea across a broad family of point-cloud encoders rather than a single architecture;
- Demonstrates consistent improvements on RoboCasa, ManiSkill3, and real-world manipulation tasks;
- Provides parameter studies showing robustness to wavelength and augmentation choices;
- Supports the main claim with spectral-sensitivity analysis.

## Methodology

The method replaces raw Cartesian point coordinates with a multi-frequency sinusoidal representation. Intuitively, neighboring points that look almost identical in Euclidean space become easier to distinguish after the Fourier expansion, allowing the downstream network to respond to fine geometric details. Importantly, the proposed change happens at the input representation level and does not require a new policy objective or a new diffusion architecture.

![Encoder family](/reviews/2026-06-10-Fourier-Features-IL-EN/fig2-encoder-family.png)

*Figure 2. Fourier features are tested across multiple PointPatch-style point-cloud encoders, not tied to a single model family.*

## Experiments and main results

The paper evaluates on RoboCasa, ManiSkill3, and four real-world high-precision manipulation tasks.

![Benchmark tasks](/reviews/2026-06-10-Fourier-Features-IL-EN/fig3-benchmark-tasks.png)

*Figure 3. The benchmark suite spans household manipulation, object-centric tasks, and real-robot precision tasks.*

According to the paper, Fourier features improve success rates by as much as 20% on RoboCasa and 7% on ManiSkill3, and raise the normalized score on four real-world tasks from 14.8% to 40.2%. The authors also show a dedicated real-robot setup, which helps demonstrate that the gains are not limited to simulation.

![Real-world setup](/reviews/2026-06-10-Fourier-Features-IL-EN/fig4-real-setup.png)

*Figure 4. The real-world experiments focus on tasks where subtle geometric alignment matters.*

![Main results](/reviews/2026-06-10-Fourier-Features-IL-EN/fig5-main-results.png)

*Figure 5. Adding Fourier features improves mean success rates across multiple 3D encoders on RoboCasa, ManiSkill3, and real tasks.*

What makes the paper compelling is that it does not merely introduce another complicated architecture. Instead, it shows that a small representational change helps many different policies, suggesting a broadly useful design principle for point-cloud imitation learning.

## Strengths

- Extremely simple and easy to integrate into existing pipelines;
- Gains are consistent across tasks, encoders, and benchmarks;
- The paper offers a clear explanatory lens through spectral bias;
- Real-robot validation makes the improvement more convincing.

## Limitations

- The study mainly focuses on point-cloud policies, so conclusions for RGB-only or hybrid 2D/3D systems remain limited;
- The benefit may depend on point-cloud quality and could degrade under severe depth noise or occlusion;
- Real-world evaluation is still small in scale;
- The paper says less about long-horizon reasoning or semantically complex tasks.

## Discussion questions

1. Would the gains shrink once stronger hybrid 2D/3D models are used?
2. Can noisy low-cost depth sensors make high-frequency encodings brittle?
3. Should the Fourier frequencies be learnable or task-adaptive rather than fixed?
4. How should high-frequency geometric detail be combined with long-horizon temporal abstraction?
5. Could similar ideas improve multi-modal policies that also use tactile or force signals?

## Relation to our lab

This paper is highly relevant to robotic manipulation, imitation learning, and representation design. For tasks where performance depends on fine geometric distinctions—such as insertion, alignment, or tool use—it suggests that the bottleneck may lie in input representation rather than only in policy architecture. That lesson is useful for any lab work involving geometry-aware control or sensor-driven robot policies.

## Possible follow-up directions

- Test Fourier features in vision–touch–point-cloud multi-modal policies;
- Learn the frequency bands instead of fixing them by hand;
- Evaluate whether the same effect persists in larger VLA or world-model frameworks;
- Combine the method with contact-state estimation or tactile priors;
- Study whether task-dependent “frequency needs” can be used for automatic hyperparameter tuning.
