package com.example.auctionkoi.services;

import com.example.auctionkoi.dto.AuctionDTO;
import com.example.auctionkoi.entities.Bid;
import com.example.auctionkoi.entities.Koi;
import com.example.auctionkoi.entities.Breeder;
import com.example.auctionkoi.repositories.BidRepository;
import com.example.auctionkoi.repositories.KoiRepository;
import com.example.auctionkoi.repositories.BreederRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuctionService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private KoiRepository koiRepository;

    @Autowired
    private BreederRepository breederRepository;

    public List<AuctionDTO> getAllAuctions() {
        List<AuctionDTO> auctionDTOs = new ArrayList<>();
        List<Bid> bids = bidRepository.findAll();

        for (Bid bid : bids) {
            Koi koi = bid.getKoi();
            Breeder breeder = breederRepository.findById(koi.getBreederId()).orElse(null);

            if (koi != null && breeder != null) {
                AuctionDTO dto = new AuctionDTO();
                dto.setBidId(bid.getBidId());
                dto.setAmount(bid.getAmount());
                dto.setCurrentPrice(bid.getCurrentPrice());
                dto.setKoiId(koi.getKoiId());
                dto.setUserId(bid.getUser().getId());
                dto.setAuctionStartTime(LocalDateTime.parse(bid.getAuctionStartTime().toString()));
                dto.setAuctionEndTime(LocalDateTime.parse(koi.getAuctionEndTime().toString()));
                dto.setStartingPrice(BigDecimal.valueOf(koi.getStartingPrice().doubleValue()));
                dto.setAge(koi.getAge());
                dto.setKoiName(koi.getKoiName());
                dto.setLength(koi.getLength());
                dto.setSex(koi.getSex());
                dto.setBreederId(breeder.getBreederId());
                dto.setBreederName(breeder.getBreederName());
                dto.setBreederDescription(breeder.getBreederDescription());
                auctionDTOs.add(dto);
            }
        }

        return auctionDTOs;
    }

    public List<AuctionDTO> getAuctionsByKoiId(Long koiId) {
        List<AuctionDTO> auctionDTOs = new ArrayList<>();
        List<Bid> bids = bidRepository.findAllByKoi_KoiId(koiId);

        for (Bid bid : bids) {
            Koi koi = bid.getKoi();
            Breeder breeder = breederRepository.findById(koi.getBreederId()).orElse(null);

            if (koi != null && breeder != null) {
                AuctionDTO dto = new AuctionDTO();
                dto.setBidId(bid.getBidId());
                dto.setAmount(bid.getAmount());
                dto.setCurrentPrice(bid.getCurrentPrice());
                dto.setKoiId(koi.getKoiId());
                dto.setUserId(bid.getUser().getId());
                dto.setAuctionStartTime(bid.getAuctionStartTime());
                dto.setAuctionEndTime(koi.getAuctionEndTime());
                dto.setStartingPrice(koi.getStartingPrice());
                dto.setAge(koi.getAge());
                dto.setKoiName(koi.getKoiName());
                dto.setLength(koi.getLength());
                dto.setSex(koi.getSex());
                dto.setBreederId(breeder.getBreederId());
                dto.setBreederName(breeder.getBreederName());
                dto.setBreederDescription(breeder.getBreederDescription());
                auctionDTOs.add(dto);
            }
        }

        return auctionDTOs;
    }
}
