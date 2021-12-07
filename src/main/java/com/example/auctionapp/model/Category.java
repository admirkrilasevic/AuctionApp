package com.example.auctionapp.model;

import lombok.*;
import org.hibernate.annotations.Formula;
import org.springframework.data.repository.query.Param;

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

    @Formula(value="(SELECT COUNT(i.id) FROM item i WHERE i.subcategory_id=id)")
    private int noOfItems;

}
