package com.example.auctionapp.api;

import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.AuthRequest;
import com.example.auctionapp.payload.AuthResponse;
import com.example.auctionapp.payload.RegisterRequest;
import com.example.auctionapp.repository.UserRepository;
import com.example.auctionapp.security.JwtUtils;
import com.example.auctionapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    AuthService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        return ResponseEntity.ok(authenticationService.login(authenticationRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return authenticationService.register(registerRequest);
    }

}
