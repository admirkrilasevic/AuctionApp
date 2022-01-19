package com.example.auctionapp.api;

import com.example.auctionapp.enumeration.ItemSort;
import com.example.auctionapp.model.Item;
import com.example.auctionapp.payload.AddItemRequest;
import com.example.auctionapp.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin
@RequestMapping("api/v1/items")
@RestController
@AllArgsConstructor
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping()
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/search")
    public Page<Item> getItems(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") ItemSort sort, @RequestParam("direction") Sort.Direction direction) {
        return itemService.getItems(page, size, sort, direction);
    }

    @GetMapping("/{itemId}")
    public Item getItemById(@PathVariable("itemId") long itemId){
        return itemService.getItemById(itemId).get();
    }

    @GetMapping("/filtered")
    public Page<Item> getFilteredItems(
            @RequestParam("search") String search,
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam("sort") ItemSort sort,
            @RequestParam("direction") Sort.Direction direction,
            @RequestParam("categoryIds") Long[] categoryIds,
            @RequestParam("subcategoryIds") long[] subcategoryIds,
            @RequestParam("minPrice") double minPrice,
            @RequestParam("maxPrice") double maxPrice){
        return itemService.getFilteredItems(search, page, size, sort, direction, categoryIds, subcategoryIds, minPrice, maxPrice);
    }

    @GetMapping("/user/{userId}")
    public List<Item> getItemsByUserId(@PathVariable("userId") Long userId){
        return itemService.getItemsByUserId(userId);
    }

    @GetMapping("/user/bid/{userId}")
    public List<Item> getItemsByBidUserId(@PathVariable("userId") Long userId) {
        return itemService.getItemsByBidUserId(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(HttpServletRequest httpServletRequest, @RequestBody AddItemRequest addItemRequest) {
        return itemService.addItem(httpServletRequest, addItemRequest);
    }


    @GetMapping("/recommended/{categoryId}/{name}")
    public List<Item> getRecommendedProducts(@PathVariable("categoryId") Long categoryId, @PathVariable("name") String name) {
        return itemService.getRecommendedProducts(categoryId, name);
    }

    @GetMapping("/levenshtein/{searchText}")
    public List<String> getItemsByLevenShteinDistance(@PathVariable("searchText") String searchText){
        return itemService.getItemsByLevenshteinDistance(searchText);
    }
    
}
