package hrms.controller;

import hrms.dto.*;
import hrms.entity.AssetType;
import hrms.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    @PostMapping("/types")
    public ResponseEntity<AssetType> createAssetType(
            @Valid @RequestBody AssetTypeDto dto) {
        return ResponseEntity.ok(service.createAssetType(dto));
    }

    @GetMapping("/types")
    public ResponseEntity<List<AssetType>> getAllAssetTypes() {
        return ResponseEntity.ok(service.getAllAssetTypes());
    }

    @PostMapping
    public ResponseEntity<AssetResponseDto> addAsset(
            @Valid @RequestBody AssetDto dto) {
        return ResponseEntity.ok(service.addAsset(dto));
    }

    @GetMapping
    public ResponseEntity<List<AssetResponseDto>> getAllAssets(
            @RequestParam(required = false) Long assetTypeId,
            @RequestParam(required = false) Boolean available) {
        return ResponseEntity.ok(service.getAllAssets(assetTypeId, available));
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<AssetAssignmentResponseDto>> getAssetHistory(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetHistory(id));
    }

    @PostMapping("/issue")
    public ResponseEntity<AssetAssignmentResponseDto> issueAsset(
            @Valid @RequestBody AssetAssignmentDto dto) {
        return ResponseEntity.ok(service.issueAsset(dto));
    }

    @PatchMapping("/return")
    public ResponseEntity<AssetAssignmentResponseDto> returnAsset(
            @Valid @RequestBody AssetReturnDto dto) {
        return ResponseEntity.ok(service.returnAsset(dto));
    }

    @GetMapping("/my")
    public ResponseEntity<List<AssetAssignmentResponseDto>> getMyAssets(
            Authentication authentication) {
        return ResponseEntity.ok(service.getEmployeeAssets(authentication.getName()));
    }
}