#!/usr/bin/env node

import { input } from "@inquirer/prompts";
import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import chalk from "chalk";

const templateDir = path.resolve(import.meta.dirname, "./template/");
const projectDir = path.resolve(process.cwd(), await getProjectName());

async function main() {
  try {
    console.log(chalk.blue("Welcome to the p5.js project creator."));

    await copyTemplateDir();
    await installDependencies();
    await createJsConfig();

    console.log(chalk.green("Successfully created p5.js project"));
  } catch (error) {
    console.error(chalk.red("Error creating project:"), error);
    process.exit(1);
  }
}

async function getProjectName() {
  return await input({ message: "Project name", required: true });
}

async function copyTemplateDir() {
  await fs.cp(templateDir, projectDir, { recursive: true });
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

main();
