package com.example.auctionapp.payload;

import java.time.LocalDate;

public class AddItemRequest {

    private String name;
    private Long categoryId;
    private Long subcategoryId;
    private String description;
    private String photo;
    private double startingPrice;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long addressId;
    private String street;
    private String city;
    private String zipCode;
    private String state;
    private String country;

    public AddItemRequest(String name, Long categoryId, Long subcategoryId, String description, String photo, double startingPrice, LocalDate startDate, LocalDate endDate, Long addressId, String street, String city, String zipCode, String state, String country) {
        this.name = name;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.description = description;
        this.photo = photo;
        this.startingPrice = startingPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.addressId = addressId;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
        this.state = state;
        this.country = country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Long subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
