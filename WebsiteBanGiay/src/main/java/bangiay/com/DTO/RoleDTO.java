package bangiay.com.DTO;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDTO {
    private Integer id;
    private String roleName;
    private String description;
    private List<PremissionDTO> premission;
}
