package hrms.service;

import hrms.dto.DashboardDto;
import hrms.repository.*;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final PolicyRepository policyRepository;
    private final AssetRepository assetRepository;

    public DashboardService(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository,
            PolicyRepository policyRepository,
            AssetRepository assetRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.policyRepository = policyRepository;
        this.assetRepository = assetRepository;
    }

    public DashboardDto getStats() {

        DashboardDto dto = new DashboardDto();

        dto.setTotalEmployees(employeeRepository.count());
        dto.setActiveEmployees(employeeRepository.countByActiveTrue());
        dto.setInactiveEmployees(employeeRepository.countByActiveFalse());

        dto.setTotalDepartments(departmentRepository.count());

        dto.setTotalPolicies(policyRepository.count());
        dto.setPublishedPolicies(policyRepository.countPublishedPolicies());

        dto.setTotalAssets(assetRepository.count());
        dto.setAvailableAssets(assetRepository.countByAvailableTrue());
        dto.setIssuedAssets(assetRepository.countByAvailableFalse());

        return dto;
    }
}