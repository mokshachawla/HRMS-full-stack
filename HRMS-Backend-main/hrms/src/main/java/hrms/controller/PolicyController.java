package hrms.controller;

import hrms.dto.*;
import hrms.entity.PolicyCategory;
import hrms.service.PolicyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policies")
public class PolicyController {

    private final PolicyService service;

    public PolicyController(PolicyService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PolicyResponseDto> createPolicy(
            @Valid @RequestBody PolicyDto dto) {
        return ResponseEntity.ok(service.createPolicy(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PolicyResponseDto> updatePolicy(
            @PathVariable Long id,
            @Valid @RequestBody PolicyDto dto) {
        return ResponseEntity.ok(service.updatePolicy(id, dto));
    }

    @GetMapping
    public ResponseEntity<List<PolicyResponseDto>> getAllPolicies() {
        return ResponseEntity.ok(service.getAllPolicies());
    }

    @GetMapping("/published")
    public ResponseEntity<List<PolicyResponseDto>> getPublishedPolicies() {
        return ResponseEntity.ok(service.getPublishedPolicies());
    }

    @GetMapping("/{id}/versions")
    public ResponseEntity<List<PolicyVersionDto>> getVersionHistory(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.getVersionHistory(id));
    }

    @PatchMapping("/versions/{versionId}/publish")
    public ResponseEntity<PolicyResponseDto> publishVersion(
            @PathVariable Long versionId) {
        return ResponseEntity.ok(service.publishVersion(versionId));
    }

    @PatchMapping("/versions/{versionId}/unpublish")
    public ResponseEntity<PolicyResponseDto> unpublishVersion(
            @PathVariable Long versionId) {
        return ResponseEntity.ok(service.unpublishVersion(versionId));
    }

    @PostMapping("/versions/{versionId}/acknowledge")
    public ResponseEntity<String> acknowledgePolicy(
            @PathVariable Long versionId,
            Authentication authentication) {
        service.acknowledgePolicy(versionId, authentication.getName());
        return ResponseEntity.ok("Policy acknowledged successfully");
    }

    @PostMapping("/categories")
    public ResponseEntity<PolicyCategory> createCategory(
            @RequestParam String name) {
        return ResponseEntity.ok(service.createCategory(name));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<PolicyCategory>> getAllCategories() {
        return ResponseEntity.ok(service.getAllCategories());
    }
}