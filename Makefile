.PHONY: dev build deploy

# Run the local development server
dev:
	pnpm dev

# Build the production application locally
build:
	pnpm build

# Format the code and deploy to Vercel production
deploy:
	pnpm run format
	npx vercel --prod --yes
