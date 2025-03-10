const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Environment configuration
const isProd = process.env.NODE_ENV === 'production';
const pythonCommand = process.env.PYTHON_CMD || 'python';
const pythonEnv = isProd ? {
  ...process.env,
  DEBUG: 'false',
  PORT: process.env.PYTHON_PORT || '8000'
} : {
  ...process.env,
  DEBUG: 'true',
  PORT: process.env.PYTHON_PORT || '8000'
};

// Check if Python server file exists
const serverPath = path.join(__dirname, 'server.py');
const wsgiPath = path.join(__dirname, 'wsgi.py');

if (!fs.existsSync(serverPath)) {
  console.error('Error: server.py not found!');
  process.exit(1);
}

// Function to start the Python server
function startPythonServer() {
  console.log(`Starting Python server in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);
  
  // In production use gunicorn, in development use the Flask dev server
  let pythonProcess;
  
  if (isProd) {
    if (!fs.existsSync(path.join(__dirname, 'node_modules', '.bin', 'gunicorn')) && 
        !process.env.GUNICORN_PATH) {
      console.warn('Gunicorn not found in node_modules, trying system gunicorn...');
    }
    
    const gunicornPath = process.env.GUNICORN_PATH || 'gunicorn';
    const workers = process.env.GUNICORN_WORKERS || '4';
    
    pythonProcess = spawn(gunicornPath, [
      '--workers', workers,
      '--bind', `0.0.0.0:${pythonEnv.PORT}`,
      '--timeout', '120',
      'wsgi:app'
    ], { env: pythonEnv });
  } else {
    pythonProcess = spawn(pythonCommand, ['server.py'], { env: pythonEnv });
  }
  
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
  console.log(`Starting Next.js application in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);
  
  const command = isProd ? 'start' : 'dev';
  const args = isProd ? [] : ['--turbopack'];
  
  const nextProcess = spawn('npm', ['run', command, ...args], { 
    stdio: 'inherit',
    shell: true
  });
  
  nextProcess.on('error', (error) => {
    console.error(`Failed to start Next.js app in ${isProd ? 'production' : 'development'} mode:`, error);
  });
  
  return nextProcess;
}

// Start both servers
const pythonServer = startPythonServer();

// In production, make sure Python server is ready before starting Next.js
setTimeout(() => {
  const nextApp = startNextApp();
}, isProd ? 5000 : 0);  // Wait 5 seconds in production

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
