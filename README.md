# Meridian — Retail Pricing & Causal Workbench

An interactive, static decision-support demo for retail pricing, promotion measurement, and rollout planning. It is designed for principal data scientists, pricing and merchandising teams, finance partners, experiment owners, and rollout operators.

> **Demo boundary:** All figures and records are synthetic. This demo has no retailer data connection, backend, authentication, or production model. Scenario outputs are illustrative forecasts, not causal impact. The rollout screen contains example experimental results.

## What you can explore

- **Pricing performance:** Compare current-policy baselines with modeled proposed-policy outcomes for units, net sales, gross profit, and margin.
- **Elasticity studio:** Inspect own-price response, uncertainty, coverage, and directional cross-item substitution examples.
- **Scenario simulator:** Change the discount and inspect how unit lift, sales, gross profit, margin, and the decision memo update.
- **Experiment design:** Review store-level randomization, allocation, power assumptions, MDE, duration, guardrails, and launch checks.
- **Rollout control:** Inspect staged exposure, rollback guardrails, and an illustrative intent-to-treat readout.
- **Audit trail:** Review analysis inputs, model version, scenario configuration, and a reproducible decision history.

## Metric definitions

- **Baseline:** Expected outcome under the current policy for the same population and time window.
- **Scenario estimate:** A model-based projection under changed assumptions. It does not isolate a causal effect.
- **Incremental impact:** Treatment outcome minus the counterfactual outcome under the current policy. This should only be described as causal when supported by a valid experimental or defensible quasi-experimental design.
- **Net sales:** Sales after discounts and returns, as defined by the retailer's governed metric contract.
- **Gross profit:** Net sales less cost of goods and other explicitly agreed variable costs.

Revenue lift is not treated as profit lift. The scenario model currently assumes constant own-price elasticity, no cross-item substitution, fixed unit cost, and a stable assortment. The displayed uncertainty interval is illustrative. The experiment planning panel is a template and requires historical variance inputs before use.

## Run locally

Requirements: Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Create a production static export with:

```bash
npm run build
```

The static site is written to `out/`.

## GitHub Pages

1. Create a public GitHub repository named `retail-pricing-workbench` and push this project to its `main` branch.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. The included workflow builds the static export and deploys it when `main` is updated.

The project base path is set to `/retail-pricing-workbench` for the repository URL. Change `basePath` in `next.config.ts` if the repository has a different name. For a user or organization site repository (`<owner>.github.io`), set it to an empty string.

The Pages bundle is public static content. Do not place credentials, personal information, private data, API keys, or proprietary model weights in the repository or exported site. A future governed production deployment should use a separately hosted backend with access controls, data contracts, monitoring, and model validation.

## Data dictionary for a future governed connection

| Entity            | Example fields                                                            | Checks to surface                                                  |
| ----------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Product           | `sku_id`, `category_id`, `unit_cost`, `active_from`, `active_to`          | Hierarchy validity, duplicate SKUs, cost freshness                 |
| Store / market    | `store_id`, `market_id`, `channel`, `timezone`                            | Store mapping, market coverage, closed locations                   |
| Price / promotion | `regular_price`, `realized_price`, `discount`, `promo_id`, `effective_at` | Price floor/ceiling, overlapping offers, currency/unit consistency |
| Sales / returns   | `units`, `gross_sales`, `net_sales`, `returns`, `variable_cost`           | Reconciliation, returns timing, negative or missing values         |
| Inventory         | `on_hand`, `in_stock_flag`, `stockout_hours`                              | Availability coverage, stockout censoring, inventory lag           |
| Experiment        | `assignment`, `eligible`, `exposed`, `arm`, `assigned_at`                 | Assignment integrity, treatment leakage, eligibility balance       |
| Context           | `holiday`, `competitor_price`, approved segment attributes                | Source, lawful use, freshness, missingness and coverage            |

Every real data source should document an owner, definition, grain, units, update cadence, lineage, quality status, and approved use. Missing or delayed data must be visible; it must not be silently imputed.

## Architecture and next implementation layer

This version is a static front end suitable for GitHub Pages. It performs only illustrative browser-side calculations and downloads a local decision memo. It has no API or persistent database.

For a production system, add separately deployed services for governed data access, scenario/model execution, experiment assignment and analysis, approvals, and audit storage. Keep credentials and private datasets server-side. Define role-based access, metric contracts, versioned model artifacts, reproducibility, and rollback ownership before connecting live pricing decisions.

## License

MIT. See [LICENSE](LICENSE).
