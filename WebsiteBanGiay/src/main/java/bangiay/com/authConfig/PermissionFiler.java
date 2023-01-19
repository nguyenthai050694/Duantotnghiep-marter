package bangiay.com.authConfig;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.ObjectUtils;

public class PermissionFiler implements PermissionEvaluator{

	@Override
	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
		//Custom logic to evaluate @PreAuthorize("hasPermission('123', '123')")
		return checkPermission(authentication, permission);
	}

	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Object permission) {
		//Custom logic to evaluate @PreAuthorize("hasPermission('123', '123','123')")
		return checkPermission(authentication, permission);
	}
	
	private boolean checkPermission(Authentication authentication, Object permissions) {
        if (ObjectUtils.isEmpty(authentication)
                || ObjectUtils.isEmpty(permissions)
                || authentication.getAuthorities().isEmpty()) {
            return false;
        }

        List<String> permissionList = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        List<String> ps = Arrays.asList(permissions.toString().split(","));
        return ps.stream().anyMatch(permissionList::contains);
    }
}
