package com.cts.dailyshareprice;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class DailySharePriceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DailySharePriceApplication.class, args);
	}

}
