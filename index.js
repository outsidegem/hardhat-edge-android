#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log("🚀 Initializing Hardhat Edge for Android (Termux)...");

const projectRoot = process.cwd();
const myBinaries = path.join(__dirname, 'binaries');

// Target paths inside the user's project
const edrDest = path.join(projectRoot, 'node_modules', '@nomicfoundation', 'edr', 'edr.android-arm64.node');
const solDest = path.join(projectRoot, 'node_modules', '@nomicfoundation', 'solidity-analyzer', 'solidity-analyzer.android-arm64.node');
const syncFile = path.join(projectRoot, 'node_modules', '@nomicfoundation', 'hardhat-utils', 'dist', 'src', 'synchronization.js');

// 1. Inject Binaries
try {
    if (fs.existsSync(path.dirname(edrDest))) {
        fs.copyFileSync(path.join(myBinaries, 'edr.android-arm64.node'), edrDest);
        console.log("✅ EDR ARM64 Gold Master injected.");
    } else {
        console.log("❌ Hardhat EDR not found. Did you run 'npm install hardhat' first?");
    }

    if (fs.existsSync(path.dirname(solDest))) {
        fs.copyFileSync(path.join(myBinaries, 'solidity-analyzer.android-arm64.node'), solDest);
        console.log("✅ Solidity Analyzer ARM64 Gold Master injected.");
    }
} catch (e) {
    console.error("⚠️ Error injecting binaries:", e.message);
}

// 2. Apply Lock Bypass
try {
    if (fs.existsSync(syncFile)) {
        let code = fs.readFileSync(syncFile, 'utf8');
        if (!code.includes('return () => {};')) {
            code = code.replace(/async acquire\(\) \{/, 'async acquire() { return () => {}; ');
            fs.writeFileSync(syncFile, code);
            console.log("✅ Termux File-Lock Bypass applied.");
        } else {
            console.log("✅ Termux File-Lock Bypass already applied.");
        }
    }
} catch (e) {
    console.error("⚠️ Error applying lock bypass:", e.message);
}

console.log("🔥 Hardhat is now ready for edge compilation! Try running: npx hardhat compile");
