using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Issues
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public string TenantCode { get; set; }
        public string Module { get; set; }
        public string Image { get; set; }
        public string Status { get; set; }
        public string AssignTo { get; set; }


    }

}



