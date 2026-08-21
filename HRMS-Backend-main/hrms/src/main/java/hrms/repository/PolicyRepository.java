package hrms.repository;

import hrms.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Query("SELECT COUNT(DISTINCT pv.policy) FROM PolicyVersion pv WHERE pv.published = true")
    long countPublishedPolicies();
}