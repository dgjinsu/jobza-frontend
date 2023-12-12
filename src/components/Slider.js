import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      // test
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, // 자동 재생 활성화
      autoplaySpeed: 2500, // 2.5초마다 넘어가도록 설정
    };

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginTop: '50px' }}>
          <Slider {...settings}>
            <div>
              <img
                src="/images/banner1.jpg"
                alt="Image 1"
                style={{ width: '100%', maxWidth: '100%', height: '100px' }}
              />
            </div>
            <div>
              <img
                src="/images/banner2.jpg"
                alt="Image 2"
                style={{ width: '100%', maxWidth: '100%', height: '100px' }}
              />
            </div>
            <div>
              <img
                src="/images/banner3.jpg"
                alt="Image 3"
                style={{ width: '100%', maxWidth: '100%', height: '100px' }}
              />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
