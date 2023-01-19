package bangiay.com.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.dao.BillDao;
import bangiay.com.dao.Bill_Detail_Dao;
import bangiay.com.entity.BillDetail;
import bangiay.com.service.Bill_DetailService;
import bangiay.com.utils.ObjectMapperUtils;

@Service
public class Bill_DetailServiceImpl implements Bill_DetailService {

	@Autowired
	Bill_Detail_Dao billDetailDao;

	@Autowired
	BillDao billDao;

	@Autowired
	ModelMapper modelMapper;

	@Override
	public List<BillDetailDTO> findAll() {
		List<BillDetail> billDetails = this.billDetailDao.findAll();
		List<BillDetailDTO> billDetailsDTO = new ArrayList<BillDetailDTO>();
		for (int i = 0; i < billDetails.size(); i++) {
			boolean x = true;
			BillDetailDTO bdtDTO = new BillDetailDTO();
			for (int j = 0; j < billDetailsDTO.size(); j++) {
				if (billDetails.get(i).getSize().getProduct().getId() == billDetailsDTO.get(j).getId_Pro()) {
					billDetailsDTO.get(j).setTotalQuantityPro(
							billDetailsDTO.get(j).getTotalQuantityPro() + billDetails.get(i).getQuantity());
					billDetailsDTO.get(j).setTotalPricePro(billDetailsDTO.get(j).getTotalPricePro()
							+ billDetails.get(i).getPrice() * billDetails.get(i).getQuantity());
					x = false;
					break;
				}
			}
			if (x) {
				bdtDTO.setId_Pro(billDetails.get(i).getSize().getProduct().getId());
				bdtDTO.setName_Pro(billDetails.get(i).getSize().getProduct().getName());
				bdtDTO.setTotalQuantityPro(billDetails.get(i).getQuantity());
				bdtDTO.setTotalPricePro(billDetails.get(i).getPrice() * billDetails.get(i).getQuantity());
				billDetailsDTO.add(bdtDTO);
			}
		}
		return billDetailsDTO;
	}

	@Override
	public Page<BillDetailDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(billDetailDao.findAll(pageable), BillDetailDTO.class);
	}

	@Override
	public List<BillDetailDTO> createAll(List<BillDetailDTO> lstBillDetailDTO) {
		BillDetail billDetail = modelMapper.map(lstBillDetailDTO, BillDetail.class);
		List<BillDetail> billDetails = lstBillDetailDTO.stream().map(d -> modelMapper.map(d, BillDetail.class))
				.collect(Collectors.toList());
		this.billDetailDao.saveAll(billDetails);
		return lstBillDetailDTO;
	}

	@Override
	public BillDetailDTO update(BillDetailDTO billDetailDTO) {
		return null;
	}

	@Override
	public BillDetailDTO finById(int id) {
		return null;
	}

	@Override
	public void delete(int id) {
	}

	@Override
	public List<BillDetail> top5() {

		return billDetailDao.findTop5();
	}

}
