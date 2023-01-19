package bangiay.com.DTO;

import lombok.Data;

@Data
public class CategoryDTO {
	private Integer id;
	private String namecate;
	private java.sql.Timestamp created;
	private String creator;
	private java.sql.Timestamp modified;
	private String modifier;

}
