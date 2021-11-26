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
import java.util.Optional;

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
    public @ResponseBody
    Page<Item> getItems(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") ItemSort sort, @RequestParam("direction") Sort.Direction direction) {
        return itemService.getItems(page, size, sort, direction);
    }

    @GetMapping("/{itemId}")
    public @ResponseBody
    Item getItemById(@PathVariable("itemId") long itemId){
        return itemService.getItemById(itemId).get();
    }
}
