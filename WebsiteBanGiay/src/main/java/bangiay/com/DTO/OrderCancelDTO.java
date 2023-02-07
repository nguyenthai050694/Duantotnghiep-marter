package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCancelDTO {
	private Integer id;
	private String reason = "";
	private Integer status;
}
