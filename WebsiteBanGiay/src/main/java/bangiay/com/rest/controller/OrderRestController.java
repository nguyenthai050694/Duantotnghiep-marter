package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.OrderDTO;
import bangiay.com.doMain.constant;
import bangiay.com.service.OrderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/order")
public class OrderRestController {

	@Autowired
	OrderService orderService;

	@GetMapping("/findAll")
	public List<OrderDTO> findAll() {
		return this.orderService.findAll();
	}

	@GetMapping("/select")
	public ResponseEntity<Page<OrderDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size) {
		Pageable pageable = PageRequest.of(page - 1, size);
		return ResponseEntity.ok(orderService.findAll(pageable));
	}

//	@DeleteMapping("/delete/{id}")
//		public void delete(@PathVariable("id") Integer id) {
//	}

	@PostMapping("/create")
	public OrderDTO create(@RequestParam(value = "user_Id", required = false, defaultValue = "0") Integer user_Id,
			@RequestParam(value = "voucher_Id", required = false, defaultValue = "0") Integer voucher_Id,
			@RequestBody OrderDTO orderDTO) {
		return this.orderService.create(orderDTO, user_Id, voucher_Id);
	}

	@GetMapping("/payment/{id}")
	public OrderDTO updatePaymentOrder(@PathVariable("id") Integer id) {
		return this.orderService.updatePaymentOrder(id);
	}

	@GetMapping("/cancel/{id}")
	public OrderDTO updateCancelOrder(@PathVariable("id") Integer id) {
		return this.orderService.updateCancelOrder(id);
	}

	@GetMapping("/delivered/{id}")
	public OrderDTO updateDeliveredOrder(@PathVariable("id") Integer id) {
		return this.orderService.updateDeliveredOrder(id);
	}

	@GetMapping("/find/{id}")
	public OrderDTO finByID(@PathVariable("id") Integer id) {
		return this.orderService.findById(id);
	}

	@GetMapping("/findOrderBySize_ID/{user_IdOrTelephone}")
	public List<OrderDTO> findOrderBySize_ID(@PathVariable("user_IdOrTelephone") Integer user_IdOrTelephone) {
		return null;
	}

	@PostMapping("updateStatus")
	public ResponseEntity<?> updateOrderWithStatus(@RequestParam("id") Integer id,
			@RequestParam("status") Integer status) {
		return new ResponseEntity<>(orderService.updateOrderWithStatus(id, status), HttpStatus.OK);
	}

}
