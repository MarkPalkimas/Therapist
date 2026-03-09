# Git Commands for Deployment

## Initial Setup

If you haven't initialized Git yet:

```bash
# Navigate to project root
cd /path/to/Therapist

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Production-ready Therapist AI application"

# Set main as default branch
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/MarkPalkimas/Therapist.git

# Push to GitHub
git push -u origin main
```

## If Repository Already Exists

If you already have a Git repository:

```bash
# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Rebuild: Production-ready Therapist AI with Next.js, Clerk, and OpenAI"

# Push to GitHub
git push origin main
```

## If You Need to Force Push (Use with Caution)

Only use this if you want to completely replace the remote repository:

```bash
# Force push (overwrites remote)
git push -f origin main
```

**Warning**: Force push will overwrite the remote repository. Make sure you have backups.

## Verify Push

```bash
# Check remote URL
git remote -v

# Check branch
git branch

# View commit history
git log --oneline -5
```

## Common Issues

### Issue: Remote already exists

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/MarkPalkimas/Therapist.git
```

### Issue: Authentication failed

```bash
# Use GitHub CLI
gh auth login

# Or use personal access token
# Go to GitHub → Settings → Developer settings → Personal access tokens
# Generate token with 'repo' scope
# Use token as password when pushing
```

### Issue: Divergent branches

```bash
# Pull and merge
git pull origin main --allow-unrelated-histories

# Or force push (overwrites remote)
git push -f origin main
```

## After Successful Push

1. Go to https://github.com/MarkPalkimas/Therapist
2. Verify all files are present
3. Check that `.env.local` is NOT in the repository
4. Proceed to Vercel deployment

## Next Steps

After pushing to GitHub:

1. Go to https://vercel.com
2. Import the repository
3. Configure environment variables
4. Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.
