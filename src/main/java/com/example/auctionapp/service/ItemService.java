package com.example.auctionapp.service;

import com.example.auctionapp.enumeration.ItemSort;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.model.Item;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Page<Item> getItems(int page, int size, ItemSort sort, Sort.Direction direction) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        Page<Item> items = itemRepository.findAll(pageable);
        return items;
    }

    public Page<Item> getItemsByCategoryId(int page, int size, ItemSort sort, Sort.Direction direction, long categoryId) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        List<Item> items = itemRepository.findAll();
        List<Item> filteredItems = new ArrayList<>();
        for (int i = 0; i < items.size(); i++){
            if (items.get(i).getCategoryId() == categoryId) {
                filteredItems.add(items.get(i));
            }
        }
        Page<Item> itemsToReturn = new PageImpl<>(filteredItems, pageable, filteredItems.size());
        return itemsToReturn;
    }

    public Optional<Item> getItemById(long id) {
        Optional<Item> optional = itemRepository.findById(id);
        if (optional.isPresent()){
            return optional;
        } else {
            throw new NoSuchElementException("No such item exists");
        }
    }
}
