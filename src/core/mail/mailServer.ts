declare var Config, require;

import MailObject = require("./mailObject");

/**
 * Class responsible for send mails
 * @class MailServer
 */
class MailServer{
	
	private driver: any;
	
	public constructor(){
		this.driver = require("emailjs/email").server.connect(Config.environment.mailServer);
	}
	
	/**
	 * Sends the mail
	 * @param {MailObject} mail
	 * @param {Function} callback
	 * @return {void}
	 */
	public sendMail(mail: MailObject, callback: (error: any, message: any)=>void): void{
		this.driver.send(mail, callback);
	}
}
export = MailServer;