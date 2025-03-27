import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const Titlecards = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
  
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTczYjI4ZWVkMjdkMTRkMDRhOGU3ZjIzOWM3OGI4NSIsIm5iZiI6MTc0MjYyNjU0NC4zNiwic3ViIjoiNjdkZTVlZjBhZGYyMWExNjY4ZjU3ZThkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CID7rj-E9_u1UwmVa2-3lAz1EbwWI2kLDaHJMVMuRZ8'
    }
  };
  
  


const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;

}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel);
},[] )

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>

        })}
      </div>
    </div>
  )
}

export default Titlecards
