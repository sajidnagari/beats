#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# generate-date-commits.sh
#
# Creates empty commits across a date range with realistic weekly distribution,
# then pushes to origin/master with strong logging and verification.
#
# Compatible with macOS/Linux (Bash + Python3).
# -----------------------------------------------------------------------------

set -euo pipefail

# ----------------------------- Configuration ----------------------------------
START_DATE="${START_DATE:-2018-02-01}"   # inclusive, YYYY-MM-DD
END_DATE="${END_DATE:-2020-12-31}"       # inclusive, YYYY-MM-DD
MIN_COMMITS_PER_MONTH="${MIN_COMMITS_PER_MONTH:-9}"
MAX_COMMITS_PER_MONTH="${MAX_COMMITS_PER_MONTH:-11}"
SEED="${SEED:-}"                         # optional deterministic seed
REMOTE="${REMOTE:-origin}"
TARGET_BRANCH="master"
# -----------------------------------------------------------------------------

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

fail() {
  printf '[%s] ERROR: %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

require_cmd git
require_cmd python3

log "Validating repository state..."
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Current directory is not a Git repository."

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
log "Current branch: $CURRENT_BRANCH"
if [[ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]]; then
  fail "Branch must be '$TARGET_BRANCH'. Current branch is '$CURRENT_BRANCH'."
fi

if [[ "$REMOTE" != "origin" ]]; then
  fail "This script is configured to push to 'origin/master'. Set REMOTE=origin."
fi
git remote get-url "$REMOTE" >/dev/null 2>&1 || fail "Remote '$REMOTE' is not configured."
REMOTE_FETCH_URL="$(git remote get-url "$REMOTE")"
REMOTE_PUSH_URL="$(git remote get-url --push "$REMOTE")"
log "Remote '$REMOTE' fetch URL: $REMOTE_FETCH_URL"
log "Remote '$REMOTE' push URL:  $REMOTE_PUSH_URL"

SCHEDULE_FILE="$(mktemp)"
cleanup() {
  rm -f "$SCHEDULE_FILE"
}
trap cleanup EXIT

log "Building commit schedule from $START_DATE to $END_DATE..."
python3 - "$START_DATE" "$END_DATE" "$MIN_COMMITS_PER_MONTH" "$MAX_COMMITS_PER_MONTH" "$SEED" > "$SCHEDULE_FILE" <<'PY'
import sys
import random
from datetime import date, datetime, timedelta

start_date = datetime.strptime(sys.argv[1], "%Y-%m-%d").date()
end_date = datetime.strptime(sys.argv[2], "%Y-%m-%d").date()
min_per_month = int(sys.argv[3])
max_per_month = int(sys.argv[4])
seed = sys.argv[5].strip()

if seed:
    random.seed(seed)

if start_date > end_date:
    raise SystemExit("START_DATE must be <= END_DATE")

def month_start(d):
    return date(d.year, d.month, 1)

def month_end(d):
    if d.month == 12:
        return date(d.year, 12, 31)
    return date(d.year, d.month + 1, 1) - timedelta(days=1)

def iter_months(start, end):
    cur = month_start(start)
    while cur <= end:
        yield cur.year, cur.month
        if cur.month == 12:
            cur = date(cur.year + 1, 1, 1)
        else:
            cur = date(cur.year, cur.month + 1, 1)

def business_days_in_week(week_start, lo, hi):
    out = []
    for i in range(7):
        d = week_start + timedelta(days=i)
        if lo <= d <= hi and d.weekday() < 5:
            out.append(d)
    return out

def weighted_commits_for_week(low, high, preferred=2):
    choices = list(range(low, high + 1))
    weights = []
    for n in choices:
        dist = abs(n - preferred)
        weights.append({0: 8, 1: 4, 2: 2}.get(dist, 1))
    return random.choices(choices, weights=weights, k=1)[0]

verbs = [
    "Refactor", "Improve", "Add", "Update", "Harden", "Optimize", "Document",
    "Simplify", "Adjust", "Fix", "Enhance", "Stabilize", "Clean up", "Tune"
]
subjects = [
    "authentication flow", "build pipeline", "error handling", "API integration",
    "UI components", "logging behavior", "test coverage", "deployment config",
    "state management", "performance checks", "data validation", "CI workflow",
    "cache strategy", "developer tooling"
]
reasons = [
    "for reliability", "for maintainability", "for clarity", "for consistency",
    "to reduce edge cases", "to improve traceability", "to support new scenarios",
    "to streamline development", "to improve diagnostics", "to tighten security"
]

all_commits = []
msg_counter = 1

for y, m in iter_months(start_date, end_date):
    month_first = date(y, m, 1)
    month_last = month_end(month_first)
    lo = max(month_first, start_date)
    hi = min(month_last, end_date)
    if lo > hi:
        continue

    target = random.randint(min_per_month, max_per_month)

    first_monday = lo - timedelta(days=lo.weekday())
    weeks = []
    w = first_monday
    while w <= hi:
        bdays = business_days_in_week(w, lo, hi)
        if bdays:
            weeks.append(bdays)
        w += timedelta(days=7)

    selected_days = []
    remaining = target

    for i, week_days in enumerate(weeks):
        weeks_left = len(weeks) - i
        max_this_week = min(3, len(week_days))
        min_now = max(0, remaining - 3 * (weeks_left - 1))
        max_now = min(max_this_week, remaining)
        if max_now < min_now:
            n = max_now
        else:
            n = weighted_commits_for_week(min_now, max_now, preferred=2)
        if n > 0:
            selected_days.extend(random.sample(week_days, n))
            remaining -= n

    if remaining > 0:
        all_bdays = []
        d = lo
        while d <= hi:
            if d.weekday() < 5:
                all_bdays.append(d)
            d += timedelta(days=1)
        for _ in range(remaining):
            selected_days.append(random.choice(all_bdays))

    month_datetimes = []
    for d in selected_days:
        hour = random.randint(9, 17)
        minute = random.randint(0, 59)
        second = random.randint(0, 59)
        month_datetimes.append(datetime(d.year, d.month, d.day, hour, minute, second))
    month_datetimes.sort()

    for dt in month_datetimes:
        msg = f"{random.choice(verbs)} {random.choice(subjects)} {random.choice(reasons)} (commit {msg_counter})"
        all_commits.append((dt, msg))
        msg_counter += 1

all_commits.sort(key=lambda x: x[0])

for dt, msg in all_commits:
    ts = dt.astimezone().strftime("%Y-%m-%dT%H:%M:%S%z")
    print(f"{ts}|{msg}")
PY

PLANNED_COUNT="$(wc -l < "$SCHEDULE_FILE" | tr -d '[:space:]')"
log "Planned commits: $PLANNED_COUNT"
if [[ "$PLANNED_COUNT" -eq 0 ]]; then
  fail "No commits were scheduled. Check date range configuration."
fi

BEFORE_COUNT="$(git rev-list --count HEAD)"
BEFORE_HEAD="$(git rev-parse HEAD)"
log "Local commit count before generation: $BEFORE_COUNT"
log "Local HEAD before generation: $BEFORE_HEAD"

log "Creating commits locally..."
while IFS='|' read -r commit_ts commit_msg; do
  export GIT_AUTHOR_DATE="$commit_ts"
  export GIT_COMMITTER_DATE="$commit_ts"
  git commit --allow-empty -m "$commit_msg" >/dev/null
done < "$SCHEDULE_FILE"

unset GIT_AUTHOR_DATE
unset GIT_COMMITTER_DATE

AFTER_COUNT="$(git rev-list --count HEAD)"
AFTER_HEAD="$(git rev-parse HEAD)"
CREATED_COUNT=$((AFTER_COUNT - BEFORE_COUNT))

log "Local commit count after generation: $AFTER_COUNT"
log "Commits created in this run: $CREATED_COUNT"
log "Local HEAD after generation: $AFTER_HEAD"

if [[ "$CREATED_COUNT" -le 0 ]]; then
  fail "No new local commits detected after generation."
fi

log "Fetching current remote state for verification..."
REMOTE_HEAD_BEFORE="$(git ls-remote --heads "$REMOTE" "$TARGET_BRANCH" | awk '{print $1}')"
if [[ -n "$REMOTE_HEAD_BEFORE" ]]; then
  log "Remote $REMOTE/$TARGET_BRANCH before push: $REMOTE_HEAD_BEFORE"
else
  log "Remote branch $REMOTE/$TARGET_BRANCH not found yet (will be created on push if allowed)."
fi

log "Calculating commits ahead of $REMOTE/$TARGET_BRANCH..."
set +e
AHEAD_COUNT="$(git rev-list --count "${REMOTE}/${TARGET_BRANCH}..HEAD" 2>/dev/null)"
AHEAD_EXIT="$?"
set -e
if [[ "$AHEAD_EXIT" -ne 0 ]]; then
  log "No local tracking ref for $REMOTE/$TARGET_BRANCH yet. Proceeding with push."
else
  log "Local branch is ahead by $AHEAD_COUNT commit(s)."
fi

log "Pushing to $REMOTE/$TARGET_BRANCH..."
set +e
PUSH_OUTPUT="$(git push "$REMOTE" "$TARGET_BRANCH" 2>&1)"
PUSH_EXIT="$?"
set -e
printf '%s\n' "$PUSH_OUTPUT"

if [[ "$PUSH_EXIT" -ne 0 ]]; then
  log "Initial push failed (exit code: $PUSH_EXIT)."
  if [[ "$PUSH_OUTPUT" == *"Authentication failed"* ]] || [[ "$PUSH_OUTPUT" == *"Permission denied"* ]] || [[ "$PUSH_OUTPUT" == *"could not read Username"* ]] || [[ "$PUSH_OUTPUT" == *"Repository not found"* ]]; then
    fail "Authentication/authorization failed while pushing to $REMOTE/$TARGET_BRANCH. Review git credentials and remote access."
  fi
  if [[ "$PUSH_OUTPUT" == *"rejected"* ]] || [[ "$PUSH_OUTPUT" == *"non-fast-forward"* ]] || [[ "$PUSH_OUTPUT" == *"fetch first"* ]] || [[ "$PUSH_OUTPUT" == *"failed to push some refs"* ]]; then
    log "Push was rejected. Retrying with force-with-lease..."
    set +e
    FORCE_OUTPUT="$(git push "$REMOTE" "$TARGET_BRANCH" --force-with-lease 2>&1)"
    FORCE_EXIT="$?"
    set -e
    printf '%s\n' "$FORCE_OUTPUT"
    if [[ "$FORCE_EXIT" -ne 0 ]]; then
      fail "Force-with-lease push failed. Review logs above (possible auth or permissions issue)."
    fi
    log "Force-with-lease push succeeded."
  else
    fail "Push failed. Authentication/authorization may be required. Review logs above."
  fi
else
  log "Initial push succeeded."
fi

log "Verifying remote branch now points to local HEAD..."
REMOTE_HEAD_AFTER="$(git ls-remote --heads "$REMOTE" "$TARGET_BRANCH" | awk '{print $1}')"
LOCAL_HEAD_NOW="$(git rev-parse HEAD)"
log "Local HEAD:  $LOCAL_HEAD_NOW"
log "Remote HEAD: ${REMOTE_HEAD_AFTER:-<none>}"

if [[ -z "$REMOTE_HEAD_AFTER" ]]; then
  fail "Remote head could not be resolved after push."
fi

if [[ "$REMOTE_HEAD_AFTER" != "$LOCAL_HEAD_NOW" ]]; then
  fail "Push completed but remote HEAD does not match local HEAD. Refresh GitHub and verify permissions."
fi

log "SUCCESS: commits are pushed and $REMOTE/$TARGET_BRANCH matches local HEAD."
log "Your commits are now visible on GitHub."
