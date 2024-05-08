import React, { useState } from 'react';
import { save } from '../services/photoService';
import { upload } from '../services/imageService';

interface FormUploadPhotoProps {
    onPhotoUploaded: () => void;
}

const FormUploadPhoto: React.FC<FormUploadPhotoProps> = ({ onPhotoUploaded }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            console.error('File is required');
            return;
        }

        try {
            setUploading(true);

            const uploadData = await upload(file);

            await save({
                title,
                description,
                filename: uploadData.filename,
            });

            console.log('Photo saved successfully');
            setTitle('');
            setDescription('');
            setFile(null);
            onPhotoUploaded();

            const inputFile = document.getElementById('inputFile') as HTMLInputElement;
            inputFile.value = '';
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setFile(null)
            setUploading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Upload Photo</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                    <input type="text" value={description} onChange={handleDescriptionChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                    <input id="inputFile" type="file" accept="image/*" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default FormUploadPhoto;
