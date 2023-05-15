import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto, { randomBytes } from 'crypto'
dotenv.config();

const region = 'ap-southeast-1'
const bucketName = 'upload-image-vjp'
const accessKeyId = process.env.access_key
const secretAccessKey = process.env.secret_access_key

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL() { 
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = ({ 
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}