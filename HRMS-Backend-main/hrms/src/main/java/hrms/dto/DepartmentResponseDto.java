package hrms.dto;

import java.util.List;

public class DepartmentResponseDto {

    private Long id;
    private String name;
    private String location;
    private Long parentId;
    private String parentName;
    private List<DepartmentResponseDto> children;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public List<DepartmentResponseDto> getChildren() { return children; }
    public void setChildren(List<DepartmentResponseDto> children) { this.children = children; }
}