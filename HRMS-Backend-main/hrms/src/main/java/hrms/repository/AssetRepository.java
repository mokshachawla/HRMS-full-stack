package hrms.repository;

import hrms.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByAssetTypeId(Long assetTypeId);
    List<Asset> findByAvailable(boolean available);
    List<Asset> findByAssetTypeIdAndAvailable(Long assetTypeId, boolean available);
    long countByAvailableTrue();
    long countByAvailableFalse();
}