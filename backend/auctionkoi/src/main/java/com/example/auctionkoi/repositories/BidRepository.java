package com.example.auctionkoi.repositories;

import com.example.auctionkoi.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findAll();
    List<Bid> findAllByKoi_KoiId(Long koiId);
}
