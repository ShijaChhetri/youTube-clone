import React from 'react'
import { Link } from 'react-router-dom'

function Upload() {
    const handleSubmit = (event) => {
        event.preventDefault();


        const requesturl = "http://localhost:3000/video";
        const data = {
            videoId : document.getElementById('videoId').value, 
            url : document.getElementById('url').value, 
            title : document.getElementById('title').value, 
            description : document.getElementById('description').value, 
            thumbnail : document.getElementById('thumbnail').value, 
            likes : document.getElementById('likes').value, 
            views : document.getElementById('views').value, 
        }

        console.log("body data", data)

        fetch(requesturl, {method: 'POST', 
            headers:{
                'Content-Type': 'application/json', 
                'Authorization' : localStorage.getItem('token')
            }, 
            body: JSON.stringify(data)})
        .then(response => {
            console.log(response)
            if(response.ok){
                return response.json();
            }else{
                throw new Error(response.message)
            }
        })
        .then(data => {
            if(data.success){
                console.log("Success", data)
                alert("Video Uploaded : ", JSON.stringify(data))

                window.location.href = "http://localhost:3000/"
            }else{
                alert(data.message)
            }
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div>
      <div className='SignIn'>
        <form>
            <h3> Upload : </h3>
            <div class="mb-3">
                <label for="videoId" class="form-label">Video Id</label>
                <input type="text" class="form-control" id="videoId" aria-describedby="emailHelp" required/>
            </div>
            <div class="mb-3">
                <label for="url" class="form-label">URL</label>
                <input type="text" class="form-control" id="url" aria-describedby="emailHelp" required/>
            </div>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" aria-describedby="emailHelp" required/>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" aria-describedby="emailHelp" required/>
            </div>
            <div class="mb-3">
                <label for="thumbnail" class="form-label">Thumbnail</label>
                <input type="text" class="form-control" id="thumbnail" aria-describedby="emailHelp" required/>
            </div>
            <div class="mb-3">
                <label for="likes" class="form-label">Likes</label>
                <input type="number" class="form-control" id="likes" aria-describedby="emailHelp" required/>
            </div>
            <div class="mb-3">
                <label for="views" class="form-label">Views</label>
                <input type="number" class="form-control" id="views" aria-describedby="emailHelp" required/>
            </div>
            <div class="signin-actions">
                <Link to={'/'}>
                    <button class="signin-action-buttons btn btn-secondary">Back</button>
                </Link>
                <button type="submit" onClick={(event) => handleSubmit(event)} class="signin-action-buttons btn btn-primary">Submit</button>
            </div>
            
        </form>
      
    </div>
    </div>
  )
}

export default Upload
