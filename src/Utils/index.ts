import axios from 'axios';
import imageCompression from 'browser-image-compression';
const imageHostingToken = import.meta.env.VITE_imgbbKey

export const handleImageUpload = async (imageFiles: File[]) => {
    const imageFilesArray = Array.from(imageFiles)
    try {
        const compressedImages = await Promise.all(imageFilesArray.map(image => compressImage(image)));
        const response = await Promise.all(compressedImages.map(image => uploadImage(image)));
        console.log(response);
        const imageUrl = response.map(image => image?.data?.data?.display_url)
        return imageUrl
    } catch (error) {
        return false
    }
}

const compressImage = async (image: File) => {
    const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }

    try {
        const compressedFile = await imageCompression(image, options);
        return compressedFile
    } catch (error) {
        throw new Error('Upload Failed')
    }
}

const uploadImage = async (imageFile: File) => {
    const formData = new FormData()
    formData.set('key', imageHostingToken)
    formData.append('image', imageFile)

    return axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: formData
    })
}

export const separateFeaturesByFullStop = (allFeatures: string) => {
    const featuresArray = allFeatures.split(".")
    return featuresArray
}

export const addFeaturesByFullStop = (allFeatures: [string]) => {
    const featuresText = allFeatures.join(". ")
    return featuresText
}