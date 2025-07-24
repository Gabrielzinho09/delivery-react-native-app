
function esURLFirebaseValida(url, bucketName, fileUploadName, uuid) {
    const formatoEsperado = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/`;
    const tokenEsperado = `?alt=media&token=${uuid}`;

    return (
        url.startsWith(formatoEsperado) &&
        url.endsWith(tokenEsperado) &&
        url.includes(bucketName) &&
        url.includes(fileUploadName) &&
        url.includes(uuid)
    );
}

module.exports = esURLFirebaseValida;
