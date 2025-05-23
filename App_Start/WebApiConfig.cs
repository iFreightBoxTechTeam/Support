using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors; // Add this

namespace WebApplication2
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute("*", "*", "*"); // Allow all origins, headers, and methods
            config.EnableCors(cors);
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "GetByCustomerId",
                routeTemplate: "api/values/{customerid}",
                defaults: new { controller = "Values", action = "GetByCustomerId" }
    );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{customerid}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
