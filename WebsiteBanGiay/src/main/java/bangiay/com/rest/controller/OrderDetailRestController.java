package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.OrderDetailDTO;
import bangiay.com.service.OrderDetailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/orderDetail")
public class OrderDetailRestController {
	@Autowired
	private OrderDetailService orderDetailService;

	@GetMapping("/findByOrder_Id/{order_Id}")
	public ResponseEntity<List<OrderDetailDTO>> findByOrder_Id(@PathVariable("order_Id") Integer order_Id) {
		return ResponseEntity.ok(this.orderDetailService.findByOrder_Id(order_Id));
	}
}
