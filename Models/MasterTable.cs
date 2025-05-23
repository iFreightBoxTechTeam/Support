using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class MasterTable
    {

        // Matable fields
        public Guid Id { get; set; }
        public string Description { get; set; }
        public List<string> ImagePaths { get; set; }
        public string Name { get; set; }
        public string TenantCode { get; set; }
        public int UserId { get; set; }
        public string StatusName { get; set; }  // For the PUT request to change status name

        // StatusLog fields
        
        public DateTime LogTime { get; set; }
    }


}