package bangiay.com;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "${swagger.config.title}",
		description = "${swagger.config.title}",
		version = "${swagger.config.version}"),
		servers = {@Server(url = "${swagger.config.url}")})
public class WebsiteBanGiayApplication {
	private static final Logger L = LoggerFactory.getLogger(WebsiteBanGiayApplication.class);
	public static void main(String[] args) {
		//0. pre-process
		//0.1 for prevent "SilentExitException"
		System.setProperty("spring.devtools.restart.enabled", "true");
		System.setProperty("spring.profiles.default", "local");
		System.setProperty("java.net.preferIPv4Stack", "true");
		//1. Run spring application
		SpringApplication.run(WebsiteBanGiayApplication.class, args);
		L.info("-----------------------------------------------------------");
		L.info("            Welcome to New datn Service.");
		L.info("           Application start successfully.");
		L.info("-----------------------------------------------------------");
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	
	
}
