package com.example.auctionapp.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
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
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "address_id")
    private Long addressId;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "item_id"
    )
    private List<Bid> bids;

    public Item(Long id, Long userId, String name, Long categoryId, Long subcategoryId, String description, String photo, double startingPrice, LocalDate startDate, LocalDate endDate, Long addressId) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.description = description;
        this.photo = photo;
        this.startingPrice = startingPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.addressId = addressId;
    }
}
