package com.example.auctionapp.service;

import com.example.auctionapp.enumeration.ItemSort;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.model.Item;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Page<Item> getItems(int page, int size, ItemSort sort, Sort.Direction direction) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, String.valueOf(sort)));
        Page<Item> items = itemRepository.findAll(pageable);
        return items;
    }
}
