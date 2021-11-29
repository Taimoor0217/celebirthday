import React, { useState } from 'react'
import { createMemory } from "../../../utils/firebaseUtils";


const CloudinaryUploader = ({partyId}) => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "celebirthday")
        data.append("cloud_name", "celebirthday")
        fetch("https://api.cloudinary.com/v1_1/celebirthday/image/upload",
            { 
            method: "post",
            body: data 
            }
        )
        .then(resp => resp.json())
        .then(data => { 
            setUrl(data.public_id) 
            console.log(partyId)
            createMemory(partyId, data.public_id )
        })
        .catch(err => console.log(err))
    }
    return (
    <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload Memories</button>
    </div>
    )
}


export default CloudinaryUploader;