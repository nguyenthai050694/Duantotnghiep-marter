package bangiay.com.service;

import java.util.List;

import org.springframework.data.domain.Page;

import bangiay.com.DTO.VoucherDTO;

public interface VoucherService {
	public VoucherDTO create(VoucherDTO voucherDTO);

	public VoucherDTO update(VoucherDTO voucherDTO);

	void deleteById(Integer id);

	public VoucherDTO setStatusFalse(Integer id);

	public Page<VoucherDTO> findAll(Integer size, Integer page);

	public List<VoucherDTO> findAll();

	VoucherDTO findById(Integer id);

}
