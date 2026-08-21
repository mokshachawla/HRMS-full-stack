package hrms.controller;

import hrms.dto.DashboardDto;
import hrms.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardDto> getStats() {
        return ResponseEntity.ok(service.getStats());
    }
}