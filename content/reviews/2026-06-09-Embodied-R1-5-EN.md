---
title: "Embodied-R1.5: Evolving Physical Intelligence via Embodied Foundation Models"
date: "2026-06-09"
presenter: "Haopeng Li"
presenter_slug: "haopeng-li"
language: "en"
cover_image: "/reviews/2026-06-09-Embodied-R1-5-EN/cover.png"
paper_title: "Embodied-R1.5: Evolving Physical Intelligence via Embodied Foundation Models"
authors:
  - "Yifu Yuan"
  - "Yaoting Huang"
  - "Xianze Yao"
  - "Yutong Li"
  - "Shuoheng Zhang"
  - "Linqi Han"
  - "Pengyi Li"
  - "Shuyang Gu"
  - "Yi Ma"
  - "Hongyao Tang"
  - "Han Hu"
  - "Jianye Hao"
venue: "arXiv"
year: 2026
paper_url: "https://arxiv.org/abs/2606.11324"
doi: ""
tags:
  - "embodied foundation model"
  - "VLA"
  - "task planning"
  - "closed-loop control"
  - "robot manipulation"
summary: "Embodied-R1.5 unifies cognition, planning/correction, and pointing/location in a single 8B embodied foundation model, then deploys it in a closed-loop PGC framework for long-horizon robot tasks."
---

## One-sentence summary

Embodied-R1.5 tries to unify embodied cognition, planning/correction, and spatial grounding inside a single embodied foundation model, then turns those abilities into real long-horizon robot behavior with a Planner-Grounder-Corrector loop.

![Embodied-R1.5 performance overview](/reviews/2026-06-09-Embodied-R1-5-EN/fig1-performance-overview.png)

*Figure 1. The paper summarizes performance across embodied VLM benchmarks, downstream manipulation suites, and real-robot demonstrations.*

## Problem addressed

Current embodied systems are often fragmented: one model answers spatial questions, another decomposes tasks, another predicts points or boxes, and a policy finally executes actions. This fragmentation leads to three core issues:

1. **Capability fragmentation**: cognition, planning, correction, and grounding are rarely truly unified;
2. **Multi-task conflict**: long-form reasoning, coordinate prediction, and trajectory-like outputs interfere during joint training;
3. **Weak closed-loop validation**: many systems look good on offline QA-style benchmarks, but it is unclear whether they can monitor and repair their own behavior in long-horizon execution.

The paper asks: **can we build a single embodied foundation model (EFM) that unifies these capabilities and demonstrates them in real closed-loop robot autonomy?**

## Main contribution

The paper contributes:

- **Embodied-R1.5**, an 8B model unifying Cognition & Spatial Reasoning, Planning & Correction, and Pointing & Location;
- a large-scale training system with **15B+ tokens** collected from three automated data-construction pipelines;
- a **Planner-Grounder-Corrector (PGC)** framework where the same model can plan, ground, monitor, and repair long-horizon execution;
- comprehensive evaluation on embodied benchmarks, downstream VLA transfer, and real robots.

## Methodology

![Capability taxonomy and architecture](/reviews/2026-06-09-Embodied-R1-5-EN/fig2-capability-taxonomy.png)

*Figure 2. Embodied-R1.5 serves as the unified EFM and can later be extended into a VLA with a lightweight action head.*

The authors first organize embodied intelligence into three capability families:

- **Cognition & spatial reasoning** for scene understanding, geometry, and semantic/spatial relations;
- **Planning & correction** for task decomposition, next-step planning, process monitoring, and error recovery;
- **Pointing & location** for grounding high-level intent into points, regions, trajectories, and grasp locations.

Training is designed to make these diverse output formats coexist. The paper uses a two-stage recipe: supervised fine-tuning followed by reinforced fine-tuning, plus a multi-task reward design that checks both semantic correctness and structural format compliance.

The most distinctive system contribution is the PGC loop:

![PGC closed-loop framework](/reviews/2026-06-09-Embodied-R1-5-EN/fig3-pgc-framework.png)

*Figure 3. The same Embodied-R1.5 instance is asynchronously invoked as planner, grounder, and corrector.*

