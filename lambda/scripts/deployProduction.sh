export AWS_PROFILE=default
npm run package && npm run aws-package -- --s3-bucket my-lambda-pipeline-artifacts && npm run aws-deploy -- --parameter-overrides file://template.config.production.json --stack-name VPC-Lambda-Production