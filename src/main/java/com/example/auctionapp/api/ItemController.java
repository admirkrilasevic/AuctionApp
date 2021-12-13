package com.example.auctionapp.api;

import com.example.auctionapp.enumeration.ItemSort;
import com.example.auctionapp.model.Item;
import com.example.auctionapp.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/category/{categoryId}")
    public Page<Item> getItemsByCategoryId(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") ItemSort sort, @RequestParam("direction") Sort.Direction direction, @PathVariable("categoryId") long categoryId){
        return itemService.getItemsByCategoryId(page, size, sort, direction, categoryId);
    }

    @GetMapping("/categories")
    public Page<Item> getItemsByCategoryIds(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") ItemSort sort, @RequestParam("direction") Sort.Direction direction, @RequestParam("categoryIds") long[] categoryIds){
        return itemService.getItemsByCategoryIds(page, size, sort, direction, categoryIds);
    }

    @GetMapping("/categoriesandsubcategories")
    public Page<Item> getItemsByCategoryOrSubcategoryIds(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") ItemSort sort, @RequestParam("direction") Sort.Direction direction, @RequestParam("categoryIds") long[] categoryIds, @RequestParam("subcategoryIds") long[] subcategoryIds){
        return itemService.getItemsByCategoryOrSubcategoryIds(page, size, sort, direction, categoryIds, subcategoryIds);
    }
    
}
