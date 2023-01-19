package bangiay.com.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class MediaDTO implements Serializable {
	private Integer id;
	private Integer productId;
	private String url;

	private String type;

}
