package bangiay.com.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class SizeDTO implements Serializable {
	private Integer id;
	private Integer productId;
	private String size;
	private Integer quantity;

}
