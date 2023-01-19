package bangiay.com.DTO;

public class VoucherDTO {
    private Integer id;
    private String name;
    private Integer categoryId;
    private String name_cate;
    private String description;
    private Integer quantity;
    private java.sql.Timestamp effectFrom;
    private java.sql.Timestamp effectUntil;
    private java.sql.Timestamp created;
    private String creator;
    private java.sql.Timestamp modified;
    private String modifier;
    private Integer value;
    private Integer type;
    private Integer status;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    
    public String getNamecate() {
    	return this.name_cate;
    }
    
    public void setName_cate(String namecate) {
    	this.name_cate = namecate;
    }

    public String getDescription() {
    	return this.description;
    }
    
    public void setDescription(String description) {
    	this.description = description;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public java.sql.Timestamp getEffectFrom() {
        return this.effectFrom;
    }

    public void setEffectFrom(java.sql.Timestamp effectFrom) {
        this.effectFrom = effectFrom;
    }

    public java.sql.Timestamp getEffectUntil() {
        return this.effectUntil;
    }

    public void setEffectUntil(java.sql.Timestamp effectUntil) {
        this.effectUntil = effectUntil;
    }

    public java.sql.Timestamp getCreated() {
        return this.created;
    }

    public void setCreated(java.sql.Timestamp created) {
        this.created = created;
    }

    public String getCreator() {
        return this.creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public java.sql.Timestamp getModified() {
        return this.modified;
    }

    public void setModified(java.sql.Timestamp modified) {
        this.modified = modified;
    }

    public String getModifier() {
        return this.modifier;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    public Integer getValue() {
        return this.value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Integer getType() {
        return this.type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
    
    public Integer getStatus() {
    	return this.status;
    }
    
    public void setStatus(Integer status) {
    	this.status = status;
    }
}
