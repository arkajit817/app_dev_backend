const AWS = require('aws-sdk');
const Busboy = require('busboy');

const aws = require('../../config/aws');

// let s3bucket = new AWS.S3({
//     accessKeyId: aws.medicine.IAM_USER_KEY,
//     secretAccessKey: aws.medicine.IAM_USER_SECRET,
//     Bucket: aws.medicine.BUCKET_NAME
// });


AWS.config.update({ accessKeyId: aws.medicine.IAM_USER_KEY, secretAccessKey: aws.medicine.IAM_USER_SECRET });
const S3 = new AWS.S3();


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


module.exports.uploadToS3 = function (req, bucketName) {
    let chunks = [], fname, ftype, fEncoding;
    let busboy =  Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        fname = filename.replace(/ /g,"_");
        ftype = mimetype;
        fEncoding = encoding;
        file.on('data', function(data) {
            // you will get chunks here will pull all chunk to an array and later concat it.
            console.log (chunks.length);
            chunks.push(data)
        });
        file.on('end', function() {
            console.log('File [' + filename + '] Finished');
        });
    });
    busboy.on('finish', function() {
        const userId = UUID();
        const params = {
            Bucket: aws.medicine.BUCKET_NAME, // your s3 bucket name
            Key: `${fname}`, 
            Body: Buffer.concat(chunks), // concatinating all chunks
            ACL: 'public-read',
            ContentEncoding: fEncoding, // optional
            ContentType: ftype // required
        }
        // we are sending buffer data to s3.
        S3.upload(params, (err, s3res) => {
            if (err){
              res.send({err, status: 'error'});
            } else {
              res.send({data:s3res, status: 'success', msg: 'Image successfully uploaded.'});
            }
        });
        
    });
    req.pipe(busboy);
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

