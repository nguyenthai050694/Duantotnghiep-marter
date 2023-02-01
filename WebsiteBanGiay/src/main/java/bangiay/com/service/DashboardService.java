package bangiay.com.service;

import bangiay.com.DTO.DashboardDTO;
import bangiay.com.DTO.OrderDTO;
import bangiay.com.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DashboardService {

	public DashboardDTO getDashboard();
}
