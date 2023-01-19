package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.BillDTO;
import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.dao.BillDao;
import bangiay.com.dao.OrderDao;
import bangiay.com.dao.OrderDetailDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Bill;
import bangiay.com.entity.Order;
import bangiay.com.entity.OrderDetail;
import bangiay.com.service.BillService;
import bangiay.com.service.Bill_DetailService;
import bangiay.com.utils.ObjectMapperUtils;

@Service
public class BillServiceImpl implements BillService {
	@Autowired
	private BillDao billDao;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;

	@Autowired
	private OrderDetailDao orderDetailDao;

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private Bill_DetailService bill_DetailService;

	@Override
	public BillDTO createBill(BillDTO billDTO, Integer id) {
		Order order = this.orderDao.findById(id).orElse(null);
		if (order.getStatus() == 3) {
			List<OrderDetail> lstOrderDetail = this.orderDetailDao.findByOrder_Id(id);
			Bill bill = new Bill();
			bill.setUSER_ID(order.getUser());
			bill.setNameRecipient(order.getNameRecipient());
			bill.setTelephone(order.getTelephone());
			bill.setAddress(order.getAddress());
			bill.setCreator(billDTO.getCreator());
			bill.setCreated(Timestamp.from(Instant.now()));
			// Insert Bill to DB
			this.billDao.save(bill);
			billDTO = modelMapper.map(bill, BillDTO.class);
			List<BillDetailDTO> lstBillDetailDTO = new ArrayList<BillDetailDTO>();
			for (int i = 0; i < lstOrderDetail.size(); i++) {
				if (lstOrderDetail.get(i).getVoucher() != null) {
					lstBillDetailDTO.add(new BillDetailDTO(null, bill.getId(), lstOrderDetail.get(i).getSize().getId(),
							lstOrderDetail.get(i).getVoucher().getId(), lstOrderDetail.get(i).getQuantity(),
							lstOrderDetail.get(i).getPrice(), null, null, null, null));
				} else {
					lstBillDetailDTO.add(new BillDetailDTO(null, bill.getId(), lstOrderDetail.get(i).getSize().getId(),
							null, lstOrderDetail.get(i).getQuantity(), lstOrderDetail.get(i).getPrice(), null, null,
							null, null));
				}
			}
			this.bill_DetailService.createAll(lstBillDetailDTO);
			return billDTO;
		}
		return null;
	}

	@Override
	public List<BillDTO> findAll() {
		return billDao.findAll().stream().map(bill -> modelMapper.map(bill, BillDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Page<BillDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(billDao.findAll(pageable), BillDTO.class);
	}

	@Override
	public BillDTO updateBill(BillDTO billDTO) {
		Bill bill = billDao.findById(billDTO.getId()).orElseThrow(() -> new RuntimeException("Bill isn't existed"));
		bill.setCode(billDTO.getCode());
		bill.setNameRecipient(bill.getNameRecipient());
		bill.setTelephone(bill.getTelephone());
		bill.setAddress(bill.getAddress());
		bill.setModified(Timestamp.from(Instant.now()));
		Bill bill1 = billDao.save(bill);
		billDTO.setCreator(bill1.getCreator());
		billDTO.setModifier(bill1.getModifier());
		billDTO.setId(bill1.getId());
		return billDTO;
	}

	@Override
	public void deleteById(Integer id) {
		Bill bill = billDao.findById(id).orElseThrow(() -> new RuntimeException("Bill isn't existed"));
		billDao.save(bill);
	}

	@Override
	public BillDTO findByID(Integer id) {
		Bill bill = billDao.findById(id).orElseThrow(() -> new RuntimeException("Bill isn't existed"));
		BillDTO billDTO = modelMapper.map(bill, BillDTO.class);
		return billDTO;
	}

	@Override
	public List<BillDTO> statisticsByYear() {
		return null;
	}
}
