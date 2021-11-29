package com.example.auctionapp.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    @NonNull
    private long userId;

    @Column(name = "item_id")
    @NonNull
    private long itemId;

    @Column
    @NonNull
    private double amount;

    @Column
    private Timestamp date;

    public Bid(long userId, long itemId, double amount, Timestamp date) {
        this.userId = userId;
        this.itemId = itemId;
        this.amount = amount;
        this.date = date;
    }

}
