package com.portfolio.ikea.service;

import com.portfolio.ikea.dto.SignupRequest;
import com.portfolio.ikea.dto.SignupResponse;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.exception.DuplicateEmailException;
import com.portfolio.ikea.exception.PasswordMismatchException;
import com.portfolio.ikea.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// 회원가입 같은 회원 관련 기능을 처리하는 곳
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new PasswordMismatchException();
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException();
        }

        // 비밀번호는 그대로 저장하지 않고 암호화해서 저장
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .build();

        User savedUser = userRepository.save(user);
        return SignupResponse.from(savedUser);
    }
}
