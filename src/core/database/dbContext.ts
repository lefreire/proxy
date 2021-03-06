import ICollection  = require("./iCollection");
import IDatabase 	= require("./iDatabase");
import IModelMap	= require("./iModelMap");
import $inject 		= require("../inject");

declare var Config;

/**
 * Responsible for the connection with the database using the required driver
 * @class DbContext
 */
class DbContext {
	
	private context: IDatabase;
	
	public constructor(dbConfig?: any) {
		if(dbConfig===undefined) dbConfig = Config.environment.database;
		this.context = this.getContext(dbConfig);
	}
	
	/**
	 * Accesses the collection and operate with T instances 
	 * @param {string} name
	 * @param {IModelMap} map
	 * @return {ICollection<T>}
	 */
	public collection<T>(map: IModelMap): ICollection<T> {
		return this.context.collection<T>(map.collectionName, map);
	}
	
	/**
	 * Gets the required connector driver
	 * @param {any} dbConfig
	 * @return {IDatabase}
	 */
	private getContext(dbConfig: any): IDatabase {
		if(dbConfig.driver===undefined || dbConfig.driver==="") throw new Error("Undefined database driver.");
		var connector = dbConfig.driver.toLowerCase();
		var driverPath = "core/database/driver";
		switch(connector) {
			case "mongodb":
			case "mongo":
				connector = driverPath+"/mongodb/mongoDb";
				break;
			default: break;
		}
		return $inject(connector, dbConfig.config);
	}
	
	/**
	 * Closes the connection with the database
	 * @return {void}
	 */
	public closeConnection(): void {
		this.context.close();
	}
}
export = DbContext;