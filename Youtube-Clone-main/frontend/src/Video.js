// rfce

import React, { useEffect, useState } from 'react'
import Header from './Header'
import tmkoc from './images/tmkoc.jpg'
import avtar from './images/avtar.png'
import {LiaThumbsDown, LiaThumbsUp, LiaDownloadSolid} from 'react-icons/lia'
import {IoMdThumbsUp} from 'react-icons/io'
import {PiShareFatLight} from 'react-icons/pi'
import { Link } from 'react-router-dom'

function SuggestedVideo(props){
  let video = props.video;

  return (<>
    <div className='suggested-video'>
      <div className='suggestion-image'>
        <Link to={`/video?id=${video.videoId}`} 
          onClick={() => {
            props.setVideoId(video.videoId)
            props.setVideo(video)
            }}>
          <img class="suggestion-thumbnail" src={video.thumbnail} width={'230px'} />
        </Link>
      </div>
      <div className='suggestion-content'>
        <div class="video-info">
            <p class="track-title margin-0 video-info-title">
              {video.title}
            </p>
            <p class="margin-0 smaller-fontsize">T-Series</p>
            <p class="margin-0 smaller-fontsize">{video.views} views . 4 years ago</p>
        </div>
      </div>
    </div>
  </>);
}

function VideoInfo(props){
  const video = props.currVideo;
  console.log(video.likes)

  const [likes, setLikes] = useState(video.likes);

  const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    alert("Video Link copied : " + text);
  }

  useEffect(() => {
      setLikes(video.likes)
  }, [video.likes])

  const handleLikes = () => {

    let newLikes = JSON.parse(localStorage.getItem(`like_${video.id}`)) ? 
    JSON.parse(localStorage.getItem(`like_${video.id}`))
    : [];
    if(newLikes.includes(localStorage.getItem('email'))){
      newLikes.pop(localStorage.getItem('email'));
    }else{
      newLikes.push(localStorage.getItem('email'));
    }
    
    localStorage.setItem(`like_${video.id}`, JSON.stringify(newLikes))
    
    const requesturl = `http://localhost:5500/video/${video._id}/like`;

    fetch(requesturl, {method: 'POST', 
        headers:{
            'Content-Type': 'application/json', 
            'Authorization' : localStorage.getItem('token')
        }})
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
            console.log("Success", data.video)
            setLikes(data.video.likes)
          }else{
            alert(data.message)
        }
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
  }

  console.log("Likes", likes)
  return (
    <>
      <h5 className='video-title'>
        {video.title}
      </h5>
      <div className='video-details'>
        <div className='channel-info'>
          <img src={avtar} height={'30px'} width={'30px'}/>
          <div className='channel-name'>
            <h6 className='margin-0'>Zee Music Company</h6>
            <p className='margin-0 subscribers'>467K subscribers</p>
          </div>
          <button className='subscribe'>Subscribe</button>
        </div>
        <div className='video-action-buttons'>
          <button onClick={() => {handleLikes()}}>
            { (JSON.parse(localStorage.getItem(`like_${video.id}`)) ? 
              JSON.parse(localStorage.getItem(`like_${video.id}`))
              : []).includes(localStorage.getItem('email')) ? 
              <IoMdThumbsUp size={'1.4rem'} />
            :
              <LiaThumbsUp size={'1.4rem'} />
            }
            {/* <LiaThumbsUp size={'1.4rem'} /> */}
            {likes} | <LiaThumbsDown size={'1.4rem'} /></button>
          <button onClick={() => copyToClipboard(window.location.href)}>
            <PiShareFatLight size={'1.4rem'}/>
            Share</button>
          <a href={`https://www.ssyoutube.com/watch?v=${video.videoId}`} 
            target='_blank'>
              <button class="download-button">
            <LiaDownloadSolid size={'1.4rem'}/>
            Download</button>
          </a>
          
        </div>
        
      </div>
      <div className='video-desc'>
          <p>{video.views} views &nbsp; 1 year ago</p>
          <p>
            {/* Here is the compilation video for all the random suggestions Shukla Ji gave from 
                      the film Chhalaang. Watch this video for non stop laughter and let us know in 
                      the comments which suggestion did you relate with the most. */}
              {video.description}
            </p>
        </div>
    </>
  );
}

function Video() {
  // const [seconds, setSeconds] = useState(10);
  // const targetTime = Math.floor((new Date()).getTime()/1000 + 10);
  const [currVideoId, setCurrentVideoId] = useState("");
  const [currVideo, setCurrVideo] = useState({})
  const [videos, setVideos] = useState([]);

  const url = "http://localhost:3000/videos"

  const getVideos = async() => {
      try{
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          setVideos(json.videos);

          let currId = (new URL(window.location)).searchParams.get('id');

          for(let i = 0; i < json.videos.length; i++){
            console.log(json.videos[i].videoId, " | ", currId)
            if(json.videos[i].videoId == currId){
              console.log("matched")
              setCurrVideo(json.videos[i]);
              break;
            }
          }

      }catch(error){
          console.log("Error", error)
      }
  };
  // when page renders
  useEffect(()=>{
      // Create a new URL object
      let address = new URL(window.location);

      // Get searchParameters property of the URL object
      let queryParameters = address.searchParams;
  
      // Retrieve specific query parameters
      let currentVideoId = queryParameters.get("id");

      setCurrentVideoId(currentVideoId);

      getVideos();



  }, []);

  // let videos = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div>
      {/* Video comp
      <h3>Remaining time : {seconds}</h3> */}
      <Header />
      <div className='video-main-page'>
        <div className='video-frame'>
          <iframe className='iframe-video' src={`https://www.youtube.com/embed/${currVideoId}?si=8TyAKqTfvtCYcIdO?rel=0&mute=1&autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <VideoInfo currVideo={currVideo} />
        </div>
        <div className='suggestions'>
          <p>Suggested Videos:</p>
          {videos.map((video) => {
              return <SuggestedVideo video={video} 
              setVideoId={setCurrentVideoId} 
              setVideo={setCurrVideo}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Video
