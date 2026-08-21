package hrms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AssetReturnDto {

    @NotNull(message = "Assignment ID is required")
    private Long assignmentId;

    @NotBlank(message = "Condition is required — Good / Damaged / Lost")
    private String condition;

    public Long getAssignmentId() { return assignmentId; }
    public void setAssignmentId(Long assignmentId) { this.assignmentId = assignmentId; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
}