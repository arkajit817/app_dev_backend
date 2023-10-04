// import S3 from 'aws-sdk/clients/s3'
const S3 = require('aws-sdk/clients/s3')

// export default (buffer, fileParams) => {
module.exports = (buffer, fileParams) => {
  const params = {
    Bucket: 'medicinedocs',
    Key: fileParams.fileName,
    Body: buffer,
    ContentType: fileParams.fileType,
    ContentEncoding: fileParams.fileEnc,
  }
  return S3.upload(params).promise()
}