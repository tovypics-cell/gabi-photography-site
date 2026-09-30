#!/bin/bash
# Installs (or removes) the weekly content loop launchd agent for the current user, pointing at
# this checkout, and marks this machine as the loop host. Run it on exactly one machine;
# a scheduled run on any other machine retires its own job.
#   scripts/install-launchd.sh             install or refresh, then load
#   scripts/install-launchd.sh --uninstall unload and delete
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="com.tovy.weekly-page"
DEST="$HOME/Library/LaunchAgents/$LABEL.plist"
UID_NUM="$(id -u)"
if [ "${1:-}" = "--uninstall" ]; then
  launchctl bootout "gui/$UID_NUM/$LABEL" 2>/dev/null || true
  rm -f "$DEST" "$HOME/.config/tovy-weekly/loop-host"
  echo "removed $LABEL; this machine is no longer the loop host"
  exit 0
fi
mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs" "$HOME/.config/tovy-weekly"
# Marks this machine as the one loop host. On every other machine, a scheduled run retires itself
# (see the top of scripts/mark-published.sh). Only install on one machine.
date '+%Y-%m-%d %H:%M:%S' > "$HOME/.config/tovy-weekly/loop-host"
sed -e "s|__REPO__|$REPO|g" -e "s|__HOME__|$HOME|g" "$REPO/scripts/launchd/$LABEL.plist" > "$DEST"
plutil -lint "$DEST" >/dev/null
launchctl bootout "gui/$UID_NUM/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$UID_NUM" "$DEST"
echo "installed $LABEL for $REPO"
launchctl print "gui/$UID_NUM/$LABEL" | grep -E "state|weekday|hour" | head -6
