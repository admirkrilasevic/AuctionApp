package com.example.auctionapp.payload;

public class PaymentRequest {

    private Long itemId;
    private double amount;
    private String paymentMethod;

    public PaymentRequest(Long itemId, double amount, String paymentMethod) {
        this.itemId = itemId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}