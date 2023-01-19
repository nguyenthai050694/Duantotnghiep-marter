package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.OrderDetailDTO;
import bangiay.com.entity.Cart;

public interface OrderDetailService {

	public List<OrderDetailDTO> findAll();

	public List<OrderDetailDTO> create(List<Cart> lstCart, Integer order_Id, Integer voucher_Id);

	public OrderDetailDTO finById(int id);

	public List<OrderDetailDTO> findByOrder_Id(Integer id);

}
