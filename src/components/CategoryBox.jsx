import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CategoryBox = ({data}) => {
const [arry ,setArry]=useState([])
const [loding ,setLoding]=useState(false)
const [error ,setError]=useState(null)

const getCategory =async ()=>{
  setLoding(true)
await axios.get(`/category/${data?.titel}`).then((res)=>{
  setArry(res.data)
  console.log(res.data)
  setLoding(false)


})
}

useEffect(()=>{getCategory()},[])
  return (
    <div >
{arry?.map((x,index)=>(
  <img src={x.mina_image} alt={x.title} width={200}/>
))}
    </div>
  );
}

export default CategoryBox;
