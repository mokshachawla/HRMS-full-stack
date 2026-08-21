package hrms.repository;

import hrms.entity.PolicyVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PolicyVersionRepository extends JpaRepository<PolicyVersion, Long> {

    List<PolicyVersion> findByPolicyIdOrderByVersionNumberDesc(Long policyId);

    Optional<PolicyVersion> findTopByPolicyIdOrderByVersionNumberDesc(Long policyId);

    List<PolicyVersion> findByPolicyIdAndPublished(Long policyId, boolean published);
}