import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_UPLOAD_URL || '';

export const upload = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('photo', file);

        const { data } = await axios.post(`${apiUrl}/uploadImage`, formData);
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};
