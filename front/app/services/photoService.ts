import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const list = async (lastEvaluatedKey: string) => {
    const { data } = await axios.get(`${apiUrl}/photo?lastEvaluatedKey=${lastEvaluatedKey}`);
    return data;
};

export const save = async (photo: any) => {
    await axios.post(`${apiUrl}/photo`, photo);
};

export const del = async (photoId: string) => {
    await axios.delete(`${apiUrl}/photo/${photoId}`);
}