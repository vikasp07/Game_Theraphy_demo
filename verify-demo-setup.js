#!/usr/bin/env node

/**
 * GameTherapy Demo Mode - Verification Script
 * Run with: node verify-demo-setup.js
 * 
 * This script verifies that all files have been properly configured
 * for demo mode operation.
 */

const fs = require('fs');
const path = require('path');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

let checksPassed = 0;
let checksFailed = 0;

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function pass(message) {
  checksPassed++;
  log(`✅ ${message}`, GREEN);
}

function fail(message) {
  checksFailed++;
  log(`❌ ${message}`, RED);
}

function warn(message) {
  log(`⚠️  ${message}`, YELLOW);
}

function section(title) {
  console.log('');
  log(`\n━━━ ${title} ━━━`, CYAN);
}

// === MAIN VERIFICATION ===

console.clear();
log('\n🎮 GameTherapy Demo Mode Verification\n', CYAN);

// 1. Check .env file
section('ENVIRONMENT CONFIGURATION');

const envPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('DEMO_MODE=true')) {
    pass('Backend .env has DEMO_MODE=true');
  } else {
    fail('Backend .env missing or incorrect DEMO_MODE setting');
  }
  
  if (envContent.includes('MONGO_URI=')) {
    pass('Backend .env has MONGO_URI configured');
  } else {
    fail('Backend .env missing MONGO_URI');
  }
} else {
  fail('Backend .env file not found');
}

// 2. Check backend auth middleware
section('BACKEND AUTHENTICATION');

const authPath = path.join(__dirname, 'backend', 'middleware', 'auth.js');
if (fs.existsSync(authPath)) {
  const authContent = fs.readFileSync(authPath, 'utf8');
  
  if (authContent.includes('DEMO_USERS')) {
    pass('Backend auth.js has DEMO_USERS defined');
  } else {
    fail('Backend auth.js missing DEMO_USERS');
  }
  
  if (authContent.includes('67b01d7596d45b9e9566d3cf')) {
    pass('Backend auth.js has player user ID');
  } else {
    fail('Backend auth.js missing player user ID');
  }
  
  if (authContent.includes('67a5c7598becf8fd6cdc8339')) {
    pass('Backend auth.js has doctor user ID');
  } else {
    fail('Backend auth.js missing doctor user ID');
  }
  
  if (authContent.includes('67b01cae96d45b9e9566d3c5')) {
    pass('Backend auth.js has guardian user ID');
  } else {
    fail('Backend auth.js missing guardian user ID');
  }
  
  if (authContent.includes('demo-token-')) {
    pass('Backend auth.js recognizes demo-token- prefix');
  } else {
    fail('Backend auth.js missing demo-token- recognition');
  }
  
  if (authContent.includes('req.user = {')) {
    pass('Backend auth.js sets req.user properly');
  } else {
    fail('Backend auth.js does not set req.user');
  }
} else {
  fail('Backend auth.js not found');
}

// 3. Check frontend demoConfig
section('FRONTEND DEMO CONFIGURATION');

const demoConfigPath = path.join(__dirname, 'frontend', 'src', 'demoConfig.js');
if (fs.existsSync(demoConfigPath)) {
  const configContent = fs.readFileSync(demoConfigPath, 'utf8');
  
  if (configContent.includes('isDemoMode()') && configContent.includes('return true')) {
    pass('Frontend demoConfig.js isDemoMode() returns true');
  } else {
    warn('Frontend demoConfig.js isDemoMode() might not always return true');
  }
  
  if (configContent.includes('DEMO_USERS')) {
    pass('Frontend demoConfig.js has DEMO_USERS defined');
  } else {
    fail('Frontend demoConfig.js missing DEMO_USERS');
  }
  
  if (configContent.includes('vikasss')) {
    pass('Frontend demoConfig.js has player user data');
  } else {
    fail('Frontend demoConfig.js missing player user data');
  }
  
  if (configContent.includes('bigbulll')) {
    pass('Frontend demoConfig.js has doctor user data');
  } else {
    fail('Frontend demoConfig.js missing doctor user data');
  }
  
  if (configContent.includes('vikass')) {
    pass('Frontend demoConfig.js has guardian user data');
  } else {
    fail('Frontend demoConfig.js missing guardian user data');
  }
} else {
  fail('Frontend demoConfig.js not found');
}

