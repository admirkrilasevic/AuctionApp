package com.example.auctionapp.repository;

import com.example.auctionapp.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("select i from Item i where (i.categoryId in :categoryIds or i.subcategoryId in :subcategoryIds) and i.startingPrice between :minPrice and :maxPrice")
    Page<Item> getFilteredItems(@Param("categoryIds") Long[] categoryIds, @Param("subcategoryIds") long[] subcategoryIds, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);

    @Query("select i from Item i where i.userId = :userId")
    List<Item> getItemsByUserId(@Param("userId") Long userId);

}
