package hrms.controller;

import hrms.dto.LoginRequestDto;
import hrms.dto.LoginResponseDto;
import hrms.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @RequestBody LoginRequestDto request) {

        LoginResponseDto response = service.login(
                request.getEmail(),
                request.getPassword());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDto> refresh(
            @RequestBody String refreshToken) {

        LoginResponseDto response = service.refresh(refreshToken);
        return ResponseEntity.ok(response);
    }
}