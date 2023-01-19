package bangiay.com.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.entity.BillDetail;

public interface Bill_DetailService {
	public List<BillDetailDTO> findAll();

	Page<BillDetailDTO> findAll(Pageable pageable);

	public List<BillDetailDTO> createAll(List<BillDetailDTO> billDetailDTO);

	public BillDetailDTO update(BillDetailDTO billDetailDTO);

	public BillDetailDTO finById(int id);

	public void delete(int id);

	List<BillDetail> top5();
}
