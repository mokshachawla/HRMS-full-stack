package hrms.service;

import hrms.dto.*;
import hrms.entity.*;
import hrms.exception.EmployeeNotFoundException;
import hrms.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final AssetTypeRepository assetTypeRepository;
    private final AssetAssignmentRepository assignmentRepository;
    private final EmployeeRepository employeeRepository;

    public AssetService(
            AssetRepository assetRepository,
            AssetTypeRepository assetTypeRepository,
            AssetAssignmentRepository assignmentRepository,
            EmployeeRepository employeeRepository) {
        this.assetRepository = assetRepository;
        this.assetTypeRepository = assetTypeRepository;
        this.assignmentRepository = assignmentRepository;
        this.employeeRepository = employeeRepository;
    }

    public AssetType createAssetType(AssetTypeDto dto) {
        if (assetTypeRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Asset type already exists");
        }
        AssetType type = new AssetType();
        type.setName(dto.getName());
        type.setDescription(dto.getDescription());
        type.setReturnable(dto.isReturnable());
        return assetTypeRepository.save(type);
    }

    public List<AssetType> getAllAssetTypes() {
        return assetTypeRepository.findAll();
    }

    public AssetResponseDto addAsset(AssetDto dto) {
        AssetType type = assetTypeRepository.findById(dto.getAssetTypeId())
                .orElseThrow(() -> new RuntimeException("Asset type not found"));

        Asset asset = new Asset();
        asset.setSerialNumber(dto.getSerialNumber());
        asset.setTagCode(dto.getTagCode());
        asset.setAssetType(type);

        return mapToAssetDto(assetRepository.save(asset));
    }

    public List<AssetResponseDto> getAllAssets(Long assetTypeId, Boolean available) {
        List<Asset> assets;

        if (assetTypeId != null && available != null) {
            assets = assetRepository.findByAssetTypeIdAndAvailable(assetTypeId, available);
        } else if (assetTypeId != null) {
            assets = assetRepository.findByAssetTypeId(assetTypeId);
        } else if (available != null) {
            assets = assetRepository.findByAvailable(available);
        } else {
            assets = assetRepository.findAll();
        }

        return assets.stream().map(this::mapToAssetDto).collect(Collectors.toList());
    }

    public AssetAssignmentResponseDto issueAsset(AssetAssignmentDto dto) {

        Asset asset = assetRepository.findById(dto.getAssetId())
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        if (!asset.isAvailable()) {
            throw new RuntimeException("Asset is already issued to another employee");
        }

        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));

        asset.setAvailable(false);
        assetRepository.save(asset);

        AssetAssignment assignment = new AssetAssignment();
        assignment.setAsset(asset);
        assignment.setEmployee(employee);
        assignmentRepository.save(assignment);

        return mapToAssignmentDto(assignment);
    }

    public AssetAssignmentResponseDto returnAsset(AssetReturnDto dto) {

        AssetAssignment assignment = assignmentRepository.findById(dto.getAssignmentId())
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        if (assignment.getReturnedAt() != null) {
            throw new RuntimeException("Asset already returned");
        }

        if (!assignment.getAsset().getAssetType().isReturnable()) {
            throw new RuntimeException("This asset type is non-returnable");
        }

        assignment.setReturnedAt(java.time.LocalDateTime.now());
        assignment.setReturnCondition(dto.getCondition());
        assignment.getAsset().setAvailable(true);
        assetRepository.save(assignment.getAsset());
        assignmentRepository.save(assignment);

        return mapToAssignmentDto(assignment);
    }

    public List<AssetAssignmentResponseDto> getEmployeeAssets(String email) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));

        return assignmentRepository.findByEmployeeId(employee.getId())
                .stream()
                .map(this::mapToAssignmentDto)
                .collect(Collectors.toList());
    }

    public List<AssetAssignmentResponseDto> getAssetHistory(Long assetId) {
        return assignmentRepository.findByAssetId(assetId)
                .stream()
                .map(this::mapToAssignmentDto)
                .collect(Collectors.toList());
    }

    private AssetResponseDto mapToAssetDto(Asset asset) {
        AssetResponseDto dto = new AssetResponseDto();
        dto.setId(asset.getId());
        dto.setSerialNumber(asset.getSerialNumber());
        dto.setTagCode(asset.getTagCode());
        dto.setAssetTypeName(asset.getAssetType().getName());
        dto.setReturnable(asset.getAssetType().isReturnable());
        dto.setAvailable(asset.isAvailable());
        dto.setCreatedAt(asset.getCreatedAt());
        return dto;
    }

    private AssetAssignmentResponseDto mapToAssignmentDto(AssetAssignment assignment) {
        AssetAssignmentResponseDto dto = new AssetAssignmentResponseDto();
        dto.setId(assignment.getId());
        dto.setAssetId(assignment.getAsset().getId());
        dto.setSerialNumber(assignment.getAsset().getSerialNumber());
        dto.setTagCode(assignment.getAsset().getTagCode());
        dto.setAssetTypeName(assignment.getAsset().getAssetType().getName());
        dto.setEmployeeId(assignment.getEmployee().getId());
        dto.setEmployeeName(assignment.getEmployee().getFirstName()
                + " " + assignment.getEmployee().getLastName());
        dto.setIssuedAt(assignment.getIssuedAt());
        dto.setReturnedAt(assignment.getReturnedAt());
        dto.setReturnCondition(assignment.getReturnCondition());
        return dto;
    }
}