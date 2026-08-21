package hrms.service;

import hrms.dto.*;
import hrms.entity.*;
import hrms.exception.EmployeeNotFoundException;
import hrms.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final PolicyVersionRepository versionRepository;
    private final PolicyAcknowledgementRepository acknowledgementRepository;
    private final PolicyCategoryRepository categoryRepository;
    private final EmployeeRepository employeeRepository;

    public PolicyService(
            PolicyRepository policyRepository,
            PolicyVersionRepository versionRepository,
            PolicyAcknowledgementRepository acknowledgementRepository,
            PolicyCategoryRepository categoryRepository,
            EmployeeRepository employeeRepository) {
        this.policyRepository = policyRepository;
        this.versionRepository = versionRepository;
        this.acknowledgementRepository = acknowledgementRepository;
        this.categoryRepository = categoryRepository;
        this.employeeRepository = employeeRepository;
    }

    public PolicyResponseDto createPolicy(PolicyDto dto) {

        PolicyCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Policy policy = new Policy();
        policy.setTitle(dto.getTitle());
        policy.setCategory(category);
        policyRepository.save(policy);

        PolicyVersion version = new PolicyVersion();
        version.setPolicy(policy);
        version.setContent(dto.getContent());
        version.setVersionNumber(1);
        version.setPublished(false);
        versionRepository.save(version);

        return mapToDto(policy);
    }

    public PolicyResponseDto updatePolicy(Long policyId, PolicyDto dto) {

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        PolicyCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        policy.setTitle(dto.getTitle());
        policy.setCategory(category);
        policyRepository.save(policy);

        Integer latestVersion = versionRepository
                .findTopByPolicyIdOrderByVersionNumberDesc(policyId)
                .map(PolicyVersion::getVersionNumber)
                .orElse(0);

        PolicyVersion newVersion = new PolicyVersion();
        newVersion.setPolicy(policy);
        newVersion.setContent(dto.getContent());
        newVersion.setVersionNumber(latestVersion + 1);
        newVersion.setPublished(false);
        versionRepository.save(newVersion);

        return mapToDto(policy);
    }

    public PolicyResponseDto publishVersion(Long versionId) {

        PolicyVersion version = versionRepository.findById(versionId)
                .orElseThrow(() -> new RuntimeException("Version not found"));

        version.setPublished(true);
        versionRepository.save(version);

        return mapToDto(version.getPolicy());
    }

    public PolicyResponseDto unpublishVersion(Long versionId) {

        PolicyVersion version = versionRepository.findById(versionId)
                .orElseThrow(() -> new RuntimeException("Version not found"));

        version.setPublished(false);
        versionRepository.save(version);

        return mapToDto(version.getPolicy());
    }

    public List<PolicyResponseDto> getAllPolicies() {
        return policyRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<PolicyVersionDto> getVersionHistory(Long policyId) {
        return versionRepository
                .findByPolicyIdOrderByVersionNumberDesc(policyId)
                .stream()
                .map(this::mapVersionToDto)
                .collect(Collectors.toList());
    }

    public List<PolicyResponseDto> getPublishedPolicies() {
        return policyRepository.findAll()
                .stream()
                .filter(p -> p.getVersions().stream().anyMatch(PolicyVersion::isPublished))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void acknowledgePolicy(Long versionId, String email) {

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));

        PolicyVersion version = versionRepository.findById(versionId)
                .orElseThrow(() -> new RuntimeException("Policy version not found"));

        if (!version.isPublished()) {
            throw new RuntimeException("Cannot acknowledge an unpublished policy");
        }

        if (acknowledgementRepository.existsByEmployeeIdAndPolicyVersionId(
                employee.getId(), versionId)) {
            throw new RuntimeException("You have already acknowledged this policy version");
        }

        PolicyAcknowledgement ack = new PolicyAcknowledgement();
        ack.setEmployee(employee);
        ack.setPolicyVersion(version);
        acknowledgementRepository.save(ack);
    }

    public PolicyCategory createCategory(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new RuntimeException("Category already exists");
        }
        PolicyCategory category = new PolicyCategory();
        category.setName(name);
        return categoryRepository.save(category);
    }

    public List<PolicyCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    private PolicyResponseDto mapToDto(Policy policy) {
        PolicyResponseDto dto = new PolicyResponseDto();
        dto.setId(policy.getId());
        dto.setTitle(policy.getTitle());
        dto.setCategoryName(policy.getCategory().getName());
        dto.setCreatedAt(policy.getCreatedAt());
        dto.setUpdatedAt(policy.getUpdatedAt());
        dto.setVersions(
                versionRepository.findByPolicyIdOrderByVersionNumberDesc(policy.getId())
                        .stream()
                        .map(this::mapVersionToDto)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    private PolicyVersionDto mapVersionToDto(PolicyVersion version) {
        PolicyVersionDto dto = new PolicyVersionDto();
        dto.setId(version.getId());
        dto.setVersionNumber(version.getVersionNumber());
        dto.setContent(version.getContent());
        dto.setPublished(version.isPublished());
        dto.setCreatedAt(version.getCreatedAt());
        return dto;
    }
}