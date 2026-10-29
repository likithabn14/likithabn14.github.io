# Likitha BN — Portfolio Website

A responsive, static personal portfolio built with HTML, CSS, and vanilla JavaScript. 

## Features

- Responsive layout for mobile, tablet, laptop, and desktop
- Mobile navigation with keyboard Escape support
- Sections for introduction, about, skills, projects, education, certificates, and contact
- Sixteen clickable project cards with short introductions in an accessible detail dialog
- Project category filters for web apps/games and data/AI projects
- Per-project GitHub repository search links scoped to the supplied GitHub username
- Resume download using the supplied PDF
- Email action and copy-email button
- Active section navigation and reduced-motion support
- SEO and social-sharing metadata
- No backend, build step, API key, or paid service required

## Important content notes

- The GitHub and LinkedIn links use the profile URLs printed in the supplied resume.
- The project cards use GitHub repository search scoped to `likithabn14` because the exact repository URLs could not all be independently verified during this update. Check the search result and replace it with a direct repository URL whenever you confirm the matching repository. Project introductions are concise summaries based on the project names, not claims that every feature has been independently verified from source code.
- The portfolio does not claim that a contact form sends messages; the email action opens the visitor's email application.
- The supplied resume PDF is included as-is for download.

## Test checklist

- [x] Navigation targets exist
- [x] Responsive CSS breakpoints and narrow-screen layout included
- [x] Mobile menu opens/closes and responds to Escape
- [x] Sixteen project cards open an introduction dialog
- [x] Project filters update visible cards
- [x] GitHub search links are generated per project
- [x] Resume PDF is included at the linked path
- [x] Email, telephone, GitHub, and LinkedIn actions use supplied contact/profile information
- [x] Reduced-motion preference is respected
- [ ] Verify visual behavior in a real browser at all requested viewport widths
- [ ] Run a browser console/Lighthouse audit after deployment
- [ ] Confirm the generated public URL after deployment
