const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const uuidv4 = require('uuidv4');

// const bucketName = 'medicinedocs'
const region = 'ap-south-1'
const accessKeyId = 'AKIA6NXW77QNVBIGBG4P'
const secretAccessKey = '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'

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