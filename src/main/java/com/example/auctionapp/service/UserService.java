package com.example.auctionapp.service;

import com.example.auctionapp.model.Address;
import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.UserUpdateRequest;
import com.example.auctionapp.repository.UserRepository;
import com.example.auctionapp.security.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    /*UserDetailsService interface requires implementation of loadUserByUsername,
    although users are loaded by email, so there is a separate loadUserByEmail method*/

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist"));
    }

    public UserDetails loadUserByEmail(String email){
        return loadUserByUsername(email);
    }

    public ResponseEntity<?> updateUser(UserUpdateRequest userUpdateRequest) {
        User user = userRepository.getById(userUpdateRequest.getId());
        user.setName(userUpdateRequest.getName());
        user.setSurname(userUpdateRequest.getSurname());
        user.setEmail(userUpdateRequest.getEmail());
        user.setGender(userUpdateRequest.getGender());
        user.setDateOfBirth(userUpdateRequest.getDateOfBirth());
        user.setPhoneNumber(userUpdateRequest.getPhoneNumber());
        user.setPhoto(userUpdateRequest.getPhoto());
        if (userUpdateRequest.getStreet() != null &&
            userUpdateRequest.getCity() != null &&
            userUpdateRequest.getZipCode() != null &&
            userUpdateRequest.getState() != null &&
            userUpdateRequest.getCountry() != null) {
                Address address = new Address(
                        userUpdateRequest.getId(),
                        userUpdateRequest.getStreet(),
                        userUpdateRequest.getCity(),
                        userUpdateRequest.getZipCode(),
                        userUpdateRequest.getState(),
                        userUpdateRequest.getCountry());
                if (userUpdateRequest.getAddressId() != null) {
                    address.setId(userUpdateRequest.getAddressId());
                }
                user.setAddress(address);
        }
        userRepository.save(user);
        return ResponseEntity.ok("User updated");
    }

    public ResponseEntity<?> deactivateAccount(HttpServletRequest httpServletRequest) {
        String token = jwtUtils.getToken(httpServletRequest);
        User user = (User) loadUserByEmail(jwtUtils.getEmailFromJwtToken(token));
        user.setDeactivated(true);
        userRepository.save(user);
        return ResponseEntity.ok("User account deactivated");
    }

}