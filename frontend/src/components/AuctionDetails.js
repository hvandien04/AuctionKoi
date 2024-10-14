import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/auction-details.css';
import axios from 'axios';

const AuctionDetails = () => {
    const { id } = useParams(); // Lấy koiId từ URL
    const [koiDetails, setKoiDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isAuctionEnded, setIsAuctionEnded] = useState(false);

    useEffect(() => {
        const fetchKoiDetails = async () => {
            try {
                console.log(`Fetching Koi Details for Koi ID: ${id}...`);
                const response = await axios.get(`http://localhost:8080/auction/info/koi/${id}`);
                console.log("Koi Details fetched successfully:", response.data);
                const koiData = response.data[0];
                setKoiDetails(koiData);

                // Tính toán thời gian còn lại ban đầu
                calculateTimeRemaining(koiData.auctionEndTime);
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết cá koi:', error);
                setErrorMessage('Không thể lấy chi tiết cá koi.');
            }
        };

        fetchKoiDetails();
    }, [id]);

    useEffect(() => {
        // Chỉ chạy nếu có thời gian kết thúc
        let timer;
        if (koiDetails && koiDetails.auctionEndTime) {
            timer = setInterval(() => {
                calculateTimeRemaining(koiDetails.auctionEndTime);
            }, 1000);
        }

        return () => clearInterval(timer); // Dọn dẹp timer khi component unmount
    }, [koiDetails]);

    const calculateTimeRemaining = (auctionEndTime) => {
        const endTime = new Date(auctionEndTime);
        const remainingTime = endTime - Date.now(); // Thời gian còn lại tính bằng milliseconds

        if (remainingTime > 0) {
            const hours = Math.floor((remainingTime % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes = Math.floor((remainingTime % (1000 * 3600)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
            setIsAuctionEnded(false); // Phiên đấu giá vẫn tiếp tục
        } else {
            setTimeRemaining("Phiên đấu giá đã kết thúc"); // Hiển thị thông báo kết thúc
            setIsAuctionEnded(true); // Đánh dấu rằng phiên đấu giá đã kết thúc
        }
    };

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!koiDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div id="main">
            <Header />
            <div id="content">
                <div className="container-auction-details text-center">
                    <div className="auction-details-wrapper row">
                        <div className="col-md-5 auction-item-image">
                            <img src={`../img/h${koiDetails.koiId}.jpg`} alt={koiDetails.koiName} className="img-fluid" />
                        </div>
                        <div className="col-md-7 auction-item-info">
                            <div className="container text-left">
                                <section className="koi-info">
                                    <div className="card-header">
                                        <h2 className="auction-item-title">{koiDetails.koiName}</h2>
                                    </div>
                                    <div className="row-cols-2 row-custom d-flex flex-wrap g-3">
                                        <div className="col-md-6 card-info">
                                            <span>
                                                <i className="fa-solid fa-venus-mars"></i>
                                                Sex
                                            </span>
                                            <p>{koiDetails.sex || "Unknown"}</p>
                                        </div>
                                        <div className="col-md-6 card-info">
                                            <span>
                                                <i className="fa-solid fa-ruler"></i>
                                                Length
                                            </span>
                                            <p>{koiDetails.length} cm</p>
                                        </div>
                                        <div className="col-md-6 card-info">
                                            <span>
                                                <i className="fa-solid fa-earth-americas"></i>
                                                Breeder
                                            </span>
                                            <p>{koiDetails.breederName || "Unknown"}</p>
                                        </div>
                                        <div className="col-md-6 card-info">
                                            <span>
                                                <i className="fa-solid fa-cake-candles"></i>
                                                Age
                                            </span>
                                            <p>{koiDetails.age} y</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="koi-info">
                                    <div className="row-cols-2 row-custom d-flex flex-wrap">
                                        <div className="col card-info">
                                            <span>Starting Price</span>
                                            <p>{koiDetails.startingPrice}$</p>
                                        </div>
                                        <div className="col card-info">
                                            <span>Current Highest Price</span>
                                            <p>{koiDetails.currentPrice}$</p>
                                        </div>
                                        <div className="col card-info">
                                            <span>Start Date:</span>
                                            <p>{koiDetails.auctionStartTime || "Hiện chưa có"}</p>
                                        </div>
                                        <div className="col card-info">
                                            <span>End Date</span>
                                            <p>{koiDetails.auctionEndTime || "Hiện chưa có"}</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="koi-info">
                                    <div className="time-remaining">
                                        <span>Time Remaining</span>
                                        <p>{timeRemaining}</p>
                                    </div>
                                    <div className="Input-price-frame">
                                        <input className="Input-price" type="number" placeholder={"Mời nhập giá"} disabled={isAuctionEnded} />
                                        <a href="#" className="btn btn-primary btn-bid" disabled={isAuctionEnded}>Place Bid</a>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default AuctionDetails;
