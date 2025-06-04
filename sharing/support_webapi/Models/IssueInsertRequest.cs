using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace support_webapi.Models
{
    public class IssueInsertRequest
    {
        public string IssueId { get; set; }
        public string Users { get; set; }
        public DateTime RaisedDate { get; set; }
        public string StatusName { get; set; } // Optional, can be null or empty
        public string AssignTo { get; set; }
        public string Description { get; set; }
        public string Module { get; set; }
        public string ImagePaths { get; set; } // Comma-separated paths
    }

}