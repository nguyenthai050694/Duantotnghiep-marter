package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.MediaDTO;
import bangiay.com.dao.MediaDao;
import bangiay.com.entity.Media;
import bangiay.com.service.MediaService;
import bangiay.com.utils.ObjectMapperUtils;

@Service
public class MediaServiceImpl implements MediaService {

	@Autowired
	private MediaDao mediaDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<MediaDTO> findAll() {
		List<Media> media = this.mediaDao.findAll();
		List<MediaDTO> mediaDTO = media.stream().map(d -> modelMapper.map(d, MediaDTO.class))
				.collect(Collectors.toList());
		return mediaDTO;
	}

	@Override
	public Page<MediaDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(mediaDao.findAll(pageable), MediaDTO.class);
	}

	@Override
	public List<MediaDTO> createAll(List<MediaDTO> mediaDTO) {
		List<Media> media = mediaDTO.stream().map(d -> modelMapper.map(d, Media.class)).collect(Collectors.toList());
		this.mediaDao.saveAll(media);
		for (int i = 0; i < media.size(); i++) {
			mediaDTO.get(i).setId(media.get(i).getId());
		}
		return mediaDTO;
	}

	@Override
	public MediaDTO update(MediaDTO mediaDTO) {
		Media media = modelMapper.map(mediaDTO, Media.class);
		this.mediaDao.save(media);
		return mediaDTO;
	}

	@Override
	public void delete(Integer id) {
		this.mediaDao.deleteById(id);
	}

	@Override
	public List<MediaDTO> findAllByPro_Id(Integer product_Id) {
		List<Media> lst = this.mediaDao.findMediaByProduct_Id(product_Id);
		List<MediaDTO> lstMediaDTO = lst.stream().map(d -> modelMapper.map(d, MediaDTO.class))
				.collect(Collectors.toList());
		return lstMediaDTO;
	}

	@Override
	public MediaDTO findById(Integer id) {
		Media media = mediaDao.findById(id).orElseGet(null);
		MediaDTO mediadto = modelMapper.map(media, MediaDTO.class);
		return mediadto;
	}

}
