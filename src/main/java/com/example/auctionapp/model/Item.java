package com.example.auctionapp.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @NotNull
    @Column
    private String name;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "subcategory_id")
    private Long subcategoryId;

    @Column
    private String description;

    @Column
    private String photo;

    @NotNull
    @Column(name = "starting_price")
    private double startingPrice;

    @NotNull
    @Column(name = "start_date")
    private Date startDate;

    @NotNull
    @Column(name = "end_date")
    private Date endDate;

    @Column
    private String state;

    @Column(name = "address_id")
    private Long addressId;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "item_id"
    )
    private List<Bid> bids;
}
