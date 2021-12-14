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

    Page<Item> findByCategoryId(long categoryId, Pageable pageable);

    Page<Item> findAllByCategoryIdIn(long[] categoryIds, Pageable pageable);

    Page<Item> findAllByCategoryIdInOrSubcategoryIdIn(long[] categoryIds, long[] subcategoryIds, Pageable pageable);

    Page<Item> findAllByCategoryIdInOrSubcategoryIdInAndStartingPriceBetween(long[] categoryIds, long[] subcategoryIds, double minPrice, double maxPrice, Pageable pageable);

    @Query(value = "SELECT MAX(starting_price) FROM item WHERE id IN :itemIds", nativeQuery = true)
    double getMaxPrice(@Param("itemIds") long[] itemIds);

    @Query(value = "SELECT MIN(starting_price) FROM item WHERE id IN :itemIds", nativeQuery = true)
    double getMinPrice(@Param("itemIds") long[] itemIds);

}
