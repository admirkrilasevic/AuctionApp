package com.example.auctionapp.service;

import com.example.auctionapp.enumeration.ItemSort;
import com.example.auctionapp.model.Category;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.model.Item;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    CategoryService categoryService;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Page<Item> getItems(int page, int size, ItemSort sort, Sort.Direction direction) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        return itemRepository.getItems(pageable);
    }

    public Optional<Item> getItemById(long id) {
        Optional<Item> optional = itemRepository.findById(id);
        if (optional.isPresent()){
            return optional;
        } else {
            throw new NoSuchElementException("No such item exists");
        }
    }

    public Page<Item> getFilteredItems(int page, int size, ItemSort sort, Sort.Direction direction, Long[] categoryIds, long[] subcategoryIds, double minPrice, double maxPrice) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        if (categoryIds.length == 1 && subcategoryIds.length == 0){
            if (categoryIds[0] == 0) {
                categoryIds = getCategoryIds();
            }
        } else if (categoryIds.length == 0 && subcategoryIds.length == 0){
            categoryIds = getCategoryIds();
        }
        return itemRepository.getFilteredItems(categoryIds, subcategoryIds, minPrice, maxPrice, pageable);
    }

    private Long[] getCategoryIds() {
        Long[] categoryIds;
        List<Category> categories = categoryService.getAllCategories();
        List<Long> categoryIdList = new ArrayList<>();
        for (Category category : categories) {
            categoryIdList.add(category.getId());
        }
        categoryIds = categoryIdList.toArray(new Long[categoryIdList.size()]);
        return categoryIds;
    }

    public List<Item> getItemsByUserId(Long userId) {
        return itemRepository.getItemsByUserId(userId);
    }

    public List<Item> getItemsByBidUserId(Long userId) {
        return itemRepository.getItemsByBidUserId(userId);
    }

}
