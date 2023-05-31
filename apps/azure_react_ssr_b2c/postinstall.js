// will run automatically after npm/yarn/pnpm install

// change the port number in .env file with the port number set in package.json
const fs=require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
// extract the port number from the port script
const port = packageJson.scripts.port.match(/PORT=(\d+)/)[1];

fs.writeFileSync('.env', fs.readFileSync('.env', 'utf8').replace('{PORT}', port));
