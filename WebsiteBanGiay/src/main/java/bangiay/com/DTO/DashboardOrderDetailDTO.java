package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardOrderDetailDTO {
	private Integer id = 0;
	private Date create;
	private Integer quantity = 0;
	private Integer price = 0;
}
