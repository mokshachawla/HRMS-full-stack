package hrms.controller;

import hrms.dto.EmployeeResponseDto;
import hrms.dto.Employeedto;
import hrms.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDto> createEmployee(
            @Valid @RequestBody Employeedto dto) {
        return ResponseEntity.ok(service.createEmployee(dto));
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDto>> getEmployees(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(service.getEmployees(keyword, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.getEmployeeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employeedto dto) {
        return ResponseEntity.ok(service.updateEmployee(id, dto));
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateEmployee(@PathVariable Long id) {
        service.deactivateEmployee(id);
        return ResponseEntity.ok("Employee deactivated successfully");
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<String> activateEmployee(@PathVariable Long id) {
        service.activateEmployee(id);
        return ResponseEntity.ok("Employee activated successfully");
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalEmployees() {
        return ResponseEntity.ok(service.getTotalEmployees());
    }
}