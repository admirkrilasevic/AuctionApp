package com.example.auctionapp.model;

import lombok.*;
import org.hibernate.annotations.Formula;

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

    @Formula(value="(SELECT COUNT(i.id) FROM item i WHERE i.subcategory_id=id AND i.end_date > now())")
    private int noOfItems;

    public Long getId() {
        return id;
    }
}
