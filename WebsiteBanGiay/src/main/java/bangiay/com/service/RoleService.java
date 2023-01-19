package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.RoleDTO;
import bangiay.com.entity.Premission;
import bangiay.com.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleService {

	Role create(RoleDTO role);

	void update(RoleDTO role) throws Exception;

	void delete(Integer id);

	Role findById(Integer id) throws Exception;

	List<Role> findAll();
	Page<RoleDTO> findAll(Pageable pageable);

	Role findByName(String name);

	List<Role> createAll(List<Role> role);
	List<Premission> findAllPremission();
	void addPermission(Integer roleId , Integer permissionId) throws Exception;
	
	void deletePermission(Integer roleId , Integer permissionId) throws Exception;
}
