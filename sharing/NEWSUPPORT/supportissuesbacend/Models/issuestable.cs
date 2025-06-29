using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class issuestable
    {

        // Matable fields
        public Guid issues_id { get; set; }
    public object Issues_Id { get; internal set; }
    public string Description { get; set; }
        public List<string> ImagePaths { get; set; }
        public string Name { get; set; }
        public string TenantCode { get; set; }
        public int UserId { get; set; }
        public string StatusName { get; set; }  // For the PUT request to change status name

        public string Module { get; set; }
        // StatusLog fields
  
        
        public string AssignTo { get; set; }
        public DateTime? ResolveDate { get; set; }
        public DateTime LogTime { get; set; }
        public  decimal? TakenTime { get; set; }
        public string Email { get; internal set; }
    }


}
