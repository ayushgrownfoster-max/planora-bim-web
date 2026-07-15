# Planora BIM Tech Design System Rules & Tokens

This document summarizes the design system rules, design tokens, color palette, and layout metadata for the **Planora BIM Tech Interface** project, as retrieved from Stitch.

---

## 1. Brand & Style Guide

- **Core Theme:** Precision and technical rigor of architectural engineering.
- **Aesthetic:** Modern, minimalist with a high-tech edge (mimicking a high-fidelity blueprint).
- **Target Audience:** Architects, engineers, and BIM managers who require high-density, highly legible information environments.
- **Key Concepts:** Structured whitespace, clean lines, and geometric structural integrity.

---

## 2. Color Palette

### Primary & Brand Colors
- **Electric Sky Blue (`#0A84FF`) / Primary (`#005AB3`):** Reserved strictly for primary actions, progress indicators, active states in BIM models.
- **Slate Charcoal Gray (`#5A5D64` / `#5B5E65`):** Used for secondary typography and structural components (headers, icons, sidebar labels).
- **Accent (Tertiary):** `#9A4100` (used for warning/accent status).

### Neutrals & Surfaces
- **Background:** `#F9F9FF` (soft light background to prevent eye strain).
- **Surface (Base Level 0):** `#FFFFFF` (pure white).
- **Surface Tonal Layers:**
  - **Dim:** `#D7DAE4`
  - **Low:** `#F1F3FE`
  - **Standard (Container):** `#EBEDF8`
  - **High:** `#E5E8F2`
  - **Highest:** `#E0E2ED`
- **Borders & Outlines:**
  - **Outline:** `#717786`
  - **Outline Variant:** `#C0C6D6`

---

## 3. Typography

- **Primary Font Family:** `Hanken Grotesk` (contemporary geometry, professional clarity)
- **Monospace Font Family:** `JetBrains Mono` (labels, coordinates, metadata)

### Typography Scale

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **display-lg** | Hanken Grotesk | 48px | 700 (Bold) | 56px | -0.02em |
| **headline-lg** | Hanken Grotesk | 32px | 600 (Semi-Bold) | 40px | -0.01em |
| **headline-lg-mobile** | Hanken Grotesk | 24px | 600 (Semi-Bold) | 32px | - |
| **headline-md** | Hanken Grotesk | 24px | 600 (Semi-Bold) | 32px | - |
| **body-lg** | Hanken Grotesk | 18px | 400 (Regular) | 28px | - |
| **body-md** | Hanken Grotesk | 16px | 400 (Regular) | 24px | - |
| **label-sm** | JetBrains Mono | 12px | 500 (Medium) | 16px | 0.05em (All Caps) |
| **code-md** | JetBrains Mono | 14px | 400 (Regular) | 20px | - |

---

## 4. Spacing & Grid System

- **Baseline Grid:** 4px unit spacing scale.
- **Standard Spacing Tokens:**
  - `xs`: 4px
  - `sm`: 8px
  - `md`: 16px (standard grouping spacing)
  - `lg`: 24px (distinct section separation spacing)
  - `xl`: 40px

### Desktop Layout
- **Max Container Width:** 1440px
- **Gutter:** 24px
- **Columns:** 12-column grid.
- **Layout Zones:**
  - **Utility Bar:** Fixed left bar (64px width).
  - **Properties Panel:** Collapsible right panel (320px width).
  - **Viewport:** Fluid central viewport for digital twin/model visualization.

### Mobile Layout
- **Gutter / Margins:** 16px side margins.
- **Reflow:** Single-column layout flow; complex tables use horizontal scrolling or card reflows.

---

## 5. Shape Language & Roundness

The design relies on **strict geometric lines** and minimal softness to maintain a professional look:

- **sm (`0.125rem` / 2px):** Small elements.
- **DEFAULT (`0.25rem` / 4px):** Buttons, inputs, and small UI components.
- **md (`0.375rem` / 6px):** Medium components.
- **lg (`0.5rem` / 8px):** Large cards and modal windows.
- **xl (`0.75rem` / 12px):** Very large containers.
- **full (`9999px`):** Status dots, pills, or user avatars.

---

## 6. Elevation & Depth

To match the blueprint theme, avoid heavy drop shadows:

- **Level 0 (Base):** `#FFFFFF`
- **Level 1 (Cards/Panels):** White surface with a 1px border (`#E2E4E6` or `#C0C6D6`).
- **Level 2 (Popovers/Modals):** White surface with a crisp 1px border and a low-opacity neutral shadow:
  - `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)`
- **Interaction Hover:** Subtle gray fill overlay (`#F8F9FA`) instead of increasing shadow size.

---

## 7. Component Rules

- **Buttons:** Solid Electric Sky Blue with white text, 4px corner radius. Secondary buttons use a Slate Charcoal outline. Flat look, no gradients.
- **Input Fields:** Rectangular with a 1px border. Focus highlights the border in Electric Sky Blue (`#0A84FF`) and adds a 1px inner glow.
- **Chips/Tags:** Rectangular, using JetBrains Mono, with light gray background (`#F1F3F5`) and dark gray text.
- **Data Tables:** Minimalist, no vertical dividers, thin horizontal lines (`#E2E4E6`). Header row uses a light gray background.
- **Cards:** Pure white, 1px border, no drop shadows. Title sections separated by horizontal rules.
