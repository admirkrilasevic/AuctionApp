package com.example.auctionapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NonNull
    private String name;

    @Column(name = "parent_category")
    private Long parentCategoryId;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "parent_category"
    )
    private List<Category> subcategories;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "category_id"
    )
    private List<Item> items;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "subcategory_id"
    )
    private List<Item> subcategoryItems;
}
