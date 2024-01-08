const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const uuidv4 = require('uuidv4');
const dotenv = require('dotenv')

// const bucketName = 'medicinedocs'
// IAM_USER_KEY: process.env.IAM_USER_KEY,
// IAM_USER_SECRET: process.env.IAM_USER_SECRET,
// region: process.env.REGION
const region = process.env.REGION
const accessKeyId = process.env.IAM_USER_KEY
const secretAccessKey = process.env.IAM_USER_SECRET

const aws = require('../../config/aws');


// uploads a file to s3
function uploadFile(file, uploadfiletype, email) {
    console.log(uploadfiletype, "ttyyyy")
    console.log(file,'------file-----');
    const fileStream = fs.createReadStream(file.path)
    console.log(aws,"aws")
    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey
    })
    // let uuid = uuidv4();
    let bucketname = aws[uploadfiletype]['BUCKET_NAME'];
    console.log(bucketname,"bucketname")
    const uploadParams = {
        Bucket: bucketname,
        Body: fileStream,
        Key: `${'img'}-${file.originalname}`
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream