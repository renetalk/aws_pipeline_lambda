const AWS = require('aws-sdk')

const doAsyncStuff = () => {
  return Promise.resolve("Done")
}

const handler = async (event, context) => {

  const codepipeline = new AWS.CodePipeline()

  // Retrieve the Job ID from the Lambda action
  const jobId = event['CodePipeline.job'].id

  // Notify AWS CodePipeline of a successful job
  const putJobSuccess = async () => {
    const params = {
      jobId: jobId
    }
    try {
      await codepipeline.putJobSuccessResult(params).promise()
    } catch (err) {
      await putJobFailure(err)
    }
  }

  // Notify AWS CodePipeline of a failed job
  const putJobFailure = async err => {
    const params = {
      jobId: jobId,
      failureDetails: {
        message: JSON.stringify(err),
        type: 'JobFailed',
        externalExecutionId: context.invokeid
      }
    }
    await codepipeline.putJobFailureResult(params).promise()
  }

  try {
    await doAsyncStuff()
    await putJobSuccess()
    console.log('Completed successfully')
  } catch (e) {
    await putJobFailure(e)
    console.log('An error occurred')
  }
}

module.exports = { handler }
