package hrms.repository;

import hrms.entity.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetTypeRepository extends JpaRepository<AssetType, Long> {
    boolean existsByName(String name);
}