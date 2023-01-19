package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Role;

@Repository
public interface RoleDao extends JpaRepository<Role, Integer>{
	@Query("SELECT n FROM Role n where n.roleName = :roleName")
	Role findByNameRole(@Param("roleName") String roleName);
}
