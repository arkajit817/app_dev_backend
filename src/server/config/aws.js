module.exports = {
    medicinedoc: {
        BUCKET_NAME: 'medicinedoc',
        IAM_USER_KEY: process.env.IAM_USER_KEY,
        IAM_USER_SECRET: process.env.IAM_USER_SECRET,
        region: process.env.REGION
    },
    reportdocapp: {
        BUCKET_NAME: 'reportdocapp',
        IAM_USER_KEY: process.env.IAM_USER_KEY,
        IAM_USER_SECRET: process.env.IAM_USER_SECRET,
        region: process.env.REGION
    },
    treatmentdoc: {
        BUCKET_NAME: 'treatmentdoc',
        IAM_USER_KEY: process.env.IAM_USER_KEY,
        IAM_USER_SECRET: process.env.IAM_USER_SECRET,
        region: process.env.REGION
    }
}