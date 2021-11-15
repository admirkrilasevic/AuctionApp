package com.example.auctionapp.service;

import com.example.auctionapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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


}