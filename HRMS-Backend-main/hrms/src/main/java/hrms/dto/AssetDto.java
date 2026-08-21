package hrms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AssetDto {

    @NotBlank(message = "Serial number is required")
    private String serialNumber;

    @NotBlank(message = "Tag code is required")
    private String tagCode;

    @NotNull(message = "Asset type is required")
    private Long assetTypeId;

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getTagCode() { return tagCode; }
    public void setTagCode(String tagCode) { this.tagCode = tagCode; }

    public Long getAssetTypeId() { return assetTypeId; }
    public void setAssetTypeId(Long assetTypeId) { this.assetTypeId = assetTypeId; }
}