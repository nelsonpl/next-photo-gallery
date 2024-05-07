import React, { useState, useEffect } from 'react';

interface ImageLazyLoadProps {
    filename: string;
}

const ImageLazyLoad: React.FC<ImageLazyLoadProps> = ({ filename }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`https://k4nqmchcm5.execute-api.us-east-2.amazonaws.com/Prod/viewImage?imageName=${filename}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                setImageUrl((await response.json()).imageUrl);
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
