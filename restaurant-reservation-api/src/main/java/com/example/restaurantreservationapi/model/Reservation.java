package com.example.restaurantreservationapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reservationID;

    @NotEmpty(message = "Customer name cannot be empty")
    private String customerName;

    @NotNull(message = "Reservation date cannot be null")
    @FutureOrPresent(message = "Reservation date must be in the present or future")
    @Temporal(TemporalType.DATE)
    private Date reservationDate;

    @NotEmpty(message = "Time slot cannot be empty")
    private String timeSlot;

    @NotNull(message = "Table number cannot be null")
    private Integer tableNumber;

    @NotNull(message = "User ID cannot be null")
    private Integer userID;

}
