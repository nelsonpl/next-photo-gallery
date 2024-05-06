import React from 'react';

const api = "https://xwf3amzv87.execute-api.us-east-2.amazonaws.com/Prod"

interface PhotoListParams {
    imageName: string;
}

const Photo: React.FC<PhotoListParams> = async (params) => {

    const response = await fetch(`${api}/viewImage/imageName=${params.imageName}`);
    const imageUrl = (await response.json()).imageUrl;

    return (
        <img src={imageUrl} alt="" />
    );
};

export default Photo;
