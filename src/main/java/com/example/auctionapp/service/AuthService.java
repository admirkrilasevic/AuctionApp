package com.example.auctionapp.service;

import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.AuthRequest;
import com.example.auctionapp.payload.AuthResponse;
import com.example.auctionapp.payload.RegisterRequest;
import com.example.auctionapp.repository.UserRepository;
import com.example.auctionapp.security.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
@AllArgsConstructor
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    public AuthResponse login(AuthRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();
        AuthResponse response = new AuthResponse(jwtToken,
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getGender(),
                user.getDateOfBirth(),
                user.getPhoneNumber(),
                user.getPhoto());

        return response;
    }

    public ResponseEntity<?> register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        User user = new User(registerRequest.getName(),
                registerRequest.getSurname(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()),
                "USER");

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
