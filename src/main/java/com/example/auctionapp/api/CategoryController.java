package com.example.auctionapp.api;

import com.example.auctionapp.model.Category;
import com.example.auctionapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/countinsubcategory/{subcategoryId}")
    public int countItemsInSubcategory(@PathVariable("subcategoryId")long subcategoryId) {
        return categoryService.countItemsInSubcategory(subcategoryId);
    }

}
