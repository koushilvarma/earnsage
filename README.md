# Earn Sage: AI Powered Insurance for Gig Workers

## The Vision
Earn Sage provides an automated, Our goal is to safeguard gig workers against income loss caused by external disruptions such as extreme weather or environmental conditions.

**Core Constraint Adherence:** We strictly exclude coverage for health, life, accidents, or vehicle repairs, focusing solely on providing a safety net for lost wages.

---

## Target Persona & Scenarios
* **Persona:** Food and QCommerce Delivery Partners (e.g., Zomato, Swiggy, Zepto).
* **Scenario:** External disruptions such as extreme weather, pollution, and natural disasters can reduce working hours, causing workers to lose 20-30% of their monthly earnings. For example, a delivery partner relies on peak evening hours to make their daily income. A sudden, severe localized flood halts deliveries in their sector. With Earn Sage, the weather anomaly is detected automatically, and a proportional wage loss payout is triggered instantly to their account, compensating for the inability to work outdoors.

---

## Application Workflow
Our platform operates on a zero touch, highly automated lifecycle designed specifically for the fast paced nature of gig work.

![Earn Sage Application Workflow](./docs/Diagram.jpg)

1. **Optimized Onboarding:** The delivery partner registers via our platform, linking their primary gig worker ID, primary delivery zones, and payment details.
2. **AI Risk Assessment & Policy Generation:** Upon registration, our AI engine utilizes predictive risk modeling specific to the persona to evaluate historical delivery zones and generate a customized risk profile.
3. **Real Time Parametric Monitoring:** Once the weekly policy is active, our backend continuously monitors real time triggers using third party APIs (weather, traffic, air quality) mapped against the worker's active geographical zone.
4. **Automated Claim & Instant Payout:** If API data confirms an external disruption threshold has been breached, the system initiates an automatic claim for the identified disruption. It then processes an instant payout for the lost income.
5. **Intelligent Analytics Dashboard:** An analytics dashboard displays relevant metrics, showing workers their protected earnings and active coverage.

---

## Weekly Premium Model & Triggers

### 1. Weekly Pricing Structure
Our financial model is structured on a Weekly pricing basis to match the typical payout cycle of a gig worker.

### 2. AI Driven Dynamic Pricing
We utilize machine learning to dynamically calculate premiums based on hyper local and temporal risk factors, adjusting the Weekly premium based on the specific delivery zone's history and predictive weather modeling.

### 3. Parametric Triggers (Loss of Income Only)
Our system relies on objective, external data to trigger payouts.
* **Environmental:** Triggered when APIs report extreme heat, heavy rain, floods, or severe pollution that halt deliveries.
* **Social:** Triggered by real time mapping APIs indicating unplanned curfews, local strikes, or sudden market closures that result in the inability to access pickup/drop locations.

---

## Platform Justification (Web vs. Mobile)
We have chosen to build a Progressive Web App (PWA). Gig workers are constantly on their mobile devices, but device storage and app fatigue are significant barriers. A mobile optimized web application ensures instant accessibility, low overhead, and a seamless UI/UX without requiring heavy app store downloads, allowing for rapid onboarding.

---

## AI & ML Integration Plan
* **Predictive Risk Modeling:** Analyzing historical API data to accurately price weekly premiums based on upcoming localized threats.
* **Intelligent Fraud Detection:** Implementing intelligent fraud detection mechanisms, including anomaly detection in claims, location and activity validation, and duplicate claim prevention.

---

## Tech Stack & Architecture
* **Frontend:** Next.js, Tailwind CSS
* **Backend:** NestJS
* **Database:** MongoDB
* **External Integrations:** Weather APIs (OpenWeatherMap), Traffic APIs (Google Maps), and simulated payment systems/APIs

---

## Development Plan

### Phase 2 (Automation & Protection   Weeks 3-4)
Focus on building the Next.js frontend onboarding flow, setting up the NestJS backend and MongoDB schemas, developing the dynamic premium calculation engine, and connecting 3-5 automated triggers using public/mock APIs to identify disruptions.

### Phase 3 (Scale & Optimise   Weeks 5-6)
Implement advanced fraud detection to catch delivery specific fraud, integrate simulated instant payout systems, and finalize the intelligent dashboard for workers and insurers.

---

## Submission Links
* **Demo Video:**
