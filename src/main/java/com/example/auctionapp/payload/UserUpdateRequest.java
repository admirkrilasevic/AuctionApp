package com.example.auctionapp.payload;

import java.time.LocalDate;

public class UserUpdateRequest {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String gender;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String photo;

    private Long addressId;
    private String street;
    private String city;
    private String zipCode;
    private String state;
    private String country;

    public UserUpdateRequest(Long id, String name, String surname, String email, String gender, LocalDate dateOfBirth, String phoneNumber, String photo, Long addressId, String street, String city, String zipCode, String state, String country) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.photo = photo;
        this.addressId = addressId;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
        this.state = state;
        this.country = country;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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
