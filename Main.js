import React, { useEffect, useState } from 'react'
import './Main.css'
import axios from "axios"

const Main = () => {
    // const [data,setData]=useState([])
    const[lat,setLat]=useState(37.421588)
    const[long,setLong]=useState(-122.0837020)
    const[data,setData]=useState({})
    const[data1,setData1]=useState({})
    const[inputcity,setInputcity]=useState("")
    const city='pune'
    useEffect(()=>{
      
        fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+long+"&localityLanguage=en")
        .then(res=>res.json())
        .then(data=>setData(data))
    },[lat,long])
    

if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(
      function success(position){
          setLat(position.coords.latitude)
          setLong(position.coords.longitude);
      },function error(error_message){
          console.error('An error occuredwhile retriving location,error_message')
      }
  );
}
else {
   console.log('geoloc not supported');
 }
 const apicall=(cityname)=>{
  const apiURL="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=71ad6587703f7468f99bb49a8cbca3a4"
  axios.get(apiURL).then((res)=>{
    console.log("response",res.data)
    setData1(res.data)
  }).catch((err)=>{
    console.log("err",err);
  })
 }
 useEffect(()=>{
  apicall(data.city)
 },[])
  const handlecityChange=()=>{
     apicall(inputcity)
  }
  const handleChange=(e)=>{
   setInputcity(e.target.value)
  }
  return (
    <>
   <header className='appname'>Weather App

   </header>
    <div className='searchbar'>
      
      <input type='text' className='cityinput' onChange={handleChange}  value={inputcity}></input> 
      <span className='searchsymbol'  onClick={handlecityChange} >   <i className="fa-solid fa-magnifying-glass"></i></span>
    </div>

    <div className='details'>
      <div className='temperature'>{((data1?.main?.temp)-273.15).toFixed(2)} °C </div>
      <div className='sunSymbol'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Weather_icon_-_sunny.svg/512px-Weather_icon_-_sunny.svg.png' height={'90px'} width={'90px'} alt=''></img></div>
     <div className='status'>{data1?.weather?.main}</div>
      <div className='pressAndhumidity'>
      
       <div className='pressure'><span className='pressureheading'>Pressure :</span>{data1?.main?.pressure} hpa</div>
       <div className='humidity'><span className='humidityheading'>Humidity :</span>{data1?.main?.humidity}%</div>
    
     </div>
    </div>
    </>
  )
}

export default Main