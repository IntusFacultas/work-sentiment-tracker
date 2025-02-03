
# Work Sentiment Tracker

This is a small hobby project for tracking my work sentiment, built using the Next Auth sample project as a starting point.

The deployed version can be found at [`work-sentiment-tracker.vercel.app`](https://work-sentiment-tracker.vercel.app)

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/IntusFacultas/work-sentiment-tracker.git
cd work-sentiment-tracker
npm install
```

### 2. Configure your local environment

```
touch .env.local
```

Set the following values

```
AUTH_SECRET="autogenerate a cryptographically secure hash"
AUTH_GITHUB_ID="check github oauth app"
AUTH_GITHUB_SECRET="check github oauth app"
DATABASE_URL="get from supabase"
VERCEL_TOKEN="get from vercel"
```

### 4. Start the application

To run your site locally, use:

```
npm run dev
```

To run it in production mode, use:

```
npm run build
npm run start
```
