package com.example.auctionapp.api;

import com.example.auctionapp.payload.BiddingRequest;
import com.example.auctionapp.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/bid")
public class BidController {

    @Autowired
    BidService bidService;

    @PostMapping
    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, @RequestBody BiddingRequest biddingRequest) {
        ResponseEntity<?> token = bidService.placeBid(httpServletRequest, biddingRequest);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/info/highest/{itemId}")
    public double highestBid(@PathVariable("itemId") long itemId) {
        return bidService.getHighestBidByItemId(itemId);
    }

    @GetMapping("/info/totalnumber/{itemId}")
    public int numberOfBids(@PathVariable("itemId") long itemId) {
        return bidService.getNumberOfBidsByItemId(itemId);
    }

    @GetMapping("/info/timeleft/{itemId}")
    public String timeLeft(@PathVariable("itemId") long itemId) {
        return bidService.getTimeLeftByItemId(itemId);
    }
}
