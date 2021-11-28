package com.example.auctionapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

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

    public Bid(long userId, long itemId, double amount) {
        this.userId = userId;
        this.itemId = itemId;
        this.amount = amount;
    }

}
