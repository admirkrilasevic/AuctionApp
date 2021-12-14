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

    public Optional<Item> getItemById(long id) {
        Optional<Item> optional = itemRepository.findById(id);
        if (optional.isPresent()){
            return optional;
        } else {
            throw new NoSuchElementException("No such item exists");
        }
    }

    public Page<Item> getItemsByCategoryId(int page, int size, ItemSort sort, Sort.Direction direction, long categoryId) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        return itemRepository.findByCategoryId(categoryId, pageable);
    }

    public Page<Item> getItemsByCategoryIds(int page, int size, ItemSort sort, Sort.Direction direction, long[] categoryIds) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        return itemRepository.findAllByCategoryIdIn(categoryIds, pageable);
    }

    public Page<Item> getItemsByCategoryOrSubcategoryIds(int page, int size, ItemSort sort, Sort.Direction direction, long[] categoryIds, long[] subcategoryIds) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        return itemRepository.findAllByCategoryIdInOrSubcategoryIdIn(categoryIds, subcategoryIds, pageable);
    }

    public Page<Item> getFilteredItems(int page, int size, ItemSort sort, Sort.Direction direction, long[] categoryIds, long[] subcategoryIds, double minPrice, double maxPrice) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        return itemRepository.getFilteredItems(categoryIds, subcategoryIds, minPrice, maxPrice, pageable);
    }

}
