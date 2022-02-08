import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
// import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

export class AgoraCdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // const agoraSecrets = new secretsmanager.Secret(this, "agora");

        const agoraGetToken = new lambda.Function(this, 'agoraGetToken', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'agoraGetToken.handler',
            environment: {
                key: 'value',
                "APP_ID": process.env.APP_ID,
                "APP_CERT": process.env.APP_CERT,
            }
        })

        // agoraSecrets.grantRead(agoraGetToken);

        const api = new apigw.RestApi(this, 'argoApis', {
            restApiName: "agora-cdk APIs",
            description: "APIs for the application."
        })

        const getCalendarIntegration = new apigw.LambdaIntegration(agoraGetToken, {
            requestTemplates: { "application/json": '{"statusCode": "200"}'},
        })

        api.root.addMethod("GET", getCalendarIntegration, {
            operationName: "Get New Token",
        })

    }
}
