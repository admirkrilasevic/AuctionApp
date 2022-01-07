package com.example.auctionapp.api;

import com.example.auctionapp.payload.UserUpdateRequest;
import com.example.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UserUpdateRequest userUpdateRequest) {
        return userService.updateUser(userUpdateRequest);
    }

    @PutMapping("/deactivate")
    public ResponseEntity<?> deactivate(HttpServletRequest httpServletRequest) {
        return userService.deactivateAccount(httpServletRequest);
    }
}
