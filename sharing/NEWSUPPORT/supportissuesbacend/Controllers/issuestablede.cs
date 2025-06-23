using System;
using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication2.Controllers
{
    internal class issuestablede : issuestable
  {
        public Guid issues_id { get; set; }
        public string Description { get; set; }
        public List<string> ImagePaths { get; set; }
        public string StatusName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string TenantCode { get; set; }
        public DateTime LogTime { get; set; }
        public int UserId { get; set; }
        public string Module { get; set; }

        public string AssignTo { get; set; }
        public DateTime? ResolveDate { get; set; }

    }
}
