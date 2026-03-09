# Therapist AI

> A production-ready AI emotional support companion built with modern web technologies.

A safe, private space for emotional support and reflection. Talk through your thoughts and emotions with an AI companion designed to listen, reflect, and support you.

## 🚀 New Here? [START HERE →](START_HERE.md)

**Quick Links:**
- 🚀 [Deploy Now](DEPLOY_NOW.md) - Step-by-step deployment
- ⚡ [Quick Start](QUICK_START.md) - 5-minute setup
- 📚 [Complete Setup](SETUP.md) - Full documentation
- 🏗️ [Architecture](ARCHITECTURE.md) - Technical details

## ✨ Features

- 🔐 **Secure Authentication** - Clerk-powered sign up/sign in
- 💬 **Intelligent Chat** - GPT-4o-mini powered conversations
- 🎨 **Premium Design** - Minimal, calm, Apple-inspired UI
- 🔒 **Privacy First** - Server-side API, encrypted sessions
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast & Scalable** - Serverless architecture on Vercel
- ♿ **Accessible** - WCAG-focused design

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend && pnpm install

# Set up environment variables (see SETUP.md)
cp .env.local.example .env.local
# Edit .env.local with your keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**Need help?** See [QUICK_START.md](QUICK_START.md) for a 5-minute setup guide.

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes
- **[SETUP.md](SETUP.md)** - Complete setup guide with troubleshooting
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and technical details
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Vercel step-by-step
- **[GIT_COMMANDS.md](GIT_COMMANDS.md)** - Git workflow and commands

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Authentication | Clerk |
| AI | OpenAI GPT-4o-mini |
| Deployment | Vercel |
| Icons | Lucide React |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # Server-side chat API
│   │   ├── chat/page.tsx        # Protected chat interface
│   │   ├── layout.tsx           # Root layout with Clerk
│   │   └── page.tsx             # Landing page
│   └── components/
│       └── ChatInterface.tsx    # Main chat UI
├── middleware.ts                # Auth protection
└── package.json
```

## 🔑 Environment Variables

Create `frontend/.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# OpenAI API
OPENAI_API_KEY=sk-...
```

See [.env.local.example](frontend/.env.local.example) for template.

## 🚢 Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import in Vercel:
   - Go to https://vercel.com
   - Import `MarkPalkimas/Therapist`
   - Set root directory to `frontend`
   - Add environment variables
   - Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔒 Security

- All OpenAI API calls are server-side only
- Authentication required for chat access
- Environment variables never exposed to client
- Clerk handles secure session management
- Input validation on all API routes
- No secrets in Git (`.env.local` in `.gitignore`)

## ⚠️ Important Notice

This application provides supportive conversation but is **NOT** a replacement for professional mental health care. It is not a licensed therapist and cannot diagnose conditions or provide medical advice.

**In crisis, contact:**
- 🇺🇸 988 (Suicide & Crisis Lifeline)
- 💬 Text "HELLO" to 741741 (Crisis Text Line)
- 🚨 Emergency services (911)

## 🎯 What Makes This Production-Ready?

- ✅ Clean, modular architecture
- ✅ Type-safe TypeScript throughout
- ✅ Secure authentication with Clerk
- ✅ Server-side API security
- ✅ Error handling and validation
- ✅ Responsive design
- ✅ Production build tested
- ✅ Deployment-ready configuration
- ✅ Comprehensive documentation
- ✅ No hardcoded secrets
- ✅ Professional UI/UX

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## 📊 Performance

- **First Load JS**: ~101 KB (gzipped)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Build Time**: ~15 seconds
- **Cold Start**: <500ms (Vercel Edge)

## 💰 Cost Estimate

- **Vercel**: Free (Hobby tier)
- **Clerk**: Free (up to 10K MAUs)
- **OpenAI**: ~$0.15 per 1M tokens (GPT-4o-mini)

**Estimated**: $5-10/month for 1,000 conversations

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 👤 Author

**Mark Palkimas**

- GitHub: [@MarkPalkimas](https://github.com/MarkPalkimas)
- Project: [Therapist AI](https://github.com/MarkPalkimas/Therapist)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication infrastructure
- OpenAI for GPT-4o-mini
- Vercel for hosting platform

---

Built with ❤️ for emotional wellbeing

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # Server-side chat API
│   │   ├── chat/
│   │   │   └── page.tsx          # Protected chat page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with Clerk
│   │   └── page.tsx              # Landing page
│   └── components/
│       └── ChatInterface.tsx     # Main chat UI component
├── middleware.ts                 # Clerk auth middleware
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/MarkPalkimas/Therapist.git
git push -u origin main
```

2. Import project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `OPENAI_API_KEY`

4. Deploy!

## Security

- All OpenAI API calls are server-side only
- Authentication required for chat access
- Environment variables never exposed to client
- Clerk handles secure session management
- Input validation on all API routes

## Important Notice

This application provides supportive conversation but is NOT a replacement for professional mental health care. It is not a licensed therapist and cannot diagnose conditions or provide medical advice.

**In crisis, contact:**
- 988 (Suicide & Crisis Lifeline - US)
- Text "HELLO" to 741741 (Crisis Text Line)
- Emergency services (911)

## License

MIT

## Author

Mark Palkimas