// 4. Check frontend API
section('FRONTEND API CONFIGURATION');

const apiPath = path.join(__dirname, 'frontend', 'src', 'api.js');
if (fs.existsSync(apiPath)) {
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  
  if (apiContent.includes('axios.interceptors.request.use')) {
    pass('Frontend api.js has Axios interceptor');
  } else {
    fail('Frontend api.js missing Axios interceptor');
  }
  
  if (apiContent.includes('x-auth-token')) {
    pass('Frontend api.js includes x-auth-token header');
  } else {
    fail('Frontend api.js missing x-auth-token header');
  }
  
  if (apiContent.includes('x-user-role')) {
    pass('Frontend api.js includes x-user-role header');
  } else {
    fail('Frontend api.js missing x-user-role header');
  }
  
  if (apiContent.includes('getDemoUser')) {
    pass('Frontend api.js has getDemoUser function');
  } else {
    fail('Frontend api.js missing getDemoUser function');
  }
} else {
  fail('Frontend api.js not found');
}

// 5. Check frontend LandingPage
section('FRONTEND LANDING PAGE');

const landingPath = path.join(__dirname, 'frontend', 'src', 'components', 'LandingPage.js');
if (fs.existsSync(landingPath)) {
  const landingContent = fs.readFileSync(landingPath, 'utf8');
  
  if (landingContent.includes('handleRoleSelection')) {
    pass('Frontend LandingPage.js has handleRoleSelection function');
  } else {
    fail('Frontend LandingPage.js missing handleRoleSelection function');
  }
  
  if (landingContent.includes('demo-token-')) {
    pass('Frontend LandingPage.js sets demo-token-');
  } else {
    fail('Frontend LandingPage.js does not set demo-token-');
  }
  
  if (landingContent.includes('localStorage.setItem')) {
    pass('Frontend LandingPage.js stores user data in localStorage');
  } else {
    fail('Frontend LandingPage.js does not store user data');
  }
  
  if (landingContent.includes('Continue as Player') && 
      landingContent.includes('Continue as Doctor') && 
      landingContent.includes('Continue as Guardian')) {
    pass('Frontend LandingPage.js has all role selection buttons');
  } else {
    fail('Frontend LandingPage.js missing some role buttons');
  }
} else {
  fail('Frontend LandingPage.js not found');
}

// 6. Check documentation
section('DOCUMENTATION');

const docs = [
  { name: 'DEMO_SETUP.md', required: true },
  { name: 'IMPLEMENTATION_SUMMARY.md', required: true },
  { name: 'QUICK_START.md', required: true },
  { name: 'IMPLEMENTATION_CHECKLIST.md', required: true },
  { name: 'start-demo.bat', required: false },
  { name: 'start-demo.ps1', required: false }
];

docs.forEach(doc => {
  const docPath = path.join(__dirname, doc.name);
  if (fs.existsSync(docPath)) {
    pass(`Documentation: ${doc.name} exists`);
  } else {
    if (doc.required) {
      fail(`Documentation: ${doc.name} is missing`);
    } else {
      warn(`Documentation: ${doc.name} is optional`);
    }
  }
});

// === SUMMARY ===

section('SUMMARY');

const totalChecks = checksPassed + checksFailed;
const passPercentage = ((checksPassed / totalChecks) * 100).toFixed(1);

log(`Total Checks: ${totalChecks}`);
log(`Passed: ${checksPassed}`, GREEN);
log(`Failed: ${checksFailed}`, RED);
log(`Success Rate: ${passPercentage}%\n`);

if (checksFailed === 0) {
  log('✨ ALL CHECKS PASSED! Demo mode is properly configured.', GREEN);
  log('\n📖 Next Steps:');
  log('1. Start backend: cd backend && npm start');
  log('2. Start frontend: cd frontend && npm start');
  log('3. Open http://localhost:3000 in your browser');
  log('4. Select a role to begin demo\n');
  process.exit(0);
} else {
  log('⚠️  SOME CHECKS FAILED. Please review the errors above.', RED);
  log('\n📖 For help, see: DEMO_SETUP.md or IMPLEMENTATION_SUMMARY.md\n');
  process.exit(1);
}
