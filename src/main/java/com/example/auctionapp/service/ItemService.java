package com.example.auctionapp.service;

import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.model.Item;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getNewArrivals() {
        return itemRepository.findAll(Sort.by(Sort.Direction.DESC, "startDate"));
    }

    public List<Item> getLastChanceItems() {
        return itemRepository.findAll(Sort.by(Sort.Direction.ASC, "endDate"));
    }
}
