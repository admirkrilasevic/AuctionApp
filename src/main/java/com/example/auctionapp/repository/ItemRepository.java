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

    @Query("select i from Item i where i.endDate > current_date")
    Page<Item> getItems(Pageable pageable);

    @Query("select i from Item i where (i.categoryId in :categoryIds or i.subcategoryId in :subcategoryIds) and i.startingPrice between :minPrice and :maxPrice and i.endDate > current_date")
    Page<Item> getFilteredItems(@Param("categoryIds") Long[] categoryIds, @Param("subcategoryIds") long[] subcategoryIds, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);

    @Query("select i from Item i where (i.categoryId in :categoryIds or i.subcategoryId in :subcategoryIds) and i.startingPrice between :minPrice and :maxPrice and i.endDate > current_date and " +
            "(lower(i.name) like %:search% or lower(i.description) like %:search%)")
    Page<Item> getFilteredItemsWithSearch(@Param("search") String search, @Param("categoryIds") Long[] categoryIds, @Param("subcategoryIds") long[] subcategoryIds, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);

    @Query("select i from Item i where i.userId = :userId")
    List<Item> getItemsByUserId(@Param("userId") Long userId);

    @Query(value = "select * from item i join bid b on i.id = b.item_id where b.user_id = :userId", nativeQuery = true)
    List<Item> getItemsByBidUserId(@Param("userId") Long userId);

    @Query(value = "select * from item i where i.category_id = :categoryId and i.name != :name limit 3", nativeQuery = true)
    List<Item> getRecommendedProducts(@Param("categoryId") Long categoryId, @Param("name") String name);

}
