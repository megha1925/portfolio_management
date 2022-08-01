package com.cts.authorization.controller;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cts.authorization.exception.UserNotFoundException;
import com.cts.authorization.service.UserService;
import com.cts.authorization.util.JwtRequest;
import com.cts.authorization.util.JwtResponse;
import com.cts.authorization.util.JwtUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtTokenUtil;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private UserService userService;

	@GetMapping("/check")
	public String check() {
		return "Hello World";
	}

	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws UserNotFoundException {
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwtToken = jwtTokenUtil.generateToken(userDetails);
		log.info("Received request to generate token for " + authenticationRequest.getUsername());
		return ResponseEntity.ok(new JwtResponse(jwtToken,authenticationRequest.getUsername()));

	}

	@PostMapping(value="/authorize")
	@ApiOperation(notes = "Checks if the token is a valid token or not and returns a boolean",value = "Authorize Token")
	public boolean authorizeRequest(@RequestHeader(value = "Authorization", required = true) String requestTokenHeader){

		String jwtToken = null;
		String userName = null;
		if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")){
			jwtToken = requestTokenHeader.substring(7);
			try{
				userName = jwtTokenUtil.getUsernameFromToken(jwtToken);
				if(Boolean.TRUE.equals(jwtTokenUtil.isTokenExpired(jwtToken))){
					return false;
				}
			}catch(IllegalArgumentException | ExpiredJwtException | SignatureException e){
				return false;
			}
		}
		return userName != null;
	}

	private void authenticate(String username, String password) throws UserNotFoundException {
		try {
			log.info("Authentication started....");
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			log.info("Authentication successfully..");
		} catch (DisabledException e) {
			log.error("Authentication is failed...");
			throw new UserNotFoundException("USER_DISABLED");
		} catch (BadCredentialsException e) {
			log.error("Authentication is failed...");
			throw new UserNotFoundException("INVALID_CREDENTIALS");
		}
	}

	@GetMapping("/username")
	public String getUname(@RequestHeader("Authorization") String authorization) {
		String token = authorization.substring(7);
		log.info("Getting username by token...");
		return jwtTokenUtil.getUsernameFromToken(token);
	}

	@GetMapping("/userid")
	public int getUserId(@RequestHeader("Authorization") String authorization) {
		String token = authorization.substring(7);
		String uname = jwtTokenUtil.getUsernameFromToken(token);
		log.info("Getting userId by token...");
		return userService.findUserId(uname);

	}
}
