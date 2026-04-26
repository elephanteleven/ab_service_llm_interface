/*
 * llm_interface
 */
const AB = require("@digiserve/ab-utils");
const env = AB.defaults.env;

module.exports = {
   llm_interface: {
      /*************************************************************************/
      /* enable: {bool} is this service active?                                */
      /*************************************************************************/
      enable: env("LLM_INTERFACE_ENABLE", true),
   },

   /**
    * datastores:
    * Sails style DB connection settings
    */
   datastores: AB.defaults.datastores(),
};
