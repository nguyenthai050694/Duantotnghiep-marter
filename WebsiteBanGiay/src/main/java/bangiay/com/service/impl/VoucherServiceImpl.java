package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.VoucherDTO;
import bangiay.com.dao.CategoryDao;
import bangiay.com.dao.VoucherDao;
import bangiay.com.entity.Voucher;
import bangiay.com.service.VoucherService;

@Service
public class VoucherServiceImpl implements VoucherService {
	@Autowired
	private VoucherDao voucherDAO;

	@Autowired
	private CategoryDao cateDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public VoucherDTO create(VoucherDTO voucherDTO) {
		Voucher voucher = modelMapper.map(voucherDTO, Voucher.class);
		voucher.setCategory(this.cateDao.findById(voucherDTO.getCategoryId()).get());
//		voucher.setStatus(voucherDTO.getStatus());
		voucher.setCreated(Timestamp.from(Instant.now()));
		this.voucherDAO.save(voucher);
		voucherDTO.setId(voucher.getId());
		voucherDTO.setName_cate(voucher.getCategory().getNamecate());
		return voucherDTO;
	}

	@Override
	public VoucherDTO update(VoucherDTO voucherDTO) {
		Voucher voucher = modelMapper.map(voucherDTO, Voucher.class);
		Voucher vou = voucherDAO.findById(voucherDTO.getId()).get();
		voucher.setCategory(this.cateDao.findById(voucherDTO.getCategoryId()).get());
		voucher.setModified(Timestamp.from(Instant.now()));
		this.voucherDAO.save(voucher);
		voucherDTO.setId(voucher.getId());
//		voucherDTO.setCreated(new Timestamp(voucher.getCreated().getTime()));
		voucherDTO.setModified(new Timestamp(voucher.getModified().getTime()));
		voucherDTO.setName_cate(voucher.getCategory().getNamecate());
		voucherDTO.setDescription(voucher.getDescription());
		return voucherDTO;
	}

	@Override
	public void deleteById(Integer id) {
		voucherDAO.deleteById(id);

	}

	public Page<VoucherDTO> findAll(Integer size, Integer page) {
		// TODO Auto-generated method stub
		Pageable pageable = PageRequest.of(page, size);
//		Page<Voucher> vou = voucherDAO.findAll(pageable);

		Page<Voucher> entities = voucherDAO.findAll(pageable);
		Page<VoucherDTO> dtoPage = entities.map(new Function<Voucher, VoucherDTO>() {
			@Override
			public VoucherDTO apply(Voucher entity) {
				VoucherDTO dto = new VoucherDTO();
				dto = modelMapper.map(entity, VoucherDTO.class);
				dto.setCategoryId(entity.getCategory().getId());
				dto.setName_cate(entity.getCategory().getNamecate());
				return dto;
			}
		});

//		Page<VoucherDTO> result =  vou.stream().map(d -> modelMapper.map(d, VoucherDTO.class)).collect(Collectors.toList());
//		for (int i = 0; i < vou.size(); i ++) {
//			result.get(i).setCategoryId(vou.get(i).getCategory().getId());
//			result.get(i).setName_cate(vou.get(i).getCategory().getNamecate());
//		}
		return dtoPage;
	}

	@Override
	public VoucherDTO findById(Integer id) {
		// TODO Auto-generated method stub
		Voucher voucher = voucherDAO.findById(id).orElseGet(null);
		VoucherDTO vou = modelMapper.map(voucher, VoucherDTO.class);
		vou.setCategoryId(voucher.getCategory().getId());
		return vou;
	}

	@Override
	public VoucherDTO setStatusFalse(Integer id) {
		Voucher voucher = this.voucherDAO.findById(id).orElseGet(null);
		voucher.setStatus(0);
		this.voucherDAO.save(voucher);
		VoucherDTO vou = modelMapper.map(voucher, VoucherDTO.class);
		vou.setStatus(0);
		return vou;
	}

	@Override
	public List<VoucherDTO> findAll() {
		return voucherDAO.findAll().stream().map(voucher -> modelMapper.map(voucher, VoucherDTO.class))
				.collect(Collectors.toList());
	}

}
