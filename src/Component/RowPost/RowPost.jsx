import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import Youtube from 'react-youtube'
import Swal from 'sweetalert2'

const RowPost = (props) => {
  const [movies,setMovie] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then(
      res=>setMovie(res.data.results)
    ).catch(err=>console.log(err)) 
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    }
  }
  const handleMovies = (id,key)=>{
    setUrlId('')
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}`).then(
      res=>{
        if (res.data.results.length!==0){
          setUrlId(res.data.results[0])
          props.setData(true)
          props.closeOtherTrailers(); 
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "NO trailer available!",
        });
        console.log('eror')
      }
      }
    ).catch(err=>
      {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err)
      })
  }
  const clearUrlId = () => {
    setUrlId('');
}
  return (
    <div className='row'>
      
        <h2>{props.title}</h2>
        <div className="posters">
          {
            movies.map((movie,index)=>
              <img onClick={()=>handleMovies(movie.id)} key={index} className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+movie.backdrop_path}`} alt="banner" />
            )
          }
        </div>

         {props.data && urlId && <>  <Youtube videoId={urlId.key} opts={opts} ></Youtube>              
           <button onClick={clearUrlId}>Close Trailer</button></>}
            
         
    </div>
  )
}

export default RowPost
