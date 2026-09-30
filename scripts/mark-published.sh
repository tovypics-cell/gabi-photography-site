#!/bin/bash
# Marks queue items "published" when their content/<slug> pull request has been merged.
# Edits content/queue.json in the working tree only. It never commits or pushes;
# weekly-page.sh commits the change on the next content branch so it reaches main
# through a reviewed PR like everything else.
#
# Usage: scripts/mark-published.sh [--quiet]
set -euo pipefail

# ---------- single loop host ----------
# Only the machine holding ~/.config/tovy-weekly/loop-host runs the content loop
# (scripts/install-launchd.sh creates the marker). Since 2026-09-22 that is Omer's Mac mini.
# Every runner, including the original 9:00 one on Gabi's MacBook, pulls main and then calls
# this script, so this is where a second machine retires itself: a scheduled run on any other
# machine removes its own launchd job, cleans up, and stops the runner before it writes
# anything or sends a notification. A manual run on another machine just refuses with a message.
LOOP_HOST_MARKER="$HOME/.config/tovy-weekly/loop-host"
if [ ! -f "$LOOP_HOST_MARKER" ]; then
  LABEL="com.tovy.weekly-page"
  runner_pid="$PPID"
  runner_parent="$(ps -o ppid= -p "$runner_pid" 2>/dev/null | tr -d ' ' || true)"
  runner_cmd="$(ps -o command= -p "$runner_pid" 2>/dev/null || true)"
  if [ "$runner_parent" = "1" ] && [[ "$runner_cmd" == *weekly-page.sh* ]]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] not the content-loop host: retiring the $LABEL launchd job on this machine. The loop runs on Omer's Mac mini."
    rm -f "$HOME/Library/LaunchAgents/$LABEL.plist"
    rm -rf "$HOME/.cache/tovy-weekly-page.lock"
    case "${TOVY_WEEKLY_COPY:-}" in
      */tovy-weekly.*) rm -rf "$TOVY_WEEKLY_COPY" ;;
    esac
    kill -9 "$runner_pid" 2>/dev/null || true
    launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
    exit 0
  fi
  echo "mark-published: this machine is not the content-loop host ($LOOP_HOST_MARKER is missing)." >&2
  echo "The loop runs on Omer's Mac mini. To move it here, run scripts/install-launchd.sh on this machine and uninstall it there." >&2
  exit 1
fi

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
QUEUE="$REPO_DIR/content/queue.json"
GH_REPO="${GH_REPO:-tovypics-cell/gabi-photography-site}"
QUIET=0
[ "${1:-}" = "--quiet" ] && QUIET=1

say() { [ "$QUIET" = 1 ] || echo "mark-published: $*"; }

GH_BIN="${GH_BIN:-$(command -v gh || true)}"
[ -z "$GH_BIN" ] && [ -x "$HOME/.local/bin/gh" ] && GH_BIN="$HOME/.local/bin/gh"
if [ -z "$GH_BIN" ]; then
  echo "mark-published: gh (GitHub CLI) not found, cannot read merged PRs" >&2
  exit 1
fi
[ -f "$QUEUE" ] || { echo "mark-published: $QUEUE not found" >&2; exit 1; }

# Merged PRs whose head branch is content/<slug>. Dry-run branches look like
# content/<slug>--dry-run-<stamp>; if one of those gets merged, the page is live,
# so it counts as published for <slug> too.
merged="$("$GH_BIN" pr list --repo "$GH_REPO" --state merged --limit 200 \
  --json number,headRefName,mergedAt \
  --jq '[.[] | select(.headRefName | startswith("content/"))
         | {slug: (.headRefName | ltrimstr("content/") | sub("--dry-run-.*$"; "")),
            pr: .number, mergedAt: .mergedAt}]')"
# Any merged PR, by number: covers batch PRs that shipped several queue items at once
# (those items carry a "pr" field but no content/<slug> branch).
merged_numbers="$("$GH_BIN" pr list --repo "$GH_REPO" --state merged --limit 200 \
  --json number,mergedAt --jq '[.[] | {pr: .number, mergedAt: .mergedAt}]')"

tmp="$(mktemp)"
jq --argjson merged "$merged" --argjson mergedNumbers "$merged_numbers" '
  .items |= map(
    . as $item
    | ([$merged[] | select(.slug == $item.slug)] | sort_by(.mergedAt) | last) as $m
    | ([$mergedNumbers[] | select($item.pr != null and .pr == $item.pr)] | last) as $n
    | if $item.status != "published" and $m != null
      then . + {status: "published", pr: $m.pr, publishedAt: ($m.mergedAt | .[0:10])}
      elif $item.status != "published" and $n != null
      then . + {status: "published", publishedAt: ($n.mergedAt | .[0:10])}
      else . end)
' "$QUEUE" > "$tmp"

if cmp -s "$tmp" "$QUEUE"; then
  rm -f "$tmp"
  say "nothing new to mark"
else
  changed="$(jq -r --slurpfile old "$QUEUE" '
    [.items[] | select(.status == "published") | .slug] -
    [$old[0].items[] | select(.status == "published") | .slug] | join(", ")' "$tmp")"
  mv "$tmp" "$QUEUE"
  say "marked published: $changed"
fi
