# Be Bodywise AI Clarity Engine
A prototype web app that shows how AI could give users earlier, measurable proof of progress during slow-to-show hair and skin treatments, with privacy built in under India's DPDP Act 2023.

**Live demo:** https://therattdogg.github.io/bodywise-ai-clarity/

## Features
- **AI Micro-Scanner:** simulates a sub-visual hair density scan (strands/cm²) with a progress bar and results.
- **Efficacy Analytics:** dashboard with hair density change (+8.4%), LPIPS visual difference and a 28-day scan comparison.
- **Clinical AI Assistant:** chat that gives triage guidance on skin purging and hair shedding, and escalates urgent symptoms (burning, rash, severe reactions) to a doctor.
- **Privacy & Rights:** health record export as JSON and DPDP Section 12 cascade data deletion.
- **Consent modal:** explicit opt-in for biometric visual data processing before any scan.

## Tech
React, TypeScript, Tailwind CSS and Lucide icons (`App.tsx`). `index.html` is a standalone version of the same app that runs in any browser with no build step.

## Note
This is a simulated prototype. Scan results and chat replies are hardcoded or keyword-based, not real AI output, and the chat is not medical advice.
