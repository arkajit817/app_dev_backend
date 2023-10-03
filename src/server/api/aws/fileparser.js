const {formidable} = require('formidable');
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client, S3 } = require("@aws-sdk/client-s3");
const Transform = require('stream').Transform;
const aws = require('../../config/aws');
const path = require('path');
const accessKeyId = aws.medicine.IAM_USER_KEY;
const secretAccessKey = aws.medicine.IAM_USER_SECRET;
const region = aws.medicine.region;
const Bucket = aws.medicine.BUCKET_NAME;

const parsefile = async (req) => {
    
    console.log("iiiiii",req.files)
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 100 * 1024 * 1024, //100 MBs converted to bytes,
            allowEmptyFiles: false
        }
        const uploadFolder = path.join(__dirname+ 'public')
        const form = formidable(options);
        form.uploadDir = uploadFolder;
        console.log(form,"hhhh")
        // form.parse(req, (err, fields, files) => {});
        form.parse(req, async (err, fields, files) => {
            console.log(fields);
            console.log(files);
            if (err) {
              console.log("Error parsing the files");
              console.log(err);
            //   return res.status(400).json({
            //     status: "Fail",
            //     message: "There was an error parsing the files",
            //     error: err,
            //   });
            }
            console.log(fields,"fields")
            console.log(files,"files")
          });

        // form.on('error', error => {
        //     console.log(error,"eee");
        //     reject(error.message)
        // })
        
        form.on('data', data => {
            console.log(data,"data");
            if (data.name === "successUpload") {
                resolve(data.value);
            }
        })
        
        form.on('fileBegin', (formName, file) => {
            console.log('file')
            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk)
                    }
                })

                this._writeStream.on('error', e => {
                    form.emit('error', e)
                });
                
                // upload to S3
                new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey
                        },
                        region
                    }),
                    params: {
                        ACL: 'public-read',
                        Bucket,
                        Key: `${Date.now().toString()}-${this.originalFilename}`,
                        Body: this._writeStream
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                })
                    .done()
                    .then(data => {
                        form.emit('data', { name: "complete", value: data });
                    }).catch((err) => {
                        form.emit('error', err);
                    })
            }

        })

        
    })
}

module.exports = parsefile;