package com.example.auctionapp.repository;

import com.example.auctionapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT COUNT(i) FROM Item i WHERE i.subcategoryId = :subcategoryId")
    int countItemsInSubcategory (@Param("subcategoryId") long subcategoryId);
}
