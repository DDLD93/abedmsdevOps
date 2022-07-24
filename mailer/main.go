// Sending Email Using Smtp in Golang
package main

import (
	"fmt"
	"mailer/controller"
)

// Main function
func main() {

	// from := os.Getenv("MAIL")
	// password := os.Getenv("PASSWD")

	// // toList is list of email address that email is to be sent.
	// toList := []string{"example@gmail.com"}

	// // host is address of server that the
	// // sender's email address belongs,
	// // in this case its gmail.
	// // For e.g if your are using yahoo
	// // mail change the address as smtp.mail.yahoo.com
	// host := "smtp.gmail.com"

	// // Its the default port of smtp server
	// port := "587"

	// // This is the message to send in the mail
	// msg := "Hello geeks!!!"

	// // We can't send strings directly in mail,
	// // strings need to be converted into slice bytes
	// body := []byte(msg)

	// // PlainAuth uses the given username and password to
	// // authenticate to host and act as identity.
	// // Usually identity should be the empty string,
	// // to act as username.
	// auth := smtp.PlainAuth("", from, password, host)

	// // SendMail uses TLS connection to send the mail
	// // The email is sent to all address in the toList,
	// // the body should be of type bytes, not strings
	// // This returns error if any occurred.
	// err := smtp.SendMail(host+":"+port, auth, from, toList, body)

	// // handling the errors
	// if err != nil {
	// 	fmt.Println(err)
	// 	os.Exit(1)
	// }
		mailer := controller.Mail{}
		err := mailer.MailCtrl("Umar Adamu","Programe manager","123456","ddld.info")
		if(err != nil){
			fmt.Print("Error sending email >>>",err)
		}
}
