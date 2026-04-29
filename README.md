# beats
Modern landing page application built with Next.js.

## Landing Page

The landing page is the main entry view of the application and is designed to present
the product with a clean visual hierarchy, motion effects, and a clear call to action.

### Current Highlights

- Hero section with strong headline and supporting text
- Animated background for visual depth
- Reveal-based section transitions for smoother scrolling experience
- Responsive layout for desktop and mobile screens

### File Locations

- Main page: `app/page.tsx`
- Global layout: `app/layout.tsx`
- Styles: `app/globals.css`

### Customize the Landing Page

1. Update copy and section structure in `app/page.tsx`
2. Adjust spacing, colors, and typography in `app/globals.css`
3. Tune motion behavior in `components/reveal.tsx`
4. Modify background visual effects in `components/particle-background.tsx`

## Commit Timeline Generator

The repository also includes a reusable commit timeline generator script for creating
date-based commit activity with realistic timing and message variation.

### Current Highlights

- Reusable date range support via `START_DATE` and `END_DATE`
- Monthly commit volume in fixed mode or min/max random range
- Weekly natural spread with randomized working hours
- Optional weekend support and max commits per day limit
- Unique, human-like commit messages with style selection
- Dry-run mode and optional push control for safer execution
- Uses `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE`
- Creates commits with `git commit --allow-empty`

### File Locations

- Script: `generate-date-commits.sh`

### Customize the Commit Timeline

1. Set date range using `START_DATE` and `END_DATE`
2. Choose fixed monthly activity with `COMMITS_PER_MONTH=8`
3. Or randomize monthly activity using `COMMITS_PER_MONTH_MIN` and `COMMITS_PER_MONTH_MAX`
4. Tune schedule with `WORK_HOUR_START`, `WORK_HOUR_END`, and `MAX_COMMITS_PER_DAY`
5. Choose message style using `MESSAGE_STYLE=natural` or `MESSAGE_STYLE=conventional`
6. Preview safely with `DRY_RUN=1` before running a real generation
7. Control pushing behavior with `PUSH_ENABLED=0|1`, `REMOTE_NAME`, and `REMOTE_BRANCH`

### Example Commands

1. Preview only:
   `DRY_RUN=1 START_DATE=2021-01-01 END_DATE=2026-04-10 COMMITS_PER_MONTH=8 ./generate-date-commits.sh`
2. Real run with randomized monthly activity:
   `START_DATE=2021-01-01 END_DATE=2026-04-10 COMMITS_PER_MONTH_MIN=6 COMMITS_PER_MONTH_MAX=10 ./generate-date-commits.sh`

### Troubleshooting

1. macOS note: the script is compatible with the default `/bin/bash` (Bash 3), so no Bash upgrade is required.
2. Always run a preview first with `DRY_RUN=1` to verify dates, volume, and commit message style.
3. To avoid pushing while testing, use `PUSH_ENABLED=0` and review the local history before a final run.
