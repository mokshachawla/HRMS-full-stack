package hrms.controller;

import hrms.dto.EmployeeResponseDto;
import hrms.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final EmployeeService service;

    public ProfileController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping("/me")
    public ResponseEntity<EmployeeResponseDto> getMyProfile(
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(service.getMyProfile(email));
    }
}