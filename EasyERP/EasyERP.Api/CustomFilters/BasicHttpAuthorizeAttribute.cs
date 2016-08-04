using EasyERP.Api.Model;
using EasyERP.Api.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Security;

namespace EasyERP.Api.CustomFilters
{
    public class BasicAuthenticationAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        private ErpUserRepo erpUserRepo;
        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {

            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);

            }
            else
            {
                string authToken = actionContext.Request.Headers.Authorization.Parameter;
                string decodedToken = Encoding.UTF8.GetString(Convert.FromBase64String(authToken));
                if (!string.IsNullOrEmpty(decodedToken))
                {
                    string[] paramters = decodedToken.Split(':');
                    if (paramters.Length == 2)
                    {
                        ErpUser obj = new ErpUser() {
                            Username= paramters[0],
                            Token= Guid.Parse(paramters[1])
                        };
                        if (ErpUserRepo.IsValidToken(obj))
                        {
                            return;
                        }

                    }                    
                }
                actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
            }
        }

    }
}