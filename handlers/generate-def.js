const generateDef = require("../utils/generate");
const ABBootstrap = require("../AppBuilder/ABBootstrap");
// {ABBootstrap}
// responsible for initializing and returning an {ABFactory} that will work
// with the current tenant for the incoming request.

module.exports = {
   /**
    * Key: the cote message key we respond to.
    */
   key: "llm_interface.generate-def",

   /**
    * inputValidation
    * define the expected inputs to this service handler:
    * Format:
    * "parameterName" : {
    *    {joi.fn}   : {bool},  // performs: joi.{fn}();
    *    {joi.fn}   : {
    *       {joi.fn1} : true,   // performs: joi.{fn}().{fn1}();
    *       {joi.fn2} : { options } // performs: joi.{fn}().{fn2}({options})
    *    }
    *    // examples:
    *    "required" : {bool},
    *    "optional" : {bool},
    *
    *    // custom:
    *        "validation" : {fn} a function(value, {allValues hash}) that
    *                       returns { error:{null || {new Error("Error Message")} }, value: {normalize(value)}}
    * }
    */
   inputValidation: {
      appID: { string: true, optional: true },
      userMessage: { string: true, optional: true },
   },

   /**
    * fn
    * our Request handler.
    * @param {obj} req
    *        the request object sent by the
    *        api_sails/api/controllers/llm_interface/generate-def.
    * @param {fn} cb
    *        a node style callback(err, results) to send data when job is finished
    */
   fn: function handler(req, cb) {
      req.log("llm_interface.generate-def:");

      // get the AB for the current tenant
      (async () => {
         try {
            const AB = await ABBootstrap.init(req);
            // Get the passed in parameters
            const appID = req.param("appID");
            const userMessage = req.param("userMessage");

            cb(null, await generateDef(appID, userMessage));
         } catch (err) {
            req.notify.developer(err, {
               context:
                  "Service:llm_interface.generate-def: Error initializing ABFactory",
            });
            cb(err);
         }
      })();
   },
};
