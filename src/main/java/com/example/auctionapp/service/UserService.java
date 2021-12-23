package com.example.auctionapp.service;

import com.example.auctionapp.model.Address;
import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.UpdateRequest;
import com.example.auctionapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /*UserDetailsService interface requires implementation of loadUserByUsername,
    although users are loaded by email, so there is a separate loadUserByEmail method*/

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist"));
    }

    public UserDetails loadUserByEmail(String email){
        return loadUserByUsername(email);
    }

    public ResponseEntity<?> updateUser(UpdateRequest updateRequest) {
        User user = userRepository.getById(updateRequest.getId());
        user.setName(updateRequest.getName());
        user.setSurname(updateRequest.getSurname());
        user.setEmail(updateRequest.getEmail());
        user.setGender(updateRequest.getGender());
        user.setDateOfBirth(updateRequest.getDateOfBirth());
        user.setPhoneNumber(updateRequest.getPhoneNumber());
        user.setPhoto(updateRequest.getPhoto());
        Address address = new Address(
                updateRequest.getId(),
                updateRequest.getStreet(),
                updateRequest.getCity(),
                updateRequest.getZipCode(),
                updateRequest.getState(),
                updateRequest.getCountry());
        if (updateRequest.getAddressId() != null) {
            address.setId(updateRequest.getAddressId());
        }
        user.setAddress(address);
        userRepository.save(user);
        return ResponseEntity.ok("User updated");
    }

}