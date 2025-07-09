package com.ict.springboot.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "locations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LocationsEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // AUTO_INCREMENT
    @Column
    private long id;

    @Column(length = 255, unique = true, nullable = false)
    private String location;
    
}
