# Scrape Craft: Your Web-Scraping Robot Builder! 🤖

## What is Scrape Craft?

Imagine you have a robot that can go to any website and grab information for you, like a super-smart helper! That's what Scrape Craft is all about. It's a tool that lets you build these "web-scraping robots" without needing to be a coding expert.

Think of it like building with LEGOs, but instead of building houses, you're building robots that explore the internet.

## What Can You Do with Scrape Craft?

With Scrape Craft, you can:

- **Build Robots:** Create your own web-scraping robots by connecting different "task blocks" together.
- **Grab Information:** Tell your robots to go to websites and collect specific information, like prices of toys, news headlines, or anything else you can find online.
- **No Coding Needed (Mostly!):** You don't need to write complicated code to build your robots. You just drag and drop the task blocks and connect them.
- **Save Your Robots:** Save your robot designs so you can use them again later.
- **Create and Delete Robots:** You can create new robots and delete the ones you don't need anymore.
- **See the Robot's Status:** You can see if your robot is ready to work or if it's still being built.

## How Does It Work? (The LEGO Analogy)

1.  **Task Blocks (LEGO Bricks):** Scrape Craft has different "task blocks" that do different things. For example:

    - **"Go to Website" Block:** This block tells your robot which website to visit.
    - **"Grab Text" Block:** This block tells your robot to find and grab text from a specific part of the website.
    - **"Browser Instance" Block:** This block is like a virtual browser that your robot can use to navigate the web.
    - **"String" Block:** This block is like a text box where you can type in words or sentences.
    - **"Save" Button:** This button saves your robot design.
    - **"Create" Button:** This button creates a new robot.
    - **"Delete" Button:** This button deletes a robot.

2.  **Connecting the Blocks (Connecting LEGOs):** You connect these blocks together to tell your robot what to do, step by step. It's like giving your robot a set of instructions.

3.  **Running the Robot:** Once you've built your robot, you can run it, and it will go to the websites and grab the information you told it to.

## What We've Done So Far (Our Progress)

We've been busy building Scrape Craft, and here's what we've accomplished:

- **The Robot Builder:** We've created the main area where you can build your robots by dragging and dropping task blocks.
- **Task Blocks:** We've made some basic task blocks, like the "Grab Text" block, the "Browser Instance" block, and the "String" block.
- **Connecting Blocks:** You can now connect the task blocks together to create a sequence of actions.
- **Saving Robots:** You can save your robot designs so you don't have to build them again from scratch.
- **Creating Robots:** You can create new robots with a special "Create" button.
- **Deleting Robots:** You can delete robots that you don't need anymore.
- **Robot Status:** You can see if your robot is ready to work or if it's still being built.
- **Making it Look Nice:** We've made the tool look good and easy to use.
- **Fixing Bugs:** We've fixed some problems to make sure everything works smoothly.
- **Validating Connections:** We've made sure that you can only connect blocks that make sense together. For example, you can't connect a "Grab Text" block directly to a "Go to Website" block without a "Browser Instance" block in between.
- **Re-rendering:** We've made sure that the blocks update correctly when you connect them.
- **Loading:** We've added a loading screen to show you that the robot builder is loading.
- **Top Bar:** We've added a top bar to show the robot's name and other information.
- **Task Menu:** We've added a menu to show all the task blocks you can use.
- **Editor:** We've added an editor to build your robots.
- **React Query:** We've added React Query to make the app faster and more efficient.
- **Dark Mode:** We've added a dark mode toggle.

## What We're Trying to Achieve (Our Big Goal)

Our big goal is to make Scrape Craft the easiest way for anyone to build web-scraping robots. We want to:

- **Make it Super Easy:** We want to make it so easy that even someone who's never coded before can build a robot.
- **Add More Task Blocks:** We want to add lots of different task blocks so you can build all sorts of robots.
- **Make it Powerful:** We want to make sure that the robots you build can do really cool and useful things.
- **Make it Fun:** We want to make building robots with Scrape Craft fun and exciting!

## How to Use Scrape Craft (Quick Start)

1.  **Go to the Website:** Open the Scrape Craft website in your browser.
2.  **Create a New Robot:** Click the "Create" button to start building a new robot.
3.  **Drag and Drop:** Drag task blocks from the menu on the left onto the main area.
4.  **Connect the Blocks:** Connect the blocks together by dragging from the little circles on one block to the little circles on another block.
5.  **Save Your Robot:** Click the "Save" button to save your robot design.
6.  **Run your Robot:** Click the run button to run your robot.

## Setting Up Scrape Craft (For Grown-Ups)

If you're a grown-up who wants to run Scrape Craft on your computer, here's how:

1.  **Get the Code:**

    - You'll need to download the code from our code storage place (like GitHub).
    - If you know how to use `git`, you can use this command:
      ```bash
      git clone [repository-url]
      ```
      Replace `[repository-url]` with the actual URL.

2.  **Install the Tools:**

    - Make sure you have Node.js and npm (or yarn) installed on your computer. You can check by typing these commands in your terminal:
      ```bash
      node -v
      npm -v # or yarn -v
      ```
    - If you don't have them, go to the Node.js website and download them.

3.  **Install the Project's Helpers:**

    - Go to the folder where you downloaded the code.
    - Open your terminal and type:
      ```bash
      npm install # or yarn install
      ```
      This will install all the necessary helpers for the project.

4.  **Set Up the Database:**

    - We use a database called Prisma. You'll need to set it up.
    - First, create a `.env` file in the root of the project and add the following line:
      ```
      DATABASE_URL="file:./dev.db"
      ```
    - Then, run these commands in your terminal:
      ```bash
      npx prisma db push
      npx prisma studio
      ```
      This will create the database and open a tool to view it.

5.  **Run the Project:**
    - In your terminal, type:
      ```bash
      npm run dev # or yarn dev
      ```
    - This will start the project, and you can open it in your browser at `http://localhost:3000`.

## Project Structure (For Curious Grown-Ups)

Here's a quick look at how the project is organized:

- **`src/`:** This is where all the important code lives.
  - **`app/`:** This folder contains the code for the different pages of the website.
    - **`workflow/`:** This is where the code for the robot builder lives.
      - **`_components/`:** This folder contains the different parts of the robot builder, like the task blocks, the editor, and the top bar.
      - **`editor/[workflowId]/`:** This is the page where you can edit a specific robot.
      - **`layout.tsx`:** This is the layout for the robot builder.
      - **`page.tsx`:** This is the main page for the robot builder.
      - **`loading.tsx`:** This is the loading screen for the robot builder.
    - **`(dashboard)/`:** This folder contains the code for the dashboard.
      - **`workflows/`:** This is where the code for the workflows lives.
        - **`_components/`:** This folder contains the different parts of the workflows, like the create and delete dialogs.
  - **`components/`:** This folder contains reusable parts of the website, like the logo and the dark mode toggle.
  - **`lib/`:** This folder contains helper code, like the code for creating task blocks and the database connection.
  - **`types/`:** This folder contains the types for the project.
  - **`providers/`:** This folder contains the providers for the project, like the React Query provider and the Theme provider.
- **`.env`:** This file contains important settings for the project, like the database connection.
- **`package.json`:** This file lists all the helpers the project needs.
- **`prisma/`:** This folder contains the database schema.

## Contributing

If you're a grown-up who knows how to code and wants to help us build Scrape Craft, we'd love your help! Check out our contribution guidelines for more information.

<!-- ## License

This project is licensed under the [License Name] License. -->