- The **Planner** decomposes a long-horizon instruction into sub-tasks;
- the **Grounder** localizes targets, tools, trajectories, and action-relevant spatial signals;
- the **Corrector** continuously inspects execution and triggers re-grounding or replanning after failure.

This is important because the paper moves beyond “the model can answer embodied questions” toward “the model can stay inside the loop while a task is being executed.”

## Benchmarks and experiments

The experiments have three layers:

1. **Embodied VLM evaluation** across 24 benchmarks spanning planning/correction, pointing/location, and cognition/spatial reasoning;
2. **Downstream manipulation transfer** where Embodied-R1.5 is lightly adapted into a VLA and tested on suites such as Google Robot, WidowX, LIBERO, and ManiSkill;
3. **Zero-shot real-robot evaluation** including instruction following, tool affordance, spatial reasoning, articulated-object manipulation, and long-horizon autonomy.

![Zero-shot real-robot demonstrations](/reviews/2026-06-09-Embodied-R1-5-EN/fig4-real-robot-demos.png)

*Figure 4. Zero-shot real-robot evaluation includes pick-and-place, tool affordance, spatial reasoning, cup disassembly, and door opening.*

![Long-horizon closed-loop demonstrations](/reviews/2026-06-09-Embodied-R1-5-EN/fig5-long-horizon-demos.png)

*Figure 5. The PGC framework is further demonstrated on long-horizon tasks such as making milk tea, stacking cups, sweeping garbage, and open-vocabulary shelf picking.*

## Key results

The paper reports several notable outcomes:

- **SOTA on 16 of 24 embodied VLM benchmarks**;
- an average score around **70.4%** on the 21 main accuracy-based benchmarks, ahead of Gemini-Robotics-ER-1.5 and GPT-5.4;
- strong VLA transfer with only small amounts of action data, outperforming strong baselines on four manipulation suites;
- a **65.0% zero-shot average** on RoboTwin2.0, showing that the model’s execution abilities extend beyond single-step tasks;
- diverse real-robot demonstrations, including perturbation recovery, indicating nontrivial closed-loop robustness.

## Strengths

- **Strong unification agenda**: the paper is not just a benchmark gain, but an attempt to define and instantiate a broader EFM recipe;
- **Clear systems perspective**: the PGC loop makes the work more operational than many embodied QA papers;
- **Complete recipe**: model, data pipeline, training strategy, and evaluation kit all appear in one package;
- **Useful bridge to VLA**: the work suggests that upstream embodied reasoning can reduce the amount of downstream action data needed;
- **Real-robot validation is meaningful and varied**.

## Weaknesses

- Actual low-level execution still depends on downstream action heads or skill components, so the system is not yet fully end-to-end;
- the data and compute recipe is extremely large, which may limit reproducibility for smaller labs;
- many demonstrations remain in structured environments rather than fully open-world settings;
- multi-task balancing may become harder as more capabilities are added;
- the evaluation still focuses more on manipulation and embodied perception than on full open-ended autonomy.

## Discussion questions

1. If an EFM already internalizes intent-to-action reasoning, how much action data should a downstream VLA really need?
2. Is it better to unify planner/grounder/corrector inside one model, or keep them as explicit modules for interpretability?
3. How should touch and force sensing be integrated into an EFM-style capability stack?
4. Could the large automatic data pipeline introduce systematic embodied biases?
5. In open-world deployment, should recovery stay inside the same foundation model or be delegated to specialized safety modules?

## Relevance to our lab

This paper is highly relevant to labs working on robot learning, teleoperation, and VLA systems. It suggests that action data are only one part of the story: spatial grounding, task decomposition, and error correction can be trained as reusable upstream embodied abilities. For a lab spanning teleoperation, VLA, and embodiment intelligence, it provides a strong integrative perspective.

## Possible follow-up ideas

- test whether Embodied-R1.5-style upstream supervision improves VLA learning in low-data teleoperation settings;
- integrate tactile or force feedback into the Corrector role of the PGC framework;
- design lab-specific long-horizon tasks such as bimanual coordination, tool use, or human-robot co-working;
- study which capability groups are mutually beneficial and which create optimization conflicts;
- explore lighter-weight EFM variants that are easier to reproduce in academic labs.

