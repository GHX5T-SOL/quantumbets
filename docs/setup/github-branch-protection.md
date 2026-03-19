# GitHub Branch Protection

Configure these settings in GitHub repo Settings → Branches → Add rule for `main`:

- **Require a pull request before merging**: 1 approval
- **Require status checks to pass**: CI (when configured)
- **Require branches to be up to date**: Yes
- **Do not allow bypassing**: Recommended for `main`
- **Restrict who can push**: As needed

Replace `@ghost` and `@zoro` in `.github/CODEOWNERS` with actual GitHub usernames.
