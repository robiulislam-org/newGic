# GitHub Repository Auto Push Rule

- **GitHub Repository URL**: `https://github.com/robiulislam-org/newGic.git`
- **Default Remote**: `origin`
- **Default Branch**: `main`

## Instructions for Agent
Whenever the user asks to push changes, complete a task, or update GitHub:
1. Automatically use Git (or `$env:TEMP\MinGit\cmd\git.exe` if git is not in global PATH).
2. Stage all changed files: `git add .`
3. Commit with a descriptive message: `git commit -m "<Summary of changes>"`
4. Pull/rebase if needed and push to `origin main`: `git push origin main`
5. Do NOT ask the user for the repository URL again, as it is saved here permanently.
