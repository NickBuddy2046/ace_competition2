# Requirements Document

## Introduction

ACE Championship (ACE明星大亂鬥) is an official trading competition website for the ACE Fortune platform. The site serves as the central hub for the June 2026 competition, featuring a real-time leaderboard, character-based sub-rankings, symbol performance tracking, a countdown timer, and official competition rules. The competition runs June 1–June 30, 2026 with a $100,000 prize pool and no entry fee.

The application is a single-page React + TypeScript + Vite app styled with Tailwind CSS, animated with motion/react, and deployed as a static frontend.

---

## Glossary

- **App**: The ACE Championship single-page web application
- **Navbar**: The fixed top navigation bar
- **Hero**: The full-viewport header/landing section
- **Leaderboard**: The monthly total ranking section (月總排名)
- **RankingItem**: A data record representing one ranked participant, containing rank, EA ID, amount, percentage, and rank-change direction
- **EnergyBar**: The animated progress bar overlaid on the leaderboard background image
- **SymbolItem**: A data record representing a trading symbol and its relative performance percentage
- **CharacterItem**: A data record representing one of the seven competition characters with a name and image
- **More Results**: The character-based sub-ranking section showing per-character leaderboards
- **Rules**: The official competition rules section (官方比賽細則)
- **Countdown_Timer**: The live countdown clock showing time remaining until competition end
- **Elapsed_Timer**: The live clock showing time elapsed since competition start
- **AnimatedNumber**: A component that smoothly animates numeric value transitions
- **Character_Selector**: The UI control for switching between character-based leaderboards
- **Symbol_Progress**: The segmented bar chart showing relative trading symbol performance
- **Prize_Pool**: The total prize amount of $100,000 USD
- **EA_ID**: The unique identifier string for a competition participant

---

## Requirements

### Requirement 1: Navigation Bar

**User Story:** As a visitor, I want a persistent navigation bar, so that I can jump to any section of the page at any time.

#### Acceptance Criteria

1. THE Navbar SHALL remain fixed at the top of the viewport during scrolling.
2. THE Navbar SHALL display the ACE Fortune logo on the left side.
3. WHEN a navigation link is clicked, THE App SHALL smooth-scroll to the corresponding section.
4. THE Navbar SHALL display links for Home, Leaderboard, More Results, and 官方比賽細則.
5. THE Navbar SHALL display Facebook and Instagram icon links on the right side.
6. WHEN the logo is clicked, THE App SHALL scroll to the top of the page.

---

### Requirement 2: Hero / Home Section

**User Story:** As a visitor, I want a visually impactful landing section, so that I immediately understand the competition theme and branding.

#### Acceptance Criteria

1. THE Hero SHALL occupy the full viewport height on initial load.
2. THE Hero SHALL display the competition background image as a full-width, top-aligned background.
3. THE App SHALL render the Hero section with the HTML id `home` for anchor navigation.

---

### Requirement 3: Competition Metadata Display

**User Story:** As a competitor, I want to see the prize pool and competition dates at a glance, so that I know the stakes and schedule.

#### Acceptance Criteria

1. THE Leaderboard section SHALL display the Prize_Pool amount of $100,000 USD.
2. THE Leaderboard section SHALL display the competition date range as "June 01 – June 30, 2026".
3. THE Leaderboard section SHALL display a "No Entry Fee" indicator.
4. THE Leaderboard section SHALL display a "REAL-TIME LEADERBOARD" live indicator with an animated pulse dot.

---

### Requirement 4: Countdown and Elapsed Timers

**User Story:** As a competitor, I want to see how much time is left and how much has elapsed, so that I can gauge competition progress.

#### Acceptance Criteria

1. THE Countdown_Timer SHALL display the remaining time until June 30, 2026 23:59:59 in days, hours, minutes, and seconds.
2. THE Elapsed_Timer SHALL display the time elapsed since June 1, 2026 00:00:00 in days, hours, minutes, and seconds.
3. WHEN the competition end date has passed, THE Countdown_Timer SHALL display 00:00:00:00.
4. THE App SHALL update both timers every 1 second.
5. THE App SHALL format each timer unit as a zero-padded two-digit string.

---

### Requirement 5: Monthly Total Leaderboard (月總排名)

**User Story:** As a visitor, I want to see the live monthly total ranking, so that I can track which participants are leading the competition.

#### Acceptance Criteria

