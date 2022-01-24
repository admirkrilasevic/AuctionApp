package com.example.auctionapp.service;

import com.example.auctionapp.enumeration.ItemSort;
import com.example.auctionapp.model.Address;
import com.example.auctionapp.model.Category;
import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.AddItemRequest;
import com.example.auctionapp.repository.AddressRepository;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.model.Item;
import com.example.auctionapp.security.JwtUtils;
import lombok.AllArgsConstructor;
import org.jline.utils.Levenshtein;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserService userService;

    @Autowired
    AddressRepository addressRepository;

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

    public Page<Item> getFilteredItems(String search, int page, int size, ItemSort sort, Sort.Direction direction, Long[] categoryIds, long[] subcategoryIds, double minPrice, double maxPrice) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        if (categoryIds.length == 1 && subcategoryIds.length == 0){
            if (categoryIds[0] == 0) {
                categoryIds = getCategoryIds();
            }
        } else if (categoryIds.length == 0 && subcategoryIds.length == 0){
            categoryIds = getCategoryIds();
        }
        if (search.isBlank()) {
            return itemRepository.getFilteredItems(categoryIds, subcategoryIds, minPrice, maxPrice, pageable);
        } else {
            return itemRepository.getFilteredItemsWithSearch(search.toLowerCase(), categoryIds, subcategoryIds, minPrice, maxPrice, pageable);
        }
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

    public ResponseEntity<?> addItem(HttpServletRequest httpServletRequest, AddItemRequest addItemRequest) {
        String token = jwtUtils.getToken(httpServletRequest);
        User user = (User) userService.loadUserByEmail(jwtUtils.getEmailFromJwtToken(token));
        Long addressId;
        if (addItemRequest.getAddressId() == null) {
            Address address = new Address(user.getId(), addItemRequest.getStreet(), addItemRequest.getCity(),
                    addItemRequest.getZipCode(), addItemRequest.getState(), addItemRequest.getCountry());
            Address savedAddress = addressRepository.save(address);
            addressId = savedAddress.getId();
        } else {
            addressId = addItemRequest.getAddressId();
        }
        Item item = new Item(user.getId(), addItemRequest.getName(),
                addItemRequest.getCategoryId(), addItemRequest.getSubcategoryId(), addItemRequest.getDescription(),
                addItemRequest.getPhoto(), addItemRequest.getStartingPrice(), addItemRequest.getStartDate(),
                addItemRequest.getEndDate(), addressId);
        Item savedItem = itemRepository.save(item);
        return ResponseEntity.ok().body(savedItem.getName());
    }

    public List<Item> getRecommendedProducts(Long categoryId, String name) {
        return itemRepository.getRecommendedProducts(categoryId, name);
    }

    public List<String> getItemsByLevenshteinDistance(String searchText) {
        return itemRepository.getItemsByLevenshteinDistance(searchText.toLowerCase());
    }

    public Set<String> getSearchSuggestions(String searchText) {
        List<Item> allItems = getAllItems();
        Set<String> suggestions = allItems.stream()
                .map(item -> item.getName())
                .filter(names -> Arrays.stream(names.split(" "))
                        .anyMatch(name -> isSimilarName(name, searchText)))
                .limit(3)
                .collect(Collectors.toSet());
        return suggestions;
    }

    private boolean isSimilarName(String name, String searchString) {
        int distance = Levenshtein.distance(name.toLowerCase(), searchString.toLowerCase());
        return distance > 0 && distance < 2;
    }

}
