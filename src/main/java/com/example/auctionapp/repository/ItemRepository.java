package com.example.auctionapp.repository;

import com.example.auctionapp.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(value = "select * from item where (category_id in :categoryIds or subcategory_id in :subcategoryIds) and starting_price between :minPrice and :maxPrice", nativeQuery = true)
    Page<Item> getFilteredItems(@Param("categoryIds") Long[] categoryIds, @Param("subcategoryIds") long[] subcategoryIds, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);

}
