package com.example.auctionapp.repository;

import com.example.auctionapp.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("SELECT b.amount FROM Bid b WHERE b.itemId = :itemId")
    long getHighestBidForItem(@Param("itemId") Long itemId);

    @Query("SELECT COUNT(b) FROM Bid b WHERE b.itemId = :itemId")
    int getNumberOfBidsForItem(@Param("itemId") Long itemId);
}
