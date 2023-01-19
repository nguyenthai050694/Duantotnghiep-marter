package bangiay.com.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.OrderDetailDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.MediaDao;
import bangiay.com.dao.OrderDetailDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.VoucherDao;
import bangiay.com.entity.Cart;
import bangiay.com.entity.Media;
import bangiay.com.entity.OrderDetail;
import bangiay.com.entity.Size;
import bangiay.com.entity.Voucher;
import bangiay.com.service.CartService;
import bangiay.com.service.OrderDetailService;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

	@Autowired
	private OrderDetailDao orderDetailDao;

	@Autowired
	private CartDao cartDao;

	@Autowired
	private SizeDao sizeDao;

	@Autowired
	private MediaDao mediaDao;

	@Autowired
	private VoucherDao voucherDao;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CartService cartService;

	@Override
	public List<OrderDetailDTO> findAll() {
		List<OrderDetail> order = this.orderDetailDao.findAll();
		List<OrderDetailDTO> orderDTO = order.stream().map(d -> modelMapper.map(d, OrderDetailDTO.class))
				.collect(Collectors.toList());
		return orderDTO;
	}

	@Override
	public List<OrderDetailDTO> create(List<Cart> lstCart, Integer order_Id, Integer voucher_Id) {
		Voucher voucher = this.voucherDao.findById(voucher_Id).orElse(null);
		List<OrderDetailDTO> lstOrderDTO = new ArrayList<OrderDetailDTO>();
		List<Size> lstSize = new ArrayList<Size>();
		for (int i = 0; i < lstCart.size(); i++) {
			Size size = lstCart.get(i).getSize();
			size.setQuantity(size.getQuantity() - lstCart.get(i).getQuantity());
			lstSize.add(size);
			if (voucher != null) {
				if (voucher.getType() == 1) {
					if (voucher.getCategory().getId() == lstCart.get(i).getSize().getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrderDetailDTO(null, order_Id, voucher.getId(),
								lstCart.get(i).getSize().getId(), lstCart.get(i).getQuantity(),
								lstCart.get(i).getSize().getProduct().getPrice()
										- (lstCart.get(i).getSize().getProduct().getPrice() * voucher.getValue() / 100),
								"", "", "", ""));
					} else {
						lstOrderDTO.add(new OrderDetailDTO(null, order_Id, null, lstCart.get(i).getSize().getId(),
								lstCart.get(i).getQuantity(), lstCart.get(i).getSize().getProduct().getPrice(), "", "",
								"", ""));
					}
				} else {
					if (voucher.getCategory().getId() == lstCart.get(i).getSize().getProduct().getCategory().getId()) {
						lstOrderDTO.add(new OrderDetailDTO(null, order_Id, voucher.getId(),
								lstCart.get(i).getSize().getId(), lstCart.get(i).getQuantity(),
								lstCart.get(i).getSize().getProduct().getPrice() - voucher.getValue(), "", "", "", ""));
					} else {

						lstOrderDTO.add(new OrderDetailDTO(null, order_Id, null, lstCart.get(i).getSize().getId(),
								lstCart.get(i).getQuantity(), lstCart.get(i).getSize().getProduct().getPrice(), "", "",
								"", ""));
					}
				}

			} else {
				lstOrderDTO.add(new OrderDetailDTO(null, order_Id, null, lstCart.get(i).getSize().getId(),
						lstCart.get(i).getQuantity(), lstCart.get(i).getSize().getProduct().getPrice(), "", "", "",
						""));
			}
		}
		List<OrderDetail> lstOrder = lstOrderDTO.stream().map(d -> modelMapper.map(d, OrderDetail.class))
				.collect(Collectors.toList());
		this.orderDetailDao.saveAll(lstOrder);
		this.sizeDao.saveAll(lstSize);
		return lstOrderDTO;
	}

	@Override
	public OrderDetailDTO finById(int id) {
		return modelMapper.map(this.orderDetailDao.findById(id).orElse(null), OrderDetailDTO.class);
	}

	@Override
	public List<OrderDetailDTO> findByOrder_Id(Integer id) {
		List<OrderDetail> lstOrderDetatil = orderDetailDao.findByOrder_Id(id);
		List<OrderDetailDTO> lstOrderDetail = lstOrderDetatil.stream()
				.map(o -> modelMapper.map(o, OrderDetailDTO.class)).collect(Collectors.toList());
		for (int i = 0; i < lstOrderDetatil.size(); i++) {
			lstOrderDetail.get(i).setName_Product(lstOrderDetatil.get(i).getSize().getProduct().getName());
			lstOrderDetail.get(i).setColor_Product(lstOrderDetatil.get(i).getSize().getProduct().getColor());
			lstOrderDetail.get(i).setSizeName(lstOrderDetatil.get(i).getSize().getSize());
			List<Media> media = mediaDao.findMediaByProduct_Id(lstOrderDetatil.get(i).getSize().getProduct().getId());
			if (media.size() > 0) {
				lstOrderDetail.get(i).setImage(media.get(0).getUrl());
			}
		}
		return lstOrderDetail;
	}

}
