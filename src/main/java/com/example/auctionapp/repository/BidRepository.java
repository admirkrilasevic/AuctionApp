package com.example.auctionapp.repository;

import com.example.auctionapp.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Calendar;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("SELECT b.amount FROM Bid b WHERE b.itemId = :itemId")
    long getHighestBidForItem(@Param("itemId") Long itemId);

    @Query("SELECT COUNT(b) FROM Bid b WHERE b.itemId = :itemId")
    int getNumberOfBidsForItem(@Param("itemId") Long itemId);

    /* FUNCTION IN THE DATABASE:
    create or replace function time_left(itemid BIGINT)
    returns TEXT
    language plpgsql
    as
    $$
    declare
    time_left_item TEXT;
    begin
    SELECT end_date-now() INTO time_left_item FROM item WHERE id=itemid;
    RETURN concat(SPLIT_PART(time_left_item,':',1),' hours');
    end;
    $$
    */
    @Query(value = "SELECT time_left(:itemId);", nativeQuery = true)
    String getTimeLeftForItem(@Param("itemId") Long itemId);
}
