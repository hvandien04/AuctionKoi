package com.example.auctionkoi.services;

import com.example.auctionkoi.entities.Bid;
import com.example.auctionkoi.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid createBid(Bid bid) {
        return bidRepository.save(bid);
    }

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    public Bid getBid(Long bidId) {
        return bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));
    }

    public List<Bid> getBidsByKoiId(Long koiId) {
        return bidRepository.findAllByKoi_KoiId(koiId); // Gọi phương thức trong repository
    }

    public void deleteBid(Long bidId) {
        Bid bid = getBid(bidId);
        bidRepository.delete(bid);
    }
}
