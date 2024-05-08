import React, { useState, useEffect } from 'react';
import { get } from '../services/imageService';

interface ImageLazyLoadProps {
    filename: string;
}

const ImageLazyLoad: React.FC<ImageLazyLoadProps> = ({ filename }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await get(filename);
                setImageUrl(url);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        fetchImage();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [filename]);

    return (
        <div className="w-full">
            {imageUrl ? (
                <img src={imageUrl} alt='' />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ImageLazyLoad;
