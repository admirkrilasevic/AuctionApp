package com.example.auctionapp.payload;

public class BiddingRequest {

    String itemId;
    String amount;

    public BiddingRequest(String itemId, String amount) {
        this.itemId = itemId;
        this.amount = amount;
    }

    public String getItemId() {
        return itemId;
    }

    public String getAmount() {
        return amount;
    }
}
