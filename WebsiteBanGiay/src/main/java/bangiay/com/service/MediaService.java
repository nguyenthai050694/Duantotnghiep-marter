package bangiay.com.service;


import java.util.List;

import bangiay.com.DTO.MediaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MediaService {

	List<MediaDTO> findAll();
	Page<MediaDTO> findAll(Pageable pageable);
	List<MediaDTO> createAll(List<MediaDTO> mediaDTO);

	MediaDTO update(MediaDTO mediaDTO);

	List<MediaDTO> findAllByPro_Id(Integer product_Id);

	MediaDTO findById(Integer id);

	void delete(Integer id);

}
