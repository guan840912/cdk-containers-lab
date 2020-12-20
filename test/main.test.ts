import '@aws-cdk/assert/jest';
import * as cdk from 'aws-cdk-lib';
import { ec2Stack } from '../src/main';

test('Snapshot', () => {
  const app = new cdk.App();
  const stack = new ec2Stack(app, 'test');

  expect(stack).not.toHaveResource('AWS::S3::Bucket');
});