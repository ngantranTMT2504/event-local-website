import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

function home() {
  const images = [
    {
      id: 1,
      src: "/images/music.jpg",
      alt: "music",
    },
    {
      id: 2,
      src: "/images/traditional.jpg",
      alt: "traditional",
    },
    {
      id: 3,
      src: "/images/athletes.jpg",
      alt: "sport",
    },
  ];

  return (
    <div>
      <div className="overflow-hidden rounded-3xl">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-lg shadow-lg"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="w-full  h-100 aspect-video">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="block w-full h-100  object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>   
      <div>
        {/* <input type="date" className="w-50" /> */}
      </div>
    </div>
  );
}

export default home;
