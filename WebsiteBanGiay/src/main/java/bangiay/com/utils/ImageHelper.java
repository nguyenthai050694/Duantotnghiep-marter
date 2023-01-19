package bangiay.com.utils;


import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class ImageHelper {

    private ImageHelper(){

    }

    public static void image(MultipartFile multipartImage, String pathName) {
        try {
            //Lưu image vào folder image
            File file = new File(pathName);
            try (OutputStream os = new FileOutputStream(file)) {
                os.write(multipartImage.getBytes());
            }
        } catch (IOException e) {
            throw new ResourceAccessException("File not found");
        }
    }

}
