
# Serverless SSH - OpenWhisk - Node.js

## 1. Install Provider Plugin
`npm install -g serverless-openwhisk`

## 2. Install Service Dependencies
`npm install` in this directory to download the modules from `package.json`.

## 3. Invoke sequence function
serverless invoke --function sshExec --data '{"CMD": "pwd"}'
