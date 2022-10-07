import React, { useState } from 'react';
import Photo from '../Photo';

const Img = () => {
    // reload for 
    const [reload, setReload] = useState(false);

    const imageStorageKey = '452c5f4511f175dd5a83f4dc78d1024a';

    // image for useState
    const [shows, setShows] = useState([]);
    useState(() => {
        fetch('http://localhost:5000/collect')
            .then(res => res.json())
            .then(data => setShows(data))
    }, [reload]) 

    const handleSubmit = (event) => {
        event.preventDefault();
        const write = event.target.write.value;
        const image = event.target.photo.files[0];
        event.target.reset();
        // console.log(image)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then(result => {
                setReload(!reload)
                if (result.success) {
                    const img = result.data.url;
                    const alldata = {
                        write: write,
                        img: img
                    }
                    // send data to databse
                    fetch('http://localhost:5000/collect', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(alldata),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            
                            // console.log('Success', data);
                        })

                }
                
            })
    }
    return (
        <div className='grid justify-items-center mt-32'>

            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className='text-2xl'>Upload Your Image</h1>
                    <p>File should be jpeg and png</p>
                    <form onSubmit={handleSubmit}>
                        <input placeholder='please write' type="text" name="write" id="" />
                        <input className='input-bordered' type="file" name="photo" id="" />
                        <div class="divider">OR</div>
                        <div>
                            <input type="submit" value="Submit" className='btn btn-success' />
                        </div>
                    </form>
                </div>

            </div>
            <h1>data{shows.length}</h1>
            {
                shows.map(show => <Photo
                    key={show._id}
                    show={show}
                ></Photo>)
            }

        </div>
    );
};

export default Img;