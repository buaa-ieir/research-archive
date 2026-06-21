---
title: "5G Network Architecture and Configuration Choices to Support Teleoperated Driving at Scale"
date: "2026-06-16"
presenter: "Yifan Wei"
presenter_slug: "yifan-wei"
language: "en"
cover_image: "/reviews/2026-06-16-5G-Teleoperated-Driving-EN/cover.png"
paper_title: "5G Network Architecture and Configuration Choices to Support Teleoperated Driving at Scale"
authors:
  - "M.C. Lucas-Estañ"
  - "B. Coll-Perales"
  - "M. I. Khan"
  - "J. Gozalvez"
  - "S. S. Avedisov"
  - "O. Altintas"
  - "M. Sepulcre"
venue: "IEEE VTC2024-Fall / arXiv postprint"
year: 2024
paper_url: "https://arxiv.org/abs/2606.17654"
doi: "10.1109/VTC2024-Fall63153.2024.10758026"
tags:
  - "teleoperated driving"
  - "5G"
  - "MEC"
  - "V2X"
  - "network latency"
summary: "The study quantifies how 5G architecture, duplexing mode, and TDD configuration affect teleoperated-driving scalability, showing that MEC/edge architectures are better suited than centralized networks for multi-vehicle video uplink and low-latency control."
---
## One-sentence summary

This paper studies teleoperated driving from the network-infrastructure side, showing that scalable remote driving requires edge/MEC deployment and uplink-friendly 5G configurations, not simply a generic 5G connection.

![5G network architectures](/reviews/2026-06-16-5G-Teleoperated-Driving-EN/fig1-network-architectures.png)

*Figure 1. The paper compares centralized ToD control with several MEC-based 5G architectures.*

## Problem addressed

Teleoperated Driving (ToD) requires vehicles to upload multiple video feeds and perception streams to a control center, while driving commands must return with low latency and high reliability. Pilot systems often demonstrate a single vehicle or small controlled deployments, but scalability remains unclear. The paper asks: **can common 5G architectures support multiple simultaneously teleoperated vehicles, and which network choices become bottlenecks?**

The study focuses on the strict remote-control use case and analyzes the 5GAA target density of 10 vehicles per square kilometer.

## Methodology

The authors build a 5G communication-latency model that separates radio, transport-network, core-network, and application-server components. They compare:

- **Centralized architecture**, where the ToD application server is remote and reached through the Internet;
- **MEC-based architectures**, where the ToD service is deployed closer to the vehicle, such as MEC@gNB, MEC@M1, or MEC@CN.

They also vary bandwidth, FDD/TDD, TDD frame structure, uplink/downlink slot allocation, and control-channel configuration.

![Video model and parameters](/reviews/2026-06-16-5G-Teleoperated-Driving-EN/fig2-video-model.png)

*Figure 2. The paper calibrates an H.264 video-frame model using CARLA/KITTI distributions and specifies the 5G RAN parameters.*

## Key results

![Uplink architecture results](/reviews/2026-06-16-5G-Teleoperated-Driving-EN/fig3-ul-architecture-results.png)

*Figure 3. MEC architectures meet ToD uplink requirements more reliably than centralized networks, especially under higher video processing delay and vehicle density.*

The main bottleneck is uplink traffic: vehicles must send multiple video feeds to the control center. Centralized architectures suffer from additional Internet-path latency, while MEC-based designs shorten the path and therefore support more vehicles and higher video-processing delays.

![Bandwidth requirement table](/reviews/2026-06-16-5G-Teleoperated-Driving-EN/fig4-bandwidth-table.png)

*Figure 4. Required bandwidth varies strongly with video processing delay, vehicle density, and architecture.*

Downlink command traffic is small in bandwidth but strict in latency and reliability. The paper shows that centralized architectures can violate high-percentile downlink latency requirements, while MEC-based architectures satisfy them more robustly.

![Duplexing and control-channel configuration](/reviews/2026-06-16-5G-Teleoperated-Driving-EN/fig5-duplexing-results.png)

*Figure 5. TDD frame structure and control-channel configuration significantly affect uplink latency; FDD or more balanced TDD configurations reduce waiting time for uplink resources.*

A key takeaway is that many commercial 5G deployments are downlink-oriented for mobile broadband, whereas ToD is uplink-heavy because of vehicle video streams. More uplink-friendly resource allocation, or FDD/more balanced TDD configurations, can reduce uplink latency and bandwidth requirements.

## Strengths

- Extends teleoperation analysis from interface/control design to network infrastructure;
- clearly separates uplink video and downlink command requirements;
- quantifies architecture, bandwidth, duplexing, and control-channel effects;
- provides actionable engineering guidance: use MEC and uplink-friendly configurations;
- highly relevant to scalable ToD services.

## Weaknesses

- the study is primarily model- and simulation-based;
- video processing delay can vary substantially across implementations;
- the paper focuses on communication, not operator workload or vehicle-control dynamics;
- the highway/single-cell assumptions may not cover dense urban deployments;
- security, slicing, operator heterogeneity, and congestion are not deeply explored.

## Discussion questions

1. Should robot teleoperation systems treat network architecture as part of the control stack?
2. Can semantic compression, event cameras, or VLA-based scene summaries reduce uplink video load?
3. How should MEC placement trade off proximity to vehicles against proximity to human operators?
4. Should control commands and video streams be scheduled separately with different reliability targets?
5. Do surgical or industrial teleoperation settings imply similar 5G/edge design rules?

## Relevance to our lab

If a teleoperation project moves beyond a local network, it will face the same structural issue: video/sensor uplink, control downlink, haptic feedback, and robot-state streams have different latency and reliability requirements. This paper is a useful reminder that teleoperation is not only about controllers and interfaces; it also depends on network architecture and scheduling.

## Possible follow-up ideas

- model communication requirements for robot teleoperation separately for vision, touch, state, and control;
- test edge deployment for glove-to-robot-hand teleoperation latency;
- evaluate semantic compression or keyframe transmission for reducing uplink video load;
- couple network-latency models with shared-autonomy controllers;
- design a 5G/edge benchmark for remote robot operation.
