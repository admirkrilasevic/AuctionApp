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
    public ResponseEntity<?> placeBid(HttpServletRequest httpServletRequest, @RequestBody BiddingRequest biddingRequest) {
        ResponseEntity<?> token = bidService.placeBid(httpServletRequest, biddingRequest);
        return ResponseEntity.ok(token);
    }
}
