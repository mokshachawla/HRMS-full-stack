package hrms.controller;

import hrms.dto.AssetTypeDto;
import hrms.service.AssetTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asset-types")
@CrossOrigin(origins = "http://localhost:5173")
public class AssetTypeController {

    private final AssetTypeService service;

    public AssetTypeController(AssetTypeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<AssetTypeDto>> getAllAssetTypes() {
        return ResponseEntity.ok(service.getAllAssetTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetTypeDto> getAssetTypeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getAssetTypeById(id)
        );
    }

    @PostMapping
    public ResponseEntity<AssetTypeDto> createAssetType(
            @RequestBody AssetTypeDto dto) {

        return ResponseEntity.ok(
                service.createAssetType(dto)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetTypeDto> updateAssetType(
            @PathVariable Long id,
            @RequestBody AssetTypeDto dto) {

        return ResponseEntity.ok(
                service.updateAssetType(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssetType(
            @PathVariable Long id) {

        service.deleteAssetType(id);

        return ResponseEntity.noContent().build();
    }

}