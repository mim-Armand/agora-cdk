
> This is a simple Agora token gen backend to be used with a front-end to use Agora services

- Create an audio and video app using agora quick start guide
- Add in call stats
- add group chat
- discuss how it works in detail
- demonstrate how it runs.


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

 * `cdk --version`   To get the current version of the CDK
 * `aws sts get-caller-identity --profile fff` to get the account number of the currently selected profile

## To deploy:
- Make sure you add 
- `cd CDK/lambda` and then run `npm i` there
- Run `cdk bootstrap --profile fff` // only run once, for the first time.
- Run `cdk diff --profile fff` // to see the recent changes before deploying them.
- Run `cdk deploy --profile fff`
- Run `cdk deploy --hotswap --profile fff` For a fast re-deploy ( DON'T USE IN PRODUCTION! )
- Run `npm run watch` for continous hot-swap ( if needed edit `package.json` to include / exclude files in the watch )
