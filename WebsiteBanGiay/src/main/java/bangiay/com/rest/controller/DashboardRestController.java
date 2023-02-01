package bangiay.com.rest.controller;

import bangiay.com.DTO.DashboardDTO;
import bangiay.com.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/dashboard")
public class DashboardRestController {

	@Autowired
	DashboardService dashboardService;

	@GetMapping
	public DashboardDTO getDashboard() {
		return dashboardService.getDashboard();
	}
}
