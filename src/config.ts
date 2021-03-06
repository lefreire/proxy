declare var __dirname, process;

class Config {
	
	public static rootPath: string = __dirname;

	public static log: any = {
		dataProvider: "/tmp/riobus/log/data-provider.log",
		runtime: 	  "/tmp/riobus/log/runtime.log",
		server: 	  "/tmp/riobus/log/server.log"
	};
	
	public static errorMailMessage: any = {
		from: "No-reply <your@provider.com>",
		to: "",
		subject: "[ERROR] Server down!",
		text: "An error ocurred in the server\n\n$$\n\nand it shut down."
	};

	public static environment: any = {
		mailServer: {
			user: "",
			password: "",
			host: "smtp.gmail.com",
			ssl: true
		},
		ip: "0.0.0.0",
		port: "8080",
		database: {
			driver: process.env.RIOBUS_DB_DRIVER,
			config: {
				dbName: process.env.RIOBUS_DB_NAME,
				host: process.env.RIOBUS_DB_HOST,
				user: process.env.RIOBUS_DB_USER,
				pass: process.env.RIOBUS_DB_PASS,
				port: process.env.RIOBUS_DB_PORT
			}
		}
	};
	
	public static maxSearchItems: number = 10;

	public static resources: Object = {
		"resources/v2/allResource"			   : "/v2/search",
		"resources/v2/dataProviderLogResource" : "/v2/log/dataprovider/:lines",
		"resources/v2/itineraryResource"	   : "/v2/itinerary/:line",
		"resources/v2/runtimeLogResource"	   : "/v2/log/runtime/:lines",
		"resources/v2/searchResource"	       : "/v2/search/:platformId/:data",
		"resources/v2/serverLogResource"	   : "/v2/log/server/:lines",
		
		"resources/v3/itineraryResource"	   : "/v3/itinerary/:line",
		"resources/v3/allItineraryResource"	   : "/v3/itinerary",
		"resources/v3/searchResource"		   : "/v3/search/:data",
		"resources/v3/busStopResource"         : "/v3/busstop/:line"
	};
	
	public static resourceRedirect: Object = {
		"/search": 					 "/v2",
		"/itinerary/:line" : 		 "/v2",
		"/log/dataprovider/:lines":  "/v2",
		"/log/runtime/:lines": 		 "/v2",
		"/log/server/:lines": 		 "/v2",
		"/search/:platformId/:data": "/v2",
		"/"						   : "https://github.com/RioBus/proxy/wiki/REST-API"
	};
	
	public static analytics: any = {
        ua: process.env.RIOBUS_ANALYTICS_UA,
        host: process.env.RIOBUS_ANALYTICS_HOST
    };
}

export = Config;