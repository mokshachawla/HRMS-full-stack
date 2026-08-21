package hrms.service;

import hrms.dto.DepartmentDto;
import hrms.dto.DepartmentResponseDto;
import hrms.entity.Department;
import hrms.exception.DepartmentNotFoundException;
import hrms.repository.DepartmentRepository;
import hrms.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;
    private final EmployeeRepository employeeRepository;

    public DepartmentService(
            DepartmentRepository repository,
            EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.employeeRepository = employeeRepository;
    }

    public DepartmentResponseDto createDepartment(DepartmentDto dto) {

        Department department = new Department();
        department.setName(dto.getName());
        department.setLocation(dto.getLocation());

        if (dto.getParentId() != null) {
            Department parent = repository.findById(dto.getParentId())
                    .orElseThrow(() -> new DepartmentNotFoundException("Parent department not found"));
            department.setParent(parent);
        }

        return mapToDto(repository.save(department));
    }

    public List<DepartmentResponseDto> getAllDepartments() {
        return repository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<DepartmentResponseDto> getDepartmentTree() {
        return repository.findByParentIsNull()
                .stream()
                .map(this::mapToTreeDto)
                .collect(Collectors.toList());
    }

    public DepartmentResponseDto getDepartmentById(Long id) {
        Department department = repository.findById(id)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id: " + id));
        return mapToDto(department);
    }

    public DepartmentResponseDto updateDepartment(Long id, DepartmentDto dto) {

        Department department = repository.findById(id)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id: " + id));

        department.setName(dto.getName());
        department.setLocation(dto.getLocation());

        if (dto.getParentId() != null) {
            Department parent = repository.findById(dto.getParentId())
                    .orElseThrow(() -> new DepartmentNotFoundException("Parent department not found"));
            department.setParent(parent);
        } else {
            department.setParent(null);
        }

        return mapToDto(repository.save(department));
    }

    public Long getEmployeeCount(Long id) {
        repository.findById(id)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id: " + id));
        return employeeRepository.countByDepartmentId(id);
    }

    public void deleteDepartment(Long id) {
        Department department = repository.findById(id)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id: " + id));

        if (employeeRepository.countByDepartmentId(id) > 0) {
            throw new RuntimeException("Cannot delete department with existing employees");
        }

        if (!department.getChildren().isEmpty()) {
            throw new RuntimeException("Cannot delete department with sub-departments");
        }

        repository.delete(department);
    }

    private DepartmentResponseDto mapToDto(Department department) {
        DepartmentResponseDto dto = new DepartmentResponseDto();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setLocation(department.getLocation());

        if (department.getParent() != null) {
            dto.setParentId(department.getParent().getId());
            dto.setParentName(department.getParent().getName());
        }

        return dto;
    }

    private DepartmentResponseDto mapToTreeDto(Department department) {
        DepartmentResponseDto dto = mapToDto(department);
        dto.setChildren(
                department.getChildren()
                        .stream()
                        .map(this::mapToTreeDto)
                        .collect(Collectors.toList())
        );
        return dto;
    }
}