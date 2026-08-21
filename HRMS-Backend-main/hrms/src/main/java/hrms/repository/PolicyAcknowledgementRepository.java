package hrms.repository;

import hrms.entity.PolicyAcknowledgement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyAcknowledgementRepository extends JpaRepository<PolicyAcknowledgement, Long> {

    boolean existsByEmployeeIdAndPolicyVersionId(Long employeeId, Long policyVersionId);

    List<PolicyAcknowledgement> findByEmployeeId(Long employeeId);

    List<PolicyAcknowledgement> findByPolicyVersionId(Long policyVersionId);
}