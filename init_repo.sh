#!/bin/bash

# init_repo.sh - Initialize Git repository with project governance settings
# ---------------------------------------------------------------
# This script sets up the repository, creates protected branches, and
# adds CI checks for changelog compliance.
# ---------------------------------------------------------------

set -e

# 1. Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# 2. Add remote (replace with your Google repository URL)
#   Example: https://source.developers.google.com/p/PROJECT_ID/r/REPO_NAME
# Uncomment and set the correct URL before running.
# git remote add origin <YOUR_GOOGLE_REPO_URL>

# 3. Create initial commit if repository is empty
if [ -z "$(git status --porcelain)" ]; then
  echo "Creating initial commit..."
  touch README.md
  echo "# Project Title" > README.md
  git add README.md
  git commit -m "Initial commit"
fi

# 4. Create develop branch and set as default
if git show-ref --verify --quiet refs/heads/develop; then
  echo "Branch 'develop' already exists."
else
  echo "Creating 'develop' branch..."
  git checkout -b develop
  git push -u origin develop || true
fi

# 5. Protect main and develop branches (requires GitHub/GitLab API; placeholder)
# NOTE: This step assumes you have access to the remote repository's API.
# You can automate branch protection via GitHub CLI, GitLab API, or Google Cloud Source Repositories.
# Example for GitHub (replace OWNER/REPO):
# gh api -X PUT /repos/OWNER/REPO/branches/main/protection \
#   -f required_status_checks='{"strict":true,"contexts":["ci/check_changelog"]}' \
#   -f enforce_admins=true \
#   -f required_pull_request_reviews='{"required_approving_review_count":2}'

# 6. Setup AI Rules sync (Copy-based, no symlinks)
AGENT_RULES_DIR=".agent/rules"
mkdir -p "$AGENT_RULES_DIR"

# Copy source index to target
if [ -f "ai-rules/index.md" ]; then
  cp "ai-rules/index.md" "$AGENT_RULES_DIR/ai-rules.md"
  echo "Synced ai-rules/index.md to $AGENT_RULES_DIR/ai-rules.md"
fi

# Add pre-commit hook updates for sync
HOOK_PATH=".git/hooks/pre-commit"
cat <<'EOF' > $HOOK_PATH
#!/bin/bash
# Pre-commit hook to sync AI Rules and check changelog
AGENT_RULES_SRC="ai-rules/index.md"
AGENT_RULES_DEST=".agent/rules/ai-rules.md"

# 1. Sync AI rules if source changed
if git diff --cached --name-only | grep -q "$AGENT_RULES_SRC"; then
  mkdir -p $(dirname "$AGENT_RULES_DEST")
  cp "$AGENT_RULES_SRC" "$AGENT_RULES_DEST"
  git add "$AGENT_RULES_DEST"
  echo "Auto-synced $AGENT_RULES_DEST from $AGENT_RULES_SRC"
fi

# 2. Check CHANGELOG
if git diff --cached --name-only | grep -q "CHANGELOG.md"; then
  : # Pass
else
  # Optional: Warn if not updated (commented out blocking for now)
  echo "WARNING: CHANGELOG.md not updated."
fi
EOF
chmod +x $HOOK_PATH

echo "Repository initialization and AI rules sync complete."
