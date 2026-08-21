package hrms.config;

import hrms.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // Authentication
                        .requestMatchers("/auth/**").permitAll()

                        // Dashboard (Development)
                        .requestMatchers("/dashboard/**").permitAll()

                        // Departments
                        .requestMatchers("/departments/**").permitAll()

                        // Employees (Development)
                        .requestMatchers("/employees/**").permitAll()

                        // Asset Types
                        .requestMatchers(HttpMethod.GET, "/asset-types/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/asset-types/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/asset-types/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/asset-types/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/asset-types/**").hasRole("HR_ADMIN")

                        // Assets
                        .requestMatchers(HttpMethod.GET, "/assets/my").authenticated()
                        .requestMatchers(HttpMethod.GET, "/assets/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/assets/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/assets/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/assets/**").hasRole("HR_ADMIN")

                        // Policies
                        .requestMatchers(HttpMethod.GET, "/policies/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/policies/*/acknowledge").authenticated()
                        .requestMatchers(HttpMethod.POST, "/policies/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/policies/**").hasRole("HR_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/policies/**").hasRole("HR_ADMIN")

                        // Profile
                        .requestMatchers(HttpMethod.GET, "/profile/me").authenticated()

                        // Everything else
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }
}