

## Color Theory Recommendations and Readability Fixes

### Current Problems
1. **Readability**: Background colors are saturated and mid-lightness (e.g., yellow at 65% lightness, green at 55%), making dark text hard to read against them. The foreground colors are very dark but the vibrant backgrounds reduce contrast.
2. **Vote page green**: Currently hue 145 (teal-green) — you want a more primary/true green.
3. **No accent variety**: Each page is monochromatic — single hue for everything.

### Color Theory Approach

For each page, I recommend a **split-complementary** palette: one dominant color for the background, plus two accent colors positioned ~150° apart on the color wheel from each other. This creates visual interest while staying harmonious.

#### Submissions (Amber/Yellow — hue ~42)
- **Background**: Soften to `42 85% 72%` (lighter, more readable)
- **Foreground**: `30 80% 12%` (warm dark brown — high contrast)
- **Primary**: `38 100% 50%` (keep the amber)
- **Accent 2 (complement)**: `--highlight`: `18 90% 55%` (warm coral/orange) for decorative elements
- **Accent 3 (split-complement)**: `--accent-alt`: `190 70% 45%` (teal) for secondary buttons/tags

#### Vote (True Green — shifting from 145 to ~130)
- **Background**: `130 60% 62%` (true green, lighter for readability)
- **Foreground**: `130 70% 10%` (deep green-black)
- **Primary**: `130 75% 38%` (rich primary green)
- **Accent 2**: `45 85% 55%` (golden yellow — analogous warm)
- **Accent 3**: `270 50% 55%` (soft purple — complement)

#### Follow (Blue — hue ~210)
- **Background**: `205 80% 65%` (softer sky blue, better readability)
- **Foreground**: `215 70% 10%` (deep navy)
- **Primary**: `210 90% 50%` (vibrant blue)
- **Accent 2**: `170 60% 45%` (teal/cyan — analogous)
- **Accent 3**: `30 80% 55%` (warm peach/orange — complement)

#### Settings (Red — hue ~0)
- **Background**: `0 70% 67%` (softer coral-red, more readable)
- **Foreground**: `0 60% 10%` (deep burgundy)
- **Primary**: `0 80% 52%` (rich red)
- **Accent 2**: `330 65% 55%` (magenta/pink — analogous)
- **Accent 3**: `175 55% 45%` (teal — complement)

### Implementation Plan

1. **Fix readability across all themes**: Increase background lightness by ~5-8%, darken foreground to ensure WCAG AA contrast ratio. Also ensure `--muted-foreground` is dark enough.

2. **Add new CSS variables** for the accent colors: `--accent-secondary` and `--accent-tertiary` in each theme, plus matching Tailwind config entries.

3. **Shift vote page** from hue 145 to ~130 for a truer green.

4. **Update Index.tsx** page themes with all corrected values and new accent variables.

5. **Apply accent colors** subtly in each page — e.g., vote yes/no buttons can use accent-secondary, tags or badges can use accent-tertiary, to bring visual variety without overwhelming.

### Files to Change
- `src/pages/Index.tsx` — all four theme objects (readability fixes + new accents + green shift)
- `src/index.css` — add `--accent-secondary` and `--accent-tertiary` defaults
- `tailwind.config.ts` — register new color tokens
- Page components (SubmissionsPage, VotePage, FollowPage, SettingsPage) — sprinkle accent colors on secondary UI elements

