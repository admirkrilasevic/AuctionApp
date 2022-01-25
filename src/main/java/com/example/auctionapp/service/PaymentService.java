package com.example.auctionapp.service;

import com.example.auctionapp.payload.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @Autowired
    ItemService itemService;

    public String processPayment(PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = createPaymentIntent(paymentRequest.getAmount(), paymentRequest.getPaymentMethod());
            itemService.markItemAsSold(paymentRequest.getItemId());
            return paymentIntent.getStatus();
        } catch (StripeException e) {
            return e.getMessage();
        }
    }

    private PaymentIntent createPaymentIntent(double price, String paymentMethod) throws StripeException {
        System.out.println(price);
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (price * 100L))
                .setCurrency("USD")
                .setPaymentMethod(paymentMethod)
                .setConfirm(true)
                .build();
        return PaymentIntent.create(params);
    }
}
