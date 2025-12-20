# BTC/USDT IB Breakout Analysis Dashboard 📊

This project is a React-based data visualization dashboard that analyzes **BTC/USDT 5-minute candle data** (Jan 2025 - Present) to identify high-probability trading setups based on the **Initial Balance (IB)** concept.

🔗 **Live Demo**: [https://Nutopia13.github.io/BTC-USDT-2025-IB/](https://Nutopia13.github.io/BTC-USDT-2025-IB/)

## 🧠 Key Logic
The analysis breaks down the trading day into sessions relative to the NY open (09:30 IB).
-   **IB Breakout**: Defined as a candle closing above/below the high/low of the previous session.
-   **Structure**: Analyzes the relationship between the first 30m range (IB1) and the second 30m range (IB2).

## 🚀 Features

### 1. Time Analysis (Breakouts)
-   Visualizes breakout probabilities for every 30-minute session from 07:30 to 15:00.
-   **Key Insight**: Peak breakout probability occurs between **14:00 - 15:00**.

### 2. Risk Management (Reversals)
-   Identifies zones with high "fake-out" (reversal) potential.
-   **High Risk Zone**: **07:30 - 08:30** often sees false moves.
-   **Safe Zone**: **14:30+** favors trend continuation.

### 3. Market Structure
-   Compares **IB1** (First 30m) vs **IB2** (Second 30m).
-   **IB1 > IB2**: Contraction / Inside Bar dynamics.
-   **IB1 < IB2**: Expansion / Trend initiation dynamics.

### 4. Cross-Analysis
-   A conditional probability matrix combining **Time of Day** × **Market Structure**.
-   Helps filter trade bias based on how the morning session evolved.

### 5. Timezone Selection
-   Toggle seamlessly between **New York**, **Kiev**, and **Warsaw** timezones.

## 🛠️ Tech Stack
-   **Framework**: React 18 + Vite
-   **Styling**: Tailwind CSS + Shadcn UI (Bento Grid layout)
-   **Charts**: Recharts
-   **Routing**: Wouter

