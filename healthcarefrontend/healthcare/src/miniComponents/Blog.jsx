import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
export default function Blog({ title, created,userId, cover,blogId }) {
let date = ''
    const[ name,setName] =useState('')
    let Id = blogId
    const navigate = useNavigate()
    for (let i=0;i<created.length;i++){
        if (created[i]!=='T'){
            date = date + created[i]
        }
        else{
            break
        }
    }
    useEffect(() => {


        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3100/user/docterbyid',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'docterId':userId ,
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                setName(response.data.name)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    return (
        <div>
            <div onClick={(e)=>{
navigate(`/readblog?id=${blogId}`)
            }} className="max-w-xs mx-auto bg-white hover:bg-gray-100 cursor-pointer shadow-lg rounded-lg overflow-hidden">
                <img
                    className="w-full h-48 object-cover object-center"
                    src={`data:image/jpeg;base64, ${cover.imageBase64}`} // Use the imageBase64 property for the image source
                    alt="Blog Cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-600 mt-1">Author: Dr. {name}</p>
                    <p className="text-sm text-gray-600">{date}</p>
                </div>
            </div>
        </div>
    );
}
