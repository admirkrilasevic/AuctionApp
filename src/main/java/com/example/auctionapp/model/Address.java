package com.example.auctionapp.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @NotNull
    @Column
    private String address;

    @NotNull
    @Column
    private String city;

    @NotNull
    @Column
    private String country;

    @NotNull
    @Column(name = "zip_code")
    private String zipCode;

    @NotNull
    @Column
    private String phone;

    @Column
    private String state;
}
