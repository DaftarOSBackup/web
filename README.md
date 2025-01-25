# Codebase Documentation

## Overview
This project is a **Next.js** application using **TypeScript**, **Tailwind CSS**, and various modern web development tools. It includes features like authentication, dynamic routing, global state management, and reusable components.

This documentation explains the structure and purpose of each file and folder in the codebase, ensuring a beginner can understand and contribute effectively.

---

## Directory Structure

### Root-Level Files
1. **`.env.local`**
   - Stores sensitive environment variables for local development (e.g., API keys).
   - Example:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-secret
     ```

2. **`.gitignore`**
   - Specifies files and directories Git should ignore.
   - Example:
     ```
     node_modules/
     .env.local
     .next/
     ```

3. **`package.json`**
   - Defines project metadata, dependencies, and scripts.
   - Key scripts:
     - `dev`: Starts the development server.
     - `build`: Builds the application for production.
     - `start`: Runs the production build.

4. **`tsconfig.json`**
   - Configures TypeScript settings, such as strict type-checking.

5. **`tailwind.config.ts`**
   - Configures Tailwind CSS themes, colors, and utilities.

6. **`README.md`**
   - Provides a basic overview of the project and instructions for setup.

---

### Main Folders

#### `app/`
Contains the core Next.js pages and layouts, organized using the **app router**.

- **`(app)/`**: Contains primary application pages.
  - `home.tsx`: Home page of the application.
  - `daftar/`: Pages related to "Daftar" features.
    - `[slug]/`: Dynamically generated pages for Daftar entries.
  - `dashboard/`: Dashboard view for users.
  - `incubation/`: Pages for the incubation module.

- **`(auth)/`**: Authentication-related pages.
  - `login/`: Login pages.
  - `[role]/`: Role-based login pages (e.g., founder or investor).

- **`api/`**: API route handlers.
  - `auth/[...nextauth]`: Handles authentication using NextAuth.js.

#### `components/`
Reusable React components for UI and functionality. Below is a detailed breakdown of each subfolder and its files:

- **`dialogs/`**:
  - **`create-daftar-dialog.tsx`**: Handles the modal dialog for creating new Daftar entries.
  - **`notification-dialog.tsx`**: Displays notifications to the user.
  - **`schedule-meeting-dialog.tsx`**: Provides a modal interface for scheduling meetings.

- **`forms/`**:
  - **`pitch-form.tsx`**: A form component for submitting pitch details.
  - **`team-form.tsx`**: Handles forms related to managing team member details.

- **`navbar/`**:
  - **`sidebar.tsx`**: The main sidebar navigation component for the application.
  - **`topbar.tsx`**: The top navigation bar, which includes user profile and settings.

- **`providers/`**:
  - **`auth-provider.tsx`**: Manages the authentication state across the app.
  - **`theme-provider.tsx`**: Provides theme management, enabling light and dark modes.

- **`studio/`**:
  - **`founders-pitch.tsx`**: Displays pitch details submitted by founders.
  - **`investor-questions.tsx`**: Lists questions submitted by investors for a specific pitch.

- **`ui/`**:
  - **`button.tsx`**: A reusable button component with variants like primary, secondary, etc.
  - **`card.tsx`**: A customizable card component for displaying grouped information.
  - **`dropdown.tsx`**: A dropdown menu component with options for user interaction.
  - **`tabs.tsx`**: Handles tabbed navigation within pages or modals.

#### `config/`
Contains configuration files for navigation and other global settings.

#### `contexts/`
Implements **React Context API** for global state management.

- `role-context.tsx`: Manages user roles (e.g., founder, investor).
- `search-context.tsx`: Manages global search states.

#### `hooks/`
Custom React hooks.

- `use-mobile.tsx`: Handles mobile-specific functionality or UI logic.

#### `lib/`
Utility functions and helpers.

- `utils.ts`: Contains shared functions for use across the app.

#### `public/`
Static assets, such as images and icons.

- `google.svg`: Icon for Google login.
- `assets/`: Images for branding and placeholders.

#### `types/`
TypeScript type definitions.

- `next-auth.d.ts`: Extends NextAuth.js types for custom session properties.

---

## Key Features

### Authentication
- Implemented using **NextAuth.js** in `app/api/auth/[...nextauth]/route.ts`.
- Supports role-based authentication (e.g., founder, investor).

### Dynamic Routing
- Utilizes **file-based routing** provided by Next.js.
- Dynamic segments like `[slug]` and `[pitchId]` allow for flexible page generation.

### Tailwind CSS Integration
- Custom themes and utilities configured in `tailwind.config.ts`.

### Global State Management
- Uses **React Context API** for managing user roles and search state.

---

## Running the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build the project for production:**
   ```bash
   npm run build
   ```

4. **Start the production server:**
   ```bash
   npm start
   ```

---

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or bug fix.
2. Follow the existing coding standards and use TypeScript for type safety.
3. Submit a pull request with detailed descriptions of your changes.

---

## Contact
For further support or queries, reach out to the project maintainers at `support@example.com`. 
