package com.cts.calculatenetworth.feignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url = "${auth.URL}", name = "AUTHORIZATION-SERVICE")
public interface AuthorizationClient {

	@PostMapping("/authorize")
	public boolean authorizeRequest(@RequestHeader("Authorization") String authorization);

	@GetMapping("/userid")
	public int getUserId(@RequestHeader("Authorization") String authorization);

}
