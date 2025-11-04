/**
 * React (Vite) Scaffolder
 *
 * Handles scaffolding React projects using Vite CLI.
 * This scaffolder is specific to the code-react module.
 *
 * @module code-react/scaffolder
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Runs Vite CLI to create a new React project
 *
 * @param {string} workingDir - Directory to run the command in
 * @param {string} projectName - Name of the project to create
 * @param {string} template - Vite template (react, react-ts, etc.)
 * @returns {Promise<void>}
 */
function runViteCreate(workingDir, projectName, template = 'react-ts') {
  return new Promise((resolve, reject) => {
    console.log(`🌐 Running: npm create vite@latest ${projectName} -- --template ${template}`);
    console.log(`📂 Working directory: ${workingDir}`);

    // npm create vite@latest <project-name> -- --template react-ts
    const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    const viteProcess = spawn(
      npmCommand,
      ['create', 'vite@latest', projectName, '--', '--template', template],
      {
        cwd: workingDir,
        stdio: 'pipe',
        shell: true
      }
    );

    let stdout = '';
    let stderr = '';

    viteProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      // Show progress
      process.stdout.write('.');
    });

    viteProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    viteProcess.on('close', (code) => {
      console.log(''); // New line after progress dots

      if (code !== 0) {
        console.error(`❌ Vite scaffolding failed with code ${code}`);
        console.error('stdout:', stdout);
        console.error('stderr:', stderr);
        return reject(new Error(`Vite create command failed with exit code ${code}`));
      }

      console.log(`✅ Vite project created successfully`);
      resolve();
    });

    viteProcess.on('error', (err) => {
      reject(new Error(`Failed to run Vite: ${err.message}`));
    });
  });
}

/**
 * Reads all files from a directory recursively
 *
 * @param {string} dirPath - Directory to read
 * @param {string} basePath - Base path for relative paths
 * @returns {Object} Files object with {type, content} structure
 */
function readDirectoryRecursive(dirPath, basePath = '') {
  const files = {};

  if (!fs.existsSync(dirPath)) return files;

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = basePath ? path.join(basePath, item.name) : item.name;

    if (item.isDirectory()) {
      // Recursively read subdirectories
      Object.assign(files, readDirectoryRecursive(fullPath, relativePath));
    } else {
      try {
        // Check if file is binary or text
        const isBinary = /\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/i.test(item.name);

        if (isBinary) {
          // Read binary files as base64
          files[relativePath] = {
            type: 'binary',
            content: fs.readFileSync(fullPath, 'base64')
          };
        } else {
          // Read text files as UTF-8
          files[relativePath] = {
            type: 'text',
            content: fs.readFileSync(fullPath, 'utf8')
          };
        }
      } catch (err) {
        console.warn(`⚠️ Could not read file ${relativePath}: ${err.message}`);
      }
    }
  }

  return files;
}

/**
 * Removes files from the files object based on removal list
 *
 * @param {Object} files - Files object to modify
 * @param {string[]} filesToRemove - Array of file paths to remove
 * @returns {Object} Modified files object
 */
function removeFiles(files, filesToRemove) {
  if (!filesToRemove || filesToRemove.length === 0) {
    return files;
  }

  console.log('🗑️ Removing files as specified in module configuration...');

  for (const fileToRemove of filesToRemove) {
    if (files[fileToRemove]) {
      delete files[fileToRemove];
      console.log(`✅ Removed file: ${fileToRemove}`);
    } else {
      console.warn(`⚠️ File not found for removal: ${fileToRemove}`);
    }
  }

  return files;
}

/**
 * Main scaffolding function - called by Genesis3
 *
 * @param {Object} moduleConfig - Module meta.json configuration
 * @param {Object} context - Scaffolding context
 * @param {Object} context.project - Project information
 * @param {Object} context.module - Module instance with fieldValues
 * @param {Array} context.modules - All modules in the project
 * @returns {Promise<Object>} Files object with {type, content} structure
 */
async function scaffold(moduleConfig, context) {
  const baseTemplateConfig = moduleConfig.generation?.baseTemplate?.config || {};
  const { project, module } = context;

  // Get configuration from module field values
  const fieldValues = module.fieldValues || {};

  // Determine Vite template to use
  const useTypeScript = fieldValues.useTypeScript !== false; // Default to true
  const template = useTypeScript ? 'react-ts' : 'react';

  console.log('🔍 Vite parameters:', {
    template,
    useTypeScript,
    projectName: project.name
  });

  // Create temporary directory for scaffolding
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis3-vite-'));
  const projectName = 'project';

  try {
    // Run Vite create command from tempDir
    // Vite will create projectName directory inside tempDir
    await runViteCreate(tempDir, projectName, template);

    // Vite creates the project in a subdirectory with the project name
    const actualProjectPath = path.join(tempDir, projectName);

    // Read all generated files
    console.log('📂 Reading generated files...');
    const files = readDirectoryRecursive(actualProjectPath);

    console.log(`✅ Read ${Object.keys(files).length} files from Vite project`);

    // Remove files specified in module configuration
    const filesToRemove = moduleConfig.generation?.files?.remove || [];
    const cleanedFiles = removeFiles(files, filesToRemove);

    console.log(`✅ Vite project generated successfully (${Object.keys(cleanedFiles).length} files)`);

    return cleanedFiles;

  } finally {
    // Clean up temporary directory
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (err) {
      console.warn(`⚠️ Could not clean up temporary directory ${tempDir}: ${err.message}`);
    }
  }
}

module.exports = {
  scaffold
};
