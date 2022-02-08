#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AgoraCdkStack } from '../lib/agora-cdk-stack';

const app = new cdk.App();
new AgoraCdkStack(app, 'argoStack');
