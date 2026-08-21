package hrms.dto;

public class DashboardDto {

    private Long totalEmployees;
    private Long activeEmployees;
    private Long inactiveEmployees;
    private Long totalDepartments;
    private Long totalPolicies;
    private Long publishedPolicies;
    private Long totalAssets;
    private Long availableAssets;
    private Long issuedAssets;

    public Long getTotalEmployees() { return totalEmployees; }
    public void setTotalEmployees(Long totalEmployees) { this.totalEmployees = totalEmployees; }

    public Long getActiveEmployees() { return activeEmployees; }
    public void setActiveEmployees(Long activeEmployees) { this.activeEmployees = activeEmployees; }

    public Long getInactiveEmployees() { return inactiveEmployees; }
    public void setInactiveEmployees(Long inactiveEmployees) { this.inactiveEmployees = inactiveEmployees; }

    public Long getTotalDepartments() { return totalDepartments; }
    public void setTotalDepartments(Long totalDepartments) { this.totalDepartments = totalDepartments; }

    public Long getTotalPolicies() { return totalPolicies; }
    public void setTotalPolicies(Long totalPolicies) { this.totalPolicies = totalPolicies; }

    public Long getPublishedPolicies() { return publishedPolicies; }
    public void setPublishedPolicies(Long publishedPolicies) { this.publishedPolicies = publishedPolicies; }

    public Long getTotalAssets() { return totalAssets; }
    public void setTotalAssets(Long totalAssets) { this.totalAssets = totalAssets; }

    public Long getAvailableAssets() { return availableAssets; }
    public void setAvailableAssets(Long availableAssets) { this.availableAssets = availableAssets; }

    public Long getIssuedAssets() { return issuedAssets; }
    public void setIssuedAssets(Long issuedAssets) { this.issuedAssets = issuedAssets; }
}