# Independent Music Organization

Official website for the **Independent Music Organization (IMO)** at Carnegie Mellon University.

IMO is a student-run organization dedicated to bringing together musicians, supporting creative collaboration, and organizing music related events within the CMU community.

This website is the one stop shop for all things IMO, where one can find all the information they need.

## Tech Stack

- **React** — Frontend components and UI
- **Vite** — Development server and build tool
- **React Router** — Client-side navigation
- **Sanity CMS** — Content management for events and board members
- **Vercel** — Website hosting and deployment
- **Cloudflare** — Domain and DNS management

## Pages

- **Home:** Introduction to IMO and the organization
- **Events:** Upcoming events, manage content through Sanity CMS
- **Board:** Executive board members, roles, and photographs
- **Contact:** Links to IMO's social platforms and resources

## Content Management

The website uses Sanity CMS to manage website content.

The CMS currently manages:

- **Events:** Title, dates and time, location, descriptions, and links
- **Board Members:** Name, role, photograph, and display order

Authorized editors can update this information through Sanity Studio without modifying the website's source code.

## Getting Started (Production)

### Prerequisites

Install the following:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <imo-site>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the required environment variables for Sanity, if applicable.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal

## Contributing

1. Pull the latest changes from `main`.
2. Create a new branch for your feature or fix.
3. Make and test your changes locally.
4. Commit your changes
5. Push your branch to GitHub.
6. Open a pull request targeting `main`.
7. Request a review before merging.

## Deployment

The website is deployed through Vercel, with the domain managed through Cloudflare.

Changes merged into the production branch (`main`) automatically trigger a new Vercel deployment.

Sanity content updates are managed separately from code deployments.
