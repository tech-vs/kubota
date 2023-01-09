import smtplib

def send_email(mail_to, subject, msg):
    try:
        server = smtplib.SMTP('relay.sys.kubota.com:25')
        sender_email = 'ket_m.sys@sys.kubota.com'
        message = f'Subject: {subject}\n\n{msg}'
        server.sendmail(sender_email, mail_to, message)

        server.quit()
        print('Email sent success.')
    except:
        print('Email failed to send.')
    
