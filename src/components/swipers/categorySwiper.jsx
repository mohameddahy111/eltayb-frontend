import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Card, CardContent, CardMedia } from "@mui/material";

export default function Swipers({ data }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data?.map((x, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardContent>
                <img src={x.img} alt={x.titel} style={{ height: "300px" }} />
                {x.titel}
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
