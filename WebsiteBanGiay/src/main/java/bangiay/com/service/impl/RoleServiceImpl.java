package bangiay.com.service.impl;

import java.util.List;
import java.util.Optional;

import bangiay.com.DTO.RoleDTO;
import bangiay.com.utils.ObjectMapperUtils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.dao.PermissionDao;
import bangiay.com.dao.RoleDao;
import bangiay.com.entity.Premission;
import bangiay.com.entity.Role;
import bangiay.com.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	RoleDao roleDAO;
	
	@Autowired
	PermissionDao permissionDAO;
	
	@Autowired
	ModelMapper modelMapper;

	@Override
	public Role create(RoleDTO role) {
		return roleDAO.save(modelMapper.map(role, Role.class));
	}

	@Override
	public void update(RoleDTO roleDTO) throws Exception {
		Optional<Role> role = roleDAO.findById(roleDTO.getId());
		if(isEmpty(role)) {
			throw new Exception("Role id không tồn tại");
		}else {
			role.get().setDescription(roleDTO.getDescription());
			roleDAO.save(role.get());
		}
		
	}

	private boolean isEmpty(Optional<Role> role) {
		return role.isEmpty();
	}

	@Override
	public void delete(Integer id) {
		roleDAO.delete(roleDAO.findById(id).get());
	}

	@Override
	public Role findById(Integer id) throws Exception {
		return roleDAO.findById(id).orElseThrow(() -> new Exception("Role is not exists" + id));
	}

	@Override
	public List<Role> findAll() {
		List<Role> roles = roleDAO.findAll();
		
		return roles;
	}
	@Override
	public Page<RoleDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(roleDAO.findAll(pageable), RoleDTO.class);
	}

	@Override
	public Role findByName(String name) {
		for (Role r : roleDAO.findAll())
			if (r.getRoleName().equals(name))
				return r;
		return null;
	}

	@Override

	public List<Role> createAll(List<Role> role) {


		return roleDAO.saveAll(role);
	}

	@Override
	public void addPermission(Integer roleId, Integer permissionId) throws Exception {
		Optional<Role> role = roleDAO.findById(roleId);
		Optional<Premission> permis = permissionDAO.findById(permissionId);
		if(isEmpty(role)) {
			throw new Exception("Role id không tồn tại");
		}else if(permis.isEmpty()){
			throw new Exception("Permission id không tồn tại");
		}else {
			if(role.get().getPremission().contains(permis.get())) {
				throw new Exception("Permission đã tồn tại");
			}
			role.get().getPremission().add(permis.get());
			roleDAO.save(role.get());
		}
	}

	@Override
	public void deletePermission(Integer roleId, Integer permissionId) throws Exception {
		Optional<Role> role = roleDAO.findById(roleId);
		Optional<Premission> permis = permissionDAO.findById(permissionId);
		if(isEmpty(role)) {
			throw new Exception("Role id không tồn tại");
		}else if(permis.isEmpty()){
			throw new Exception("Permission id không tồn tại");
		}else {
			if(!role.get().getPremission().contains(permis.get())) {
				throw new Exception("Permission không tồn tại trong role");
			}
			role.get().getPremission().remove(permis.get());
			roleDAO.save(role.get());
		}
		
	}

	@Override
	public List<Premission> findAllPremission() {
		List<Premission> premiss = permissionDAO.findAll();
		
		return premiss;
	}
	
	
}
