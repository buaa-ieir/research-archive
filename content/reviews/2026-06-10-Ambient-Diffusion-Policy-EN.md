---
title: "Ambient Diffusion Policy: Learning from Imperfect Robot Data"
date: "2026-06-10"
presenter: "Wei Min"
presenter_slug: "wei-min"
language: "en"
cover_image: "/reviews/2026-06-10-Ambient-Diffusion-Policy-EN/cover.png"
paper_title: "Ambient Diffusion Policy: Imitation Learning from Suboptimal Data in Robotics"
authors:
  - "Adam Wei"
  - "Nicholas Pfaff"
  - "Thomas Cohn"
  - "Arif Kerem Dayı"
  - "Constantinos Daskalakis"
  - "Giannis Daras"
  - "Russ Tedrake"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.12365"
doi: "10.48550/arXiv.2606.12365"
tags:
  - "imitation learning"
  - "diffusion policy"
  - "suboptimal data"
  - "co-training"
  - "Open X-Embodiment"
summary: "Ambient Diffusion Policy makes data quality a function of diffusion time: suboptimal samples are used only at high and low noise levels, allowing the policy to extract useful information without inheriting harmful biases, and outperforming standard co-training across controlled shifts and OXE scaling experiments."
---

## One-sentence summary

Ambient Diffusion Policy asks not whether to use suboptimal robot data, but when to use it during diffusion training, so that the policy can absorb useful global or local structure while avoiding the full bias of the shifted data distribution.

![Training algorithm](/reviews/2026-06-10-Ambient-Diffusion-Policy-EN/fig1-algorithm.png)

*Figure 1. High-quality data is used at all diffusion times, while suboptimal data is used only at selected low- and high-noise intervals.*

## Problem addressed

Robotics increasingly relies on heterogeneous datasets: a small amount of high-quality target data and a much larger amount of lower-quality, out-of-distribution, cross-embodiment, or simulated data. Standard solutions either discard the bad data or co-train on everything with dataset weights. The first wastes potentially useful signal; the second can bias the learned policy toward the wrong distribution. The paper asks whether a diffusion policy can exploit only the helpful parts of suboptimal data instead of inheriting the entire distribution shift.

## Main contributions

- Introduces Ambient Diffusion Policy, which makes suboptimal-data usage depend on diffusion time;
- Shows that robot action data follows a spectral power law, inducing a global-to-local hierarchy in action diffusion;
- Provides theoretical justification based on contraction through noise and locality;
- Demonstrates strong gains on noisy-trajectory, sim-to-real, task-mismatch, and OXE scaling experiments;
- Requires only a small implementation change to the Diffusion Policy data sampler.

## Methodology

Let \(D_p\) be the target dataset and \(D_q\) a much larger but suboptimal dataset. Ambient does not use \(D_q\) uniformly across the diffusion process. Instead, samples from \(D_q\) contribute only at \([0, t_{max})\cup(t_{min}, T]\). At high noise, undesirable local details are masked, so the model can still learn useful global structure. At low noise, locality allows the model to absorb useful local primitives when they align with the target task.

![Spectral hierarchy](/reviews/2026-06-10-Ambient-Diffusion-Policy-EN/fig2-spectral-hierarchy.png)

*Figure 2. The paper interprets diffusion policies as learning global planning at high noise and local motor details at low noise.*

This is a powerful framing because it treats diffusion time as a lens for separating transferable structure from harmful bias.

## Experiments and main results

The controlled experiments already show the benefit clearly. In maze navigation and neural motion planning, Ambient dominates co-training on the success-versus-smoothness trade-off.

![Pareto frontier](/reviews/2026-06-10-Ambient-Diffusion-Policy-EN/fig3-pareto-frontier.png)

*Figure 3. Ambient achieves a better success–smoothness Pareto frontier than standard co-training in controlled settings.*

The task-mismatch block-sorting experiment is particularly insightful: Ambient can learn the useful motion primitives from mismatched data while avoiding the wrong task logic.

![Task mismatch and locality](/reviews/2026-06-10-Ambient-Diffusion-Policy-EN/fig4-locality-task-mismatch.png)

*Figure 4. By choosing the usable diffusion interval carefully, Ambient preserves local manipulation skill without importing incorrect task logic.*

The large-scale OXE experiments are the headline result. When trained with large heterogeneous data mixtures, Ambient outperforms co-training by up to 33% and continues to benefit from more suboptimal data rather than plateauing.

![OXE scaling](/reviews/2026-06-10-Ambient-Diffusion-Policy-EN/fig5-oxe-scaling.png)

*Figure 5. Ambient scales better than data filtering and co-training when large, mixed-quality OXE data is added to training.*

The strongest aspect of the paper is that it offers a mechanism, not just an empirical recipe: it explains why different parts of a shifted dataset are useful at different stages of the denoising process.

## Strengths

- A clean and interpretable way to use imperfect data;
- Strong combination of theory, controlled experiments, and large-scale evaluation;
- Very easy to implement in existing diffusion-policy pipelines;
- Less sensitive than co-training to data weighting choices.

## Limitations

- The method is tightly coupled to diffusion-policy training;
- Estimating or annotating \(t_{min}\) and \(t_{max}\) may still be nontrivial in practice;
- The explanatory story relies heavily on the spectral power law assumption;
- Benefits may shrink when the suboptimal data is wrong at the high-level task level rather than only locally flawed.

## Discussion questions

1. Can \(t_{min}\) and \(t_{max}\) be learned automatically and adapted online?
2. What happens when source and target data come from different action spaces or embodiments?
3. Does a similar stage-wise separation exist in VLA or world-model action policies?
4. How should the method change when observation shift, rather than action suboptimality, is dominant?
5. Can Ambient be combined with uncertainty estimation or active data selection?

## Relation to our lab

This work is directly relevant whenever high-quality task-specific robot data is scarce but related data is abundant. It suggests a more nuanced strategy than simply keeping or discarding auxiliary data: use different data sources at different stages of training. That idea is especially relevant for teleoperation, sim-to-real transfer, and reusing demonstrations across platforms.

## Possible follow-up directions

- Extend the idea to flow matching or autoregressive action models;
- Replace hard intervals with learned continuous diffusion-time weights;
- Model observation corruption and action suboptimality jointly;
- Introduce action semantics or embodiment-aware partitions for cross-robot training;
- Co-train Ambient with an explicit data-quality estimator.
