const AWS = require('aws-sdk');
const Busboy = require('busboy');

const aws = require('../../config/aws');

let s3bucket = new AWS.S3({
    accessKeyId: aws.medicine.IAM_USER_KEY,
    secretAccessKey: aws.medicine.IAM_USER_SECRET,
    Bucket: aws.medicine.BUCKET_NAME
});


module.exports.uploadToS3 = function (req, bucketName) {
    console.log(req.files,"req")
    return new Promise((resolve, reject) => {
        var busboy =   Busboy({ headers: req.headers });
        console.log(req.files,"file")

        busboy.on('file', function (data) {
             
            console.log(data,"data-------")
            let params = {};
            // if (req.body.name) {
            //     params = {
            //         Bucket: bucketName,
            //         Key: `${req.body.customerName}/${req.body.name}`,
            //         Body: req.files.my_buffer.data,
            //     };
            // }
            //  else {
                console.log(req.files,"file")
                const file = req.files;
                params = {
                    Bucket: bucketName,
                    Key: `${file.name}`,
                    Body: file.data,
                };
            // }
            // s3bucket.createBucket((error,resdata) => {
            //     console.log(error,"Error")
            //     console.log(resdata,"resdata")
            console.log(s3bucket,"jjjj")
                s3bucket.upload(params, (err, data) => {
                    console.log(err,"err")
                    console.log(data,"data")
                    if (err) return reject(err);
                    return resolve(data.Location);
                });
            // });
        });
        // req.pipe(busboy);
    });
}


module.exports.getData = function (name) {
    var params = {
        Bucket: aws.quotation.BUCKET_NAME,
        Body: name
    };
    return new Promise((resolve, reject) => {
        s3bucket.getObject(params, (err, file) => {
            if (err) return reject(err);
            return resolve(file);
        });
    });
}

