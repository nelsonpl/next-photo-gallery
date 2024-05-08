import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const list = async (lastEvaluatedKey: string) => {
    const { data } = await axios.get(`${apiUrl}/listPhoto?lastEvaluatedKey=${lastEvaluatedKey}`);
    return data;
};

export const save = async (photo: any) => {
    await axios.post(`${apiUrl}/savePhoto`, photo);
};
