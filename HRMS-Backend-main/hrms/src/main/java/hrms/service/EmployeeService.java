package hrms.service;

import hrms.dto.DepartmentResponseDto;
import hrms.dto.EmployeeResponseDto;
import hrms.dto.Employeedto;
import hrms.entity.Department;
import hrms.entity.Employee;
import hrms.exception.DepartmentNotFoundException;
import hrms.exception.EmployeeNotFoundException;
import hrms.repository.DepartmentRepository;
import hrms.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(
            EmployeeRepository repository,
            DepartmentRepository departmentRepository,
            PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public EmployeeResponseDto createEmployee(Employeedto dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (repository.existsByEmployeeCode(dto.getEmployeeCode())) {
            throw new RuntimeException("Employee code already exists");
        }

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found"));

        Employee employee = new Employee();
        employee.setEmployeeCode(dto.getEmployeeCode());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setSalary(dto.getSalary());
        employee.setRole(dto.getRole());
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        employee.setDepartment(department);

        return mapToDto(repository.save(employee));
    }

    public Page<EmployeeResponseDto> getEmployees(String keyword, Pageable pageable) {
        if (keyword != null && !keyword.isBlank()) {
            return repository.searchEmployees(keyword, pageable).map(this::mapToDto);
        }
        return repository.findAll(pageable).map(this::mapToDto);
    }

    public EmployeeResponseDto getEmployeeById(Long id) {
        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        return mapToDto(employee);
    }

    public EmployeeResponseDto getEmployeeByEmail(String email) {
        Employee employee = repository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with email: " + email));
        return mapToDto(employee);
    }

    public EmployeeResponseDto updateEmployee(Long id, Employeedto dto) {

        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found"));

        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setSalary(dto.getSalary());
        employee.setRole(dto.getRole());
        employee.setDepartment(department);

        return mapToDto(repository.save(employee));
    }

    public void deactivateEmployee(Long id) {
        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        employee.setActive(false);
        repository.save(employee);
    }

    public void activateEmployee(Long id) {
        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        employee.setActive(true);
        repository.save(employee);
    }

    public EmployeeResponseDto getMyProfile(String email) {
        Employee employee = repository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
        return mapToDto(employee);
    }

    public Long getTotalEmployees() {
        return repository.count();
    }

    private EmployeeResponseDto mapToDto(Employee employee) {

        DepartmentResponseDto departmentDto = new DepartmentResponseDto();
        departmentDto.setId(employee.getDepartment().getId());
        departmentDto.setName(employee.getDepartment().getName());
        departmentDto.setLocation(employee.getDepartment().getLocation());

        EmployeeResponseDto dto = new EmployeeResponseDto();
        dto.setId(employee.getId());
        dto.setEmployeeCode(employee.getEmployeeCode());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        dto.setSalary(employee.getSalary());
        dto.setRole(employee.getRole());
        dto.setActive(employee.isActive());
        dto.setDepartment(departmentDto);

        return dto;
    }
}