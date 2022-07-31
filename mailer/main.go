// Sending Email Using Smtp in Golang
package main

import (
	"log"
	"net/smtp"
)

// Main function
func main() {
	// Choose auth method and set it up
	auth := smtp.PlainAuth("", "241669892f37e9", "c16d5b137680e2", "smtp.mailtrap.io")

	// Here we do it all: connect to our server, set up a message and send it
	to := []string{"umar.jere@gmail.com"}
	msg := []byte("To: bill@gates.com\r\n" +
		"Subject: Why are you not using Mailtrap yet?\r\n" +
		"\r\n" +
		"Here’s the space for our great sales pitch\r\n")
	err := smtp.SendMail("smtp.mailtrap.io:2525", auth,"umar.jere@gmail.com", to, msg)
	if err != nil {
		log.Fatal(err)
	}

	}
