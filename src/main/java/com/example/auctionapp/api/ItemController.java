package com.example.auctionapp.api;

import com.example.auctionapp.model.Item;
import com.example.auctionapp.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("api/v1/items")
@RestController
@AllArgsConstructor
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/getall")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/getnewarrivals")
    public @ResponseBody
    Page<Item> getNewArrivals(@RequestParam("page") int page, @RequestParam("size") int size) {
        return itemService.getNewArrivals(page, size);
    }

    @GetMapping("/getlastchance")
    public @ResponseBody Page<Item> getLastChanceItems(@RequestParam("page") int page, @RequestParam("size") int size) {
        return itemService.getLastChanceItems(page, size);
    }
}
