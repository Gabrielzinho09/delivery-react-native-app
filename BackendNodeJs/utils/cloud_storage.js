require('dotenv').config()
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const sharp = require('sharp'); // libreria de comprension de calidad de imagen


const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID, 
    keyFilename: process.env.GCLOUD_KEY_FILE
});

//const bucket = storage.bucket("gs://deliveryexpcass.appspot.com/");
const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

/**
 * Subir el archivo a Firebase Storage
 * @param {File} file objeto que sera almacenado en Firebase Storage
 */
module.exports = (file, pathImage, deletePathImage) => {
    return new Promise(async(resolve, reject) => {
        
        console.log('delete path', deletePathImage)
        if (deletePathImage) {

            if (deletePathImage != null || deletePathImage != undefined) {
                const parseDeletePathImage = url.parse(deletePathImage)
                var ulrDelete = parseDeletePathImage.pathname.slice(23);
                const fileDelete = bucket.file(`${ulrDelete}`)

                fileDelete.delete().then((imageDelete) => {

                    console.log('se borro la imagen con exito')
                }).catch(err => {
                    console.log('Failed to remove photo, error:', err)
                });

            }
        }


        if (pathImage) {
            try {
                // Utilizar Sharp para comprimir la imagen
                const compressedBuffer = await sharp(file.buffer)
                    .resize({ width: 800 })
                    .toFormat('jpeg')
                    .toBuffer();

                // Subir la imagen comprimida a Firebase Storage
                const fileUpload = bucket.file(`${pathImage}`);
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: 'image/jpeg', // Cambiado a JPEG
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        }
                    },
                    resumable: false
                });

                blobStream.on('error', (error) => {
                    console.log('Error al subir archivo a firebase', error);
                    reject('Something is wrong! Unable to upload at the moment.');
                });

                blobStream.on('finish', () => {
                    const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                    console.log('URL DE CLOUD STORAGE ', url);
                    resolve(url);
                });

                blobStream.end(compressedBuffer);
            } catch (error) {
                console.error('Error al comprimir o subir la imagen:', error);
                reject('Error al comprimir o subir la imagen a Firebase Storage');
            }
        }
    });
}