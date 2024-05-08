import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const list = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/listPhoto`);
        return data.photos;
    } catch (error) {
        console.error('Error fetching photos:', error);
        return [];
    }
};

export const save = async (photo: any) => {
    try {
        await axios.post(`${apiUrl}/savePhoto`, photo);
    } catch (error) {
        console.error('Error saving photo:', error);
    }
};
