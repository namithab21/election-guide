# CivicPulse: The Interactive Election Navigator

CivicPulse is a high-performance, responsive Next.js application designed to help users navigate the election process. It acts as a smart, dynamic assistant, simplifying voting preparation with a personalized roadmap.

## Features
- **Eligibility Wizard**: A step-by-step decision tree that customizes a voting action plan based on user experience and location.
- **Context-Aware Chat Assistant**: A mock integration with the Gemini API to answer complex ballot and election jargon questions.
- **Google Calendar Integration**: Auto-generates "Add to Calendar" links for critical deadlines (e.g., registration, election day).
- **Location Services**: A simulated polling location lookup feature based on zip code.
- **Accessibility Focus**: Uses semantic HTML, WCAG-compliant colors, ARIA attributes, and accessible components for visually impaired or elderly voters.

## Technology Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Constraints Followed
- **Under 10MB**: Clean code, zero heavy image assets (uses CSS and SVG icons).
- **Security**: Designed to handle mock keys or simulated APIs securely.
- **Single Branch**: All development code stays on `main`.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Git Push Instructions
To push this code to a new repository on a single branch:
```bash
git init
git add .
git commit -m "Initial commit: Complete CivicPulse Next.js application"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```
