package hrms.dto;

import java.time.LocalDateTime;

public class AssetResponseDto {

    private Long id;
    private String serialNumber;
    private String tagCode;
    private String assetTypeName;
    private boolean returnable;
    private boolean available;
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getTagCode() { return tagCode; }
    public void setTagCode(String tagCode) { this.tagCode = tagCode; }

    public String getAssetTypeName() { return assetTypeName; }
    public void setAssetTypeName(String assetTypeName) { this.assetTypeName = assetTypeName; }

    public boolean isReturnable() { return returnable; }
    public void setReturnable(boolean returnable) { this.returnable = returnable; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}