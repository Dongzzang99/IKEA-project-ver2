package com.portfolio.ikea.service;

import com.portfolio.ikea.config.JwtTokenProvider;
import com.portfolio.ikea.dto.LoginRequest;
import com.portfolio.ikea.dto.LoginResponse;
import com.portfolio.ikea.dto.SignupRequest;
import com.portfolio.ikea.dto.SignupResponse;
import com.portfolio.ikea.entity.User;
import com.portfolio.ikea.exception.DuplicateEmailException;
import com.portfolio.ikea.exception.InvalidLoginException;
import com.portfolio.ikea.exception.PasswordMismatchException;
import com.portfolio.ikea.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// 회원 인증 관련 비즈니스 로직
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new PasswordMismatchException();
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException();
        }

        // 비밀번호는 원문 저장을 피하고 BCrypt 해시로 저장
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .build();

        User savedUser = userRepository.save(user);

        return SignupResponse.from(savedUser);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(InvalidLoginException::new);

        // 입력한 비밀번호와 DB에 저장된 BCrypt 해시값을 비교
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidLoginException();
        }

        // 로그인 성공 시 프론트가 이후 요청에 사용할 JWT 발급
        String accessToken = jwtTokenProvider.createAccessToken(user);

        return LoginResponse.from(user, accessToken);
    }
}
