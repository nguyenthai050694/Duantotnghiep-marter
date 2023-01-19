package bangiay.com.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.SizeDTO;

@Service
public interface SizeService {
	public List<SizeDTO> findAll();
	Page<SizeDTO> findAll(Pageable pageable);
	public SizeDTO save(SizeDTO sizeDTO);

	public List<SizeDTO> saveList(List<SizeDTO> sizeDTO);

	public SizeDTO findById(Integer id);

	public void delete(Integer id);

	public List<SizeDTO> findSizeByPro_Id(Integer pro_Id);
}
