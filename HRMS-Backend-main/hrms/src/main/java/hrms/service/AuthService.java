package hrms.service;

import hrms.dto.LoginResponseDto;
import hrms.entity.Employee;
import hrms.exception.EmployeeNotFoundException;
import hrms.repository.EmployeeRepository;
import hrms.security.JwtUtil;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final EmployeeRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            EmployeeRepository repository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDto login(String email, String password) {

        Employee employee = repository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));

        if (!employee.isActive()) {
            throw new DisabledException("Account is deactivated");
        }

        if (!passwordEncoder.matches(password, employee.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String role = employee.getRole().name();
        String accessToken = jwtUtil.generateAccessToken(email, role);
        String refreshToken = jwtUtil.generateRefreshToken(email);

        return new LoginResponseDto(accessToken, refreshToken);
    }

    public LoginResponseDto refresh(String refreshToken) {

        if (!jwtUtil.isTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String email = jwtUtil.extractEmail(refreshToken);

        Employee employee = repository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));

        if (!employee.isActive()) {
            throw new DisabledException("Account is deactivated");
        }

        String role = employee.getRole().name();
        String newAccessToken = jwtUtil.generateAccessToken(email, role);
        String newRefreshToken = jwtUtil.generateRefreshToken(email);

        return new LoginResponseDto(newAccessToken, newRefreshToken);
    }
}