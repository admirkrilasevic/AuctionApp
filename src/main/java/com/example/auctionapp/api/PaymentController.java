package com.example.auctionapp.api;

import com.example.auctionapp.payload.PaymentRequest;
import com.example.auctionapp.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping
    public String completePayment(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        return paymentService.processPayment(paymentRequest);
    }

}
