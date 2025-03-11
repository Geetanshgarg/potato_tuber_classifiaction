const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Environment configuration
const pythonCommand = process.env.PYTHON_CMD || 'python';
const pythonEnv = {
  ...process.env,
  PORT: process.env.PYTHON_PORT || '8000'
};

// Check if Python server file exists
const serverPath = path.join(__dirname, 'server.py');

if (!fs.existsSync(serverPath)) {
  console.error('Error: server.py not found!');
  process.exit(1);
}

// Function to start the Python server
function startPythonServer() {
  console.log('Starting Python server...');
  
  // Always use direct Python command to run server.py
  const pythonProcess = spawn(pythonCommand, ['server.py'], { env: pythonEnv });
  
  pythonProcess.stdout.on('data', (data) => {
    console.log(`[Python] ${data.toString().trim()}`);
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`[Python Error] ${data.toString().trim()}`);
  });
  
  pythonProcess.on('error', (error) => {
    console.error('Failed to start Python server:', error);
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`Python server exited with code ${code}`);
  });
  
  return pythonProcess;
}

// Function to start the Next.js application
function startNextApp() {
  console.log(`Starting Next.js application...`);
  
  const nextProcess = spawn('npm', ['run', 'dev', '--turbopack'], { 
    stdio: 'inherit',
    shell: true
  });
  
  nextProcess.on('error', (error) => {
    console.error(`Failed to start Next.js app:`, error);
  });
  
  return nextProcess;
}

// Start both servers
const pythonServer = startPythonServer();

// Start Next.js immediately after Python server
const nextApp = startNextApp();

// Handle process termination
const cleanupAndExit = () => {
  console.log('Shutting down servers...');
  
  // Kill the Python server process
  if (pythonServer && !pythonServer.killed) {
    pythonServer.kill();
  }
  
  // Next.js process will be terminated automatically since we're using stdio: 'inherit'
  
  process.exit(0);
};

// Listen for termination signals
process.on('SIGINT', cleanupAndExit);
process.on('SIGTERM', cleanupAndExit);
