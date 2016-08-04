using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Mvc;

namespace EasyERP.Api.CustomFilters
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return false;
        }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext == null)
            {
                throw new ArgumentNullException("filterContext");
            }

            string auth = filterContext.HttpContext.Request.Headers["Authorization"];

            if (!String.IsNullOrEmpty(auth))
            {
                byte[] encodedDataAsBytes = Convert.FromBase64String(auth.Replace("Basic ", ""));
                string value = Encoding.ASCII.GetString(encodedDataAsBytes);
                string username = value.Substring(0, value.IndexOf(':'));
                string token = value.Substring(value.IndexOf(':') + 1);

                if (Repository.ErpUserRepo.IsValidToken(new Model.ErpUser() { Username = username, Token = Guid.Parse(token) }))
                {
                    filterContext.HttpContext.User = new GenericPrincipal(new GenericIdentity(username), null);
                }
                else
                {
                    filterContext.Result = new HttpStatusCodeResult(401);
                }
            }
            else
            {
                if (AuthorizeCore(filterContext.HttpContext))
                {
                    HttpCachePolicyBase cachePolicy = filterContext.HttpContext.Response.Cache;
                    cachePolicy.SetProxyMaxAge(new TimeSpan(0));
                    cachePolicy.AddValidationCallback(CacheValidateHandler, null);
                }
                else
                {
                    filterContext.HttpContext.Response.Clear();
                    filterContext.HttpContext.Response.StatusDescription = "Unauthorized";
                    filterContext.HttpContext.Response.AddHeader("WWW-Authenticate", "Basic realm=\"Secure Area\"");
                    filterContext.HttpContext.Response.Write("401, please authenticate");
                    filterContext.HttpContext.Response.StatusCode = 401;
                    filterContext.Result = new EmptyResult();
                    filterContext.HttpContext.Response.End();
                }
            }
        }
        private void CacheValidateHandler(HttpContext context, object data, ref HttpValidationStatus validationStatus)
        {
            validationStatus = OnCacheAuthorization(new HttpContextWrapper(context));
        }
    }
    //Client credential

}