1. THE Leaderboard SHALL display the top 10 RankingItems sorted by amount descending.
2. THE Leaderboard SHALL overlay EnergyBars and text on the leaderboard background image using absolute positioning.
3. WHEN a RankingItem's amount changes, THE AnimatedNumber SHALL animate the displayed value from the previous amount to the new amount over 1000ms using an ease-out curve.
4. WHEN a participant's rank improves, THE EnergyBar SHALL display an upward green indicator arrow.
5. WHEN a participant's rank worsens, THE EnergyBar SHALL display a downward red indicator arrow.
6. THE Leaderboard SHALL update RankingItem amounts and re-sort rankings every 3500ms to simulate live data.
7. THE EnergyBar fill width SHALL be proportional to the RankingItem's percentage value relative to the maximum amount.
8. THE Leaderboard SHALL display each participant's EA_ID and formatted dollar amount alongside the EnergyBar.
9. THE EnergyBar layout SHALL be responsive, scaling bar dimensions proportionally to the container width.

---

### Requirement 6: Character-Based Sub-Rankings (More Results)

**User Story:** As a visitor, I want to filter rankings by character, so that I can see how participants using a specific character are performing.

#### Acceptance Criteria

1. THE More Results section SHALL display a Character_Selector showing all seven characters: KIRIN, PHOENIX, COBRA, LOTTO, BUBO, FALCON, PYTHON.
2. THE Character_Selector SHALL display each character's image alongside its name.
3. WHEN a character is selected, THE App SHALL display the top 10 RankingItems for that character.
4. THE App SHALL update character RankingItem amounts every 2000ms to simulate live trading activity.
5. WHEN a character is selected, THE App SHALL generate a stable initial ranking seeded from the character's name.
6. WHEN a participant's rank changes within a character leaderboard, THE RankingRow SHALL display the updated rank-change indicator.
7. THE More Results section SHALL display each RankingItem with rank number, EA_ID, EnergyBar, and formatted dollar amount.

---

### Requirement 7: Symbol Performance Tracker

**User Story:** As a visitor, I want to see which trading symbols are most active, so that I can understand where competition activity is concentrated.

#### Acceptance Criteria

1. THE App SHALL display a Symbol_Progress bar for each of the tracked trading symbols: BTCUSD, XAUUSD, ETHUSD, SOLUSD, USDCAD, GBPNZD, TRUMP, EURSGD, GBPAUD, and Other.
2. THE Symbol_Progress SHALL render as a segmented bar with 20 equal segments, where active segments are green and inactive segments are grey.
3. THE App SHALL display the symbol name and percentage value alongside each Symbol_Progress bar.
4. THE App SHALL update symbol percentages every 5000ms with a random fluctuation of ±2.5 percentage points.
5. WHEN symbol data updates, THE App SHALL re-sort symbols by percentage descending.
6. WHEN the symbol section first renders, THE App SHALL animate bars from 0% to their initial values within 100ms.

---

### Requirement 8: Official Competition Rules (官方比賽細則)

**User Story:** As a competitor, I want to read the official competition rules, so that I understand eligibility, scoring, and prize distribution.

#### Acceptance Criteria

1. THE Rules section SHALL be accessible via the "官方比賽細則" navigation link.
2. THE Rules section SHALL display competition eligibility criteria.
3. THE Rules section SHALL display the scoring and ranking methodology.
4. THE Rules section SHALL display the prize distribution breakdown for the $100,000 Prize_Pool.
5. THE Rules section SHALL display the competition period (June 1 – June 30, 2026).
6. THE Rules section SHALL display disqualification conditions.
7. THE Rules section SHALL display contact or dispute resolution information.

---

### Requirement 9: Visual Design and Animation

**User Story:** As a visitor, I want a visually polished, dark-themed experience, so that the site feels premium and matches the ACE brand.

#### Acceptance Criteria

1. THE App SHALL use a dark background (black base) with gold/yellow accent colors consistent with the ACE brand.
2. THE App SHALL use the competition background image (`ACE _Website_Final_r02a_BG.png`) as the page background, positioned at the top.
3. THE App SHALL use motion/react to animate section entries with fade and slide transitions.
4. THE EnergyBar SHALL display an animated sweep highlight effect over the fill area.
5. THE App SHALL display section titles with a gradient text effect from white to slate.
6. THE App SHALL display a gold horizontal rule divider beneath each section title.
7. WHERE a character image is displayed in the Character_Selector, THE App SHALL highlight the selected character with a distinct visual indicator.

---

### Requirement 10: Responsive Layout

**User Story:** As a visitor on any device, I want the layout to adapt to my screen size, so that the site is usable on both desktop and mobile.

#### Acceptance Criteria

1. THE Navbar SHALL hide text navigation links on screens narrower than the `md` Tailwind breakpoint and remain functional via scroll.
2. THE Leaderboard overlay elements SHALL scale proportionally using a container-width-relative unit (cw) derived from a ResizeObserver.
3. THE App SHALL use Tailwind CSS responsive prefixes (`md:`, `lg:`) to adjust font sizes, spacing, and layout at appropriate breakpoints.
4. THE Prize_Pool display SHALL stack vertically on small screens and display horizontally on medium and larger screens.
