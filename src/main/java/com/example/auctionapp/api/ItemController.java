package com.example.auctionapp.api;

import com.example.auctionapp.model.Item;
import com.example.auctionapp.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Item> getNewArrivals() {
        return itemService.getNewArrivals();
    }

    @GetMapping("/getlastchance")
    public List<Item> getLastChanceItems() {
        return itemService.getLastChanceItems();
    }
}
