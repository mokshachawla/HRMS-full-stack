package hrms.dto;

import jakarta.validation.constraints.NotBlank;

public class DepartmentDto {

    @NotBlank(message = "Department name is required")
    private String name;

    private String location;

    private Long parentId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }
}