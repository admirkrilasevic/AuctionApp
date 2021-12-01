package com.example.auctionapp.service;

import com.example.auctionapp.model.Bid;
import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.BiddingRequest;
import com.example.auctionapp.repository.BidRepository;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;

@Service
public class BidService {

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserService userService;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    BidRepository bidRepository;

    public ResponseEntity<?> placeBid(HttpServletRequest httpServletRequest, BiddingRequest biddingRequest) {
        String token = jwtUtils.getToken(httpServletRequest);
        User user = (User) userService.loadUserByEmail(jwtUtils.getEmailFromJwtToken(token));
        Long itemId = Long.parseLong(biddingRequest.getItemId());
        double amount = Double.parseDouble(biddingRequest.getAmount());

        Bid bid = new Bid(user.getId(), itemId, amount, new Timestamp(System.currentTimeMillis()));
        bidRepository.save(bid);

        return ResponseEntity.ok("Bid successfully placed!");
    }

}
