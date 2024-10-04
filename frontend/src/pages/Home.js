import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/home.css'

const Home = () => {
    return (
        <div id="main">
            <Header />
            <div id="content">
                <div className="cover-page">
                    <div className="banner-container">
                        <img src="../img/breeders-transparent.png" alt="" className="banner-img"/>
                        <div className="banner-text-container">
                            <h1 className="banner-text">AUCTIONKOI</h1>
                        </div>
                    </div>
                    <h1 className="banner-slogan">Kết Nối Trực Tiếp Với Những Người Nuôi Cá Koi Hàng Đầu
                        <span> Nhật Bản</span>
                    </h1>
                    <div className="button-container">
                        <a href="/auction" className="btn btn-Auction">View Auctions</a>
                        <a href="/help" className="btn btn-Learn">Learn More</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
