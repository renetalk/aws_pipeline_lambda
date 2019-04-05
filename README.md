# Trigger async Lambda in VPC by CodePipeline
This is a template for triggering an async Lambda function in a VPC by CodePipeline.
The pipeline and lambda files are supposed to live in a different repositories and can be deployed separately.

## Get this running
1. Create a new stack in CloudFormation and upload the pipeline.yml. The pipeline should run and fail for now. but it should create a CodeCommit Repository.
2. Commit the files in the pipeline folder into CodeCommit to trigger the pipeline again (You can cd into the pipeline folder and do `git clone https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/Development-Repo && mv *.json *.yaml *.yml Development-Repo && cd Development-Repo` to connect the folder to your AWS account. Then just do `git add . && git commit -m 'initial commit' && git push`)   
Make sure to have the setup the CLI requirements for CodeCommit: https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up.html
3. Copy the values for `VPCSecurityGroupId` and `VPCSubnetIds` from the OutPuts Section of the VPC stack created by the pipeline
4. Paste the values into the template-config.[stage].json files of the lambda folder
5. Create an S3 bucket in the AWS console with the name `my-lambda-pipeline-artifacts` to upload the lambda template artifacts for the next step. Make the bucket publicly available (disable the two ACLs checkboxes when creating the bucket) otherwise the following script cannot upload the artifacts to the bucket.
6. Execute the script `npm run deploy-dev` in the lambda folder to create the lambda stack (Make sure to set the correct AWS profile in the `scripts/deployDevelopment.sh` script. It will use the default profile.)
7. Trigger the pipeline again in the AWS console (`Release change` button) to see the successful lambda execution


