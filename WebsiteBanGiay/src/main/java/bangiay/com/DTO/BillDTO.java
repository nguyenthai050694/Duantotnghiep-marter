package bangiay.com.DTO;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDTO {
	private Integer id;
	private Integer userId;
	private String code;
	private String nameRecipient;
	private String telephone;
	private String address;
	private Timestamp created;
	private String creator;
	private Timestamp modified;
	private String modifier;
}
