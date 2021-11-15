package com.example.auctionapp.payload;

public class AuthResponse {
    private String token;
    private Long id;
    private String name;
    private String surname;
    private String email;

    public AuthResponse(String token, Long id, String name, String surname, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
}

