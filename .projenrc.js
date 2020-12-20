const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.79.0',
  name: 'cdk-containers-lab',
  dependabot: false,
  deps: [
    'aws-cdk-lib@2.0.0-alpha.0',
  ],
});

project.synth();
