## Promptable:

Your go-to web app for efficiently managing and harnessing custom prompts, designed for users of AI powerhouses like ChatGPT and Bard.
[Try it Now](https://prompt-able.vercel.app/)

## Features:

1. **Create Prompt Lists:**

   Save and organize your prompts with ease by creating customized lists tailored to different themes, projects, or preferences.

2. **Edit Prompts:**

   Easily modify prompts to better align with your needs.

3. **Swift Copy-Paste:**

   Save time with one-click copying. Your favorite prompts are always at your fingertips, ready to enhance your AI chat experience.

4. **Search Feature:**

   Quickly locate the perfect prompt for your current task.

## Tutorial:

https://youtu.be/qMLLt_XFVdE?si=Vh-q4_HnCd52Mmu-

## Development:

#### Project Setup

Ensure the following are installed on your device before proceeding:

- Node.js (version 18.17 or higher)
- Yarn (as the package manager)

#### Running the Project

- Framework and Tools: This repo is developed using `Next.js` and `React`, with `IndexedDB` for local persistent data storage, and `Jest` for testing.

- Install Dependencies: Start by installing all required dependencies. Run `yarn install`.

- Start Development Server: To launch the local development server, run `yarn dev`. The application will be accessible at localhost:3000 in your web browser.

- Run Tests: For executing the test suite, use `yarn test`.

#### Formatting and linting

Before contributing to this repo, setting up `pre-commit` is required. Follow the installation instructions available at [pre-commit.com](https://pre-commit.com/). In the root directory of this repo, run the following command to install the pre-commit hook:

```bash
$ ~/Desktop/promptable pre-commit install
```

Upon successful installation, you should see an output similar to:

```bash
pre-commit installed at .git/hooks/pre-commit
```

Once pre-commit is configured, it will automatically run `Prettier` and `ESLint` checks during each commit. If errors are found, you'll need to address and correct them before your changes can be successfully committed.

#### Workflows

This repo employs GitHub Actions that automatically execute upon opening a new pull request and with every subsequent commit to that pull request. These actions include formatting, linting, building, and, post-merge, deploying your changes. For a successful merge, all actions must pass, and your pull request requires approval. Once merged, the actions rerun on the main branch. Typically, the entire process takes less than 10 minutes for your changes to go live.

## Owner:

This project is developed and maintained by Shape.

- Bug report or feedback: [Email](mailto:shapeapp.23@gmail.com)
- About us: [Notion Page](https://ablaze-empress-f41.notion.site/Shape-bd828c0f62bf4b7d84e79a0cab20cd35?pvs=4)
