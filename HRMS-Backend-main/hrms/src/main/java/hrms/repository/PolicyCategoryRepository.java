package hrms.repository;

import hrms.entity.PolicyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyCategoryRepository extends JpaRepository<PolicyCategory, Long> {
    boolean existsByName(String name);
}