package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import bangiay.com.utils.ObjectMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.SizeDTO;
import bangiay.com.dao.ProductDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.entity.Product;
import bangiay.com.entity.Size;
import bangiay.com.service.SizeService;

@Service
public class SizeServiceImpl implements SizeService {
	@Autowired
	private SizeDao sizeDAO;

	@Autowired
	private ProductDao proDao;

	@Autowired
	private ModelMapper modelMapper;

	public List<SizeDTO> findAll() {
		List<Size> pro = sizeDAO.findAll();
		List<SizeDTO> result = pro.stream().map(d -> modelMapper.map(d, SizeDTO.class)).collect(Collectors.toList());
		return result;
	}
	@Override
	public Page<SizeDTO> findAll(Pageable pageable) {
		return ObjectMapperUtils.mapEntityPageIntoDtoPage(sizeDAO.findAll(pageable), SizeDTO.class);
	}

	@Override
	public SizeDTO findById(Integer id) {
		Size Size = sizeDAO.findById(id).orElseGet(null);
		SizeDTO Sizedto = modelMapper.map(Size, SizeDTO.class);
		return Sizedto;
	}

	@Override
	public List<SizeDTO> saveList(List<SizeDTO> SizeDTO) {
		List<Size> Size = SizeDTO.stream().map(s -> modelMapper.map(s, Size.class)).collect(Collectors.toList());
		Product pro = this.proDao.findById(SizeDTO.get(0).getProductId()).get();
		this.sizeDAO.saveAll(Size);
		return SizeDTO;
	}

	@Override
	public SizeDTO save(SizeDTO SizeDTO) {
		Size Size = modelMapper.map(SizeDTO, Size.class);
		Product pro = this.proDao.findById(SizeDTO.getProductId()).get();
		this.sizeDAO.save(Size);
		SizeDTO.setId(Size.getId());
		return SizeDTO;
	}

	@Override
	public void delete(Integer id) {
		sizeDAO.deleteById(id);
	}

	@Override

	public List<SizeDTO> findSizeByPro_Id(Integer pro_Id) {
		List<Size> size = sizeDAO.findByPro_Id(pro_Id);
		List<SizeDTO> result = size.stream().map(d -> modelMapper.map(d, SizeDTO.class)).collect(Collectors.toList());
		return result;
	}

}
