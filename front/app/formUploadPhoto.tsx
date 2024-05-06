'use client'
import React, { useState } from 'react';

const FormUploadPhoto: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

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
            const formData = new FormData();
            formData.append('photo', file);

            const uploadResponse = await fetch(`${apiUrl}/uploadImage`, {
                method: 'POST',
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            const saveResponse = await fetch(`${apiUrl}/savePhoto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl: uploadData.imageUrl,
                }),
            });

            if (saveResponse.ok) {
                console.log('Photo saved successfully');
                setTitle('');
                setDescription('');
                setFile(null);
            } else {
                console.error('Failed to save photo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Upload Photo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <label>Photo:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default FormUploadPhoto;
