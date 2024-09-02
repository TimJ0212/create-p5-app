#!/usr/bin/env node

import { input, confirm } from "@inquirer/prompts";
import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import chalk from "chalk";

const templateDir = path.resolve(import.meta.dirname, "./template/");
const pwaTemplateDir = path.resolve(import.meta.dirname, "./template-pwa/");
const projectDir = path.resolve(process.cwd(), await getProjectName());
const srcDir = path.resolve(projectDir, "src");
let isPwa;

async function main() {
  try {
    console.log(chalk.blue("Welcome to the p5.js project creator."));

    await copyTemplateDir();
    isPwa = await getPwaOption();
    if (isPwa) {
      await copyPwaFiles();
    }

    await installDependencies();
    await createJsConfig();

    await updateHtmlFile();

    console.log(chalk.green("Successfully created p5.js project"));
  } catch (error) {
    console.error(chalk.red("Error creating project:"), error);
    process.exit(1);
  }
}

async function getProjectName() {
  return await input({ message: "Project name", required: true });
}

async function getPwaOption() {
  return await confirm({ message: "Add PWA support?" });
}


async function copyTemplateDir() {
  await fs.cp(templateDir, projectDir, { recursive: true });
}

async function copyPwaFiles() {
  const pwaIconsDir = path.join(pwaTemplateDir, "icons");
  const projectIconsDir = path.join(srcDir, "icons");
  await fs.cp(pwaIconsDir, projectIconsDir, { recursive: true });

  const manifestSrc = path.join(pwaTemplateDir, "manifest.json");
  const manifestDest = path.join(srcDir, "manifest.json");
  await fs.copyFile(manifestSrc, manifestDest);
}

async function installDependencies() {
  return new Promise((resolve, reject) => {
    exec(`cd ${projectDir} && npm install --save-dev @types/p5`, (err, stdout, stderr) => {
      if (err) reject(err);
      if (stderr) console.error(chalk.yellow("npm warnings:"), stderr);
      console.log(stdout);
      resolve();
    });
  });
}

async function createJsConfig() {
  const jsconfig = {
    compilerOptions: {
      target: "es6",
    },
    include: [
      "*.js",
      "**/*.js",
      "./node_modules/@types/p5/global.d.ts",
    ],
  };

  const jsconfigPath = path.join(projectDir, "jsconfig.json");
  await fs.writeFile(jsconfigPath, JSON.stringify(jsconfig, null, 2));
}

async function updateHtmlFile() {
  const htmlPath = path.join(srcDir, "index.html");
  let htmlContent = await fs.readFile(htmlPath, "utf-8");

  if (isPwa) {
    const pwaMetaTags = `
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#000000">
    <link rel="apple-touch-icon" href="icons/icon-192x192.png">
    `;
    htmlContent = htmlContent.replace("</head>", `${pwaMetaTags}\n</head>`);
  }

  await fs.writeFile(htmlPath, htmlContent);
}

main();
