package controller

import (
	"crypto/tls"
	"log"
	"net/smtp"
)

type Mail struct {
	host     string
	port     string
	password string
	senderId string
	subject  string
	receiver string
	body Body
}
type SmtpServer struct {
}

type Body struct {
	name     string
	password string
	role     string
}
func (b Body) BodyCtrl(name, role, password, link string) []byte{
	b.name = name
	b.password = password
	b.role = role
// 	msg := fmt.Sprintf(`<div style='max-width: 300px;padding: auto 2px;text-align: center;background-color: #fff;' >
// 	<img width='200' height='100' src='https://drive.google.com/uc?export=view&id=1ThJe6C8tsDB9IWj5vkzSIzlsiv3e9WY0' alt='FMHDS NSIP Logo'>
// 	<h3>Welcome ABEDMIS Portal</h3>
// 	<p>hello %s , Welcome to ABEDMS portal</p>
// 	<p>Your are Receiving this email because you have been registered at ABEDMIS  as a %s</p>
// 	<p><span>password: <strong>%s</strong></span></p>
// 	<button style='padding:6px 15px;background-color: #08b629; border: none;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;' ><a style='text-decoration: none;color: white;font-size: large;' href='http://%s'>LOGIN</a></button>
// 	<p>Login at: https://%s</p>
// </div>`, b.name, b.role, b.password, link, link)
	return []byte("hello test message")
}

func (s *Mail) MailCtrl(name, role, code, link string) error{
	s.host = "smtp.zoho.com"
	s.port = "465"
	s.password = "2pEr9y4eYTMa"
	s.senderId = "abedms@zohomail.com"
	s.receiver = "umar.jere@gmail.com"
	s.subject = "Welcome to ABEDMIS portal"
	auth := smtp.PlainAuth("", s.senderId, s.password, s.host)
	message := s.body.BodyCtrl(name, role, code, link )
	// err := smtp.SendMail(s.host+":"+s.port, auth, s.senderId, s.receiver, message)
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName: s.host,
	}
	conn, err := tls.Dial("tcp", s.host + ":" + s.port, tlsconfig)
	if err != nil {
		log.Panic(err)
	}
	client, err := smtp.NewClient(conn, s.host)
	if err != nil {
		log.Panic("error creating new client >>>>",err)
	}
	if err = client.Auth(auth); err != nil {
		log.Panic(err)
	}
	if err = client.Mail(s.senderId); err != nil {
		log.Panic(err)
	}
	if err = client.Rcpt(s.receiver); err != nil {
		log.Panic(err)
	}
	w, err := client.Data()
	if err != nil {
		log.Panic(err)
	}
	_, err = w.Write(message)
	if err != nil {
		log.Panic(err)
	}
	err = w.Close()
	if err != nil {
		log.Panic(err)
	}

	client.Quit()
	return err
}


