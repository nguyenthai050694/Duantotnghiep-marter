package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.entity.BillDetail;
import bangiay.com.service.Bill_DetailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "billDetail")
public class BillDetailRestController {

	@Autowired
	private Bill_DetailService billdBill_DetailService;

	@GetMapping("/getAll")
	public ResponseEntity<List<BillDetail>> getAll() {
		return ResponseEntity.ok().body(billdBill_DetailService.top5());
	}

	@GetMapping("/findAll")
	public ResponseEntity<List<BillDetailDTO>> getAll1() {
		return ResponseEntity.ok().body(billdBill_DetailService.findAll());
	}
}
