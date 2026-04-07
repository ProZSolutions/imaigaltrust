

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

--------------------------------------------------------------------------------------------------------------------------------------------
Imaigal Trust Management System

Tech Stack for imaigal-Trust:
    Frontend:
        Next.js
        React
        TypeScript
        Tailwind CSS
        React Hot Toast
        Lucide Icons

    Backend:
        Node.js
        Prisma ORM
        MySql

    Tools:
        Git 
        Github
        Vs code 
        Postman 

Features:
    Member Registration
    Admin Approval System
    Volunteer Management
    Event Management
    Membership Fee Tracking
    Donation Management
    Dashboard lists the count
    Secure Login System
    Responsive UI

Admin Login:
    Email: 
    Password: 

Project Structure:
    imaigal-trust 
    ├── app 
    | ├── login 
    | ├── dashboard 
    | ├── members 
    | ├── events
    | └── api 
      └──
    ├── components 
    ├── prisma 
     └── schema.prisma 
    ├── public 
    ├── styles 
    └── README.md

Installation:
    Clone Repository:
        git clone https://github.com/your-username/imaigal-trust.git

    Go to Project Folder:
        cd imaigal-trust

    Install Dependencies
        npm install

Environment Variables:
    Create .env file in the root folder.
    DATABASE_URL="mysql://root:password@localhost:3306/imaigal_trust" NEXTAUTH_SECRET=your_secret_key 

Prisma Setup:
    Generate Prisma Client
    npx prisma generate
    Run Database Migration
    npx prisma migrate dev

Toast Setup:
    npm install react-hot-toast
    
Run the Project
    npm run dev
    Open in browser : http://localhost:3000

Live Demo
    Deployment Link: https://imaigaltrust.vercel.app/

