package hrms.service;

import hrms.dto.AssetTypeDto;
import hrms.entity.AssetType;
import hrms.repository.AssetTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetTypeService {

    private final AssetTypeRepository repository;

    public AssetTypeService(AssetTypeRepository repository) {
        this.repository = repository;
    }

    // ==========================
    // CREATE
    // ==========================

    public AssetTypeDto createAssetType(AssetTypeDto dto) {

        AssetType assetType = new AssetType();

        assetType.setName(dto.getName());
        assetType.setDescription(dto.getDescription());
        assetType.setReturnable(dto.isReturnable());

        AssetType saved = repository.save(assetType);

        return mapToDto(saved);

    }

    // ==========================
    // GET ALL
    // ==========================

    public List<AssetTypeDto> getAllAssetTypes() {

        return repository.findAll()

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());

    }

    // ==========================
    // GET BY ID
    // ==========================

    public AssetTypeDto getAssetTypeById(Long id) {

        AssetType assetType = repository.findById(id)

                .orElseThrow(() ->

                        new RuntimeException("Asset Type not found"));

        return mapToDto(assetType);

    }

    // ==========================
    // UPDATE
    // ==========================

    public AssetTypeDto updateAssetType(Long id,

                                        AssetTypeDto dto) {

        AssetType assetType = repository.findById(id)

                .orElseThrow(() ->

                        new RuntimeException("Asset Type not found"));

        assetType.setName(dto.getName());
        assetType.setDescription(dto.getDescription());
        assetType.setReturnable(dto.isReturnable());

        AssetType updated = repository.save(assetType);

        return mapToDto(updated);

    }

    // ==========================
    // DELETE
    // ==========================

    public void deleteAssetType(Long id) {

        repository.deleteById(id);

    }

    // ==========================
    // ENTITY → DTO
    // ==========================

    private AssetTypeDto mapToDto(AssetType assetType) {

        AssetTypeDto dto = new AssetTypeDto();

        dto.setId(assetType.getId());
        dto.setName(assetType.getName());
        dto.setDescription(assetType.getDescription());
        dto.setReturnable(assetType.isReturnable());

        return dto;

    }

}