import React, { useEffect, useMemo } from 'react';
import { Store } from '../context/StorgState';
import { useNavigate } from 'react-router-dom';
import Swipers from '../components/swipers/categorySwiper';
import { useGetAllCategories } from '../hooks/useApi';
import { Box, Container, Grid, Typography } from '@mui/material';
import CategoryBox from '../components/CategoryBox';

const Home = () => {
  // const {userInfo}=Store()
  // const navigate =useNavigate()
  const {categories}= useGetAllCategories()
  return (
    <Container>
      <Box height={450}p={2} mt={5}>
      <Swipers data={categories}/>
      </Box>
      {categories?.map((x, index)=>(
        <Box key={index}>
        <Typography>{x.titel} </Typography>
        <CategoryBox data={x}/>
        
        </Box>
        ))}
        
    </Container>
  );
}

export default Home;
