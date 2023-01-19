package bangiay.com.DTO;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
	private Integer id;
	private Integer userId;
	private String code;
	private String nameRecipient;
	private String telephone;
	private String address;
	private Timestamp created;
	private Timestamp paymentAtDate;
	private Timestamp recaiveAtDate;
	private Timestamp completedAtDate;
	private Timestamp cancelledAtDate;
	private Timestamp returnAtDate;
	private String description;
	private Integer status;

}